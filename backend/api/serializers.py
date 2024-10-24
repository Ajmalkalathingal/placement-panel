from rest_framework import serializers
from .models import User,StudentProfile,CoordinatorProfile,RecruiterProfile,Job,StudentRegistration,CoordinatorRegistration
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse


# user creation and authentication serializers
class UserSerializer(serializers.ModelSerializer):
    student_id = serializers.CharField(write_only=True, required=False) 
    coordinator_id = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'user_type', 'student_id','coordinator_id')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        email = attrs.get('email')
        user_type = attrs.get('user_type')
        student_id = attrs.get('student_id')
        coordinator_id = attrs.get('coordinator_id')

        if user_type == 'student':
            try:
                student_registration = StudentRegistration.objects.get(student_id=student_id)
                if student_registration.is_registered:
                    raise ValidationError("This student has already registered.")
            except StudentRegistration.DoesNotExist:
                raise ValidationError("This student ID is not pre-registered.")
            
        # Validate for coordinators
        elif user_type == 'coordinator':
            try:
                Coordinator_registration = CoordinatorRegistration.objects.get(coordinator_id=coordinator_id)
                if Coordinator_registration.is_registered:
                    raise ValidationError("This coordinator has already registered.")
            except CoordinatorRegistration.DoesNotExist:
                raise ValidationError("This coordinator ID and email combination is not pre-registered.")
    
        return attrs
    

    def create(self, validated_data):
        password = validated_data.pop('password')
        student_id = validated_data.pop('student_id',None)
        coordinator_id = validated_data.pop('coordinator_id', None)

        # Create user
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if validated_data.get('user_type') == 'student':
            student_registration = StudentRegistration.objects.get(student_id=student_id)
            student_registration.is_registered = True 
            student_registration.save()
            StudentProfile.objects.create(
                user=user,
                registration=student_registration
            )

        elif validated_data.get('user_type') == 'coordinator':
            coordinator_registration = CoordinatorRegistration.objects.get(coordinator_id=coordinator_id)
            coordinator_registration.is_registered = True
            coordinator_registration.user = user  
            coordinator_registration.save()
            CoordinatorProfile.objects.create(
                user=user,
                registration=coordinator_registration
            )

        # elif user.user_type == 'recruiter':
        #     RecruiterProfile.objects.create(
        #         user=user,
        #     )
        return user
    

class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user_type': user.user_type,
        }
    # -------------------------------------------------------------------------------------------------#
class RegistredStudentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StudentRegistration
        fields = "__all__" 

        def validate_student_id(self, value):
            if StudentRegistration.objects.filter(student_id=value).exists():
                raise serializers.ValidationError("This student ID is already registered.")
            return value

        def validate_email(self, value):
            if StudentRegistration.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already registered.")
            return value    


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    registration = RegistredStudentSerializer(read_only=True) 

    resume = serializers.FileField(required=False)
    img = serializers.ImageField(required=False)

    class Meta:
        model = StudentProfile
        fields = ['id', 'registration', 'user', 'img', 'resume', 'graduation_year']
        read_only_fields = ['registration', 'user']  

    def update(self, instance, validated_data):
        # Extract user first_name and last_name from validated_data
        first_name = self.context['request'].data.get('user.first_name', None)
        last_name = self.context['request'].data.get('user.last_name', None)

        if first_name or last_name:
            user = instance.user
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            user.save()

        # Update other fields in the instance
        return super().update(instance, validated_data)
        
   
     
class RecruiterProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    company_logo = serializers.ImageField(required=False)

    class Meta:
        model = RecruiterProfile
        fields = ['id', 'company_name', 'position', 'contact_number', 'company_logo','user']

    def create(self, validated_data):
        # The user is already set in the context
        user = self.context['request'].user
        recruiter_profile = RecruiterProfile.objects.create(user=user, **validated_data)
        return recruiter_profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        # Update the RecruiterProfile fields
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.position = validated_data.get('position', instance.position)
        instance.contact_number = validated_data.get('contact_number', instance.contact_number)

        if 'company_logo' in validated_data:
            instance.company_logo = validated_data.get('company_logo', instance.company_logo)
        instance.save()
        
        if user_data:
            user = instance.user 
            user.first_name = user_data.get('first_name', user.first_name)
            user.last_name = user_data.get('last_name', user.last_name)
            user.email = user_data.get('email', user.email)

            instance.save()
        return instance

class CoordinatorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    class Meta:
        model = CoordinatorProfile
        fields = '__all__'        
        read_only_fields = ['user']



class JobSerializer(serializers.ModelSerializer):
    recruiter = RecruiterProfileSerializer(read_only=True)
    class Meta:
        model = Job
        fields = '__all__'        
        read_only_fields = ['recruiter']

    def create(self, validated_data):
        # The user is already set in the context
        recruiter = self.context['request'].user.recruiterprofile
        if 'recruiter' in validated_data:
            validated_data.pop('recruiter')
        
        job = Job.objects.create(recruiter=recruiter, **validated_data)
        return job
