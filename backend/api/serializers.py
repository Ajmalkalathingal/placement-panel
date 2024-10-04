from rest_framework import serializers
from .models import User,StudentProfile,CoordinatorProfile,RecruiterProfile,Job,StudentRegistration,CoordinatorRegistration
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


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

        elif user.user_type == 'recruiter':
            RecruiterProfile.objects.create(
                user=user,
            )
        return user
    

class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(write_only=True)
    user = UserSerializer(read_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_type': user.user_type,
            'user' : user.first_name
        }

    # -------------------------------------------------------------------------------------------------#
class RegistredStudentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StudentRegistration
        fields = "__all__" 


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 

    class Meta:
        model = StudentProfile
        fields = "__all__" 
        read_only = True
        read_only_fields = ['user']

class RecruiterProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    class Meta:
        model = RecruiterProfile
        fields = '__all__'        
        read_only_fields = ['user']


class CoordinatorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    class Meta:
        model = CoordinatorProfile
        fields = '__all__'        
        read_only_fields = ['user']



class JobSerializer(serializers.ModelSerializer):
    user = RecruiterProfileSerializer(read_only=True) 
    class Meta:
        model = Job
        fields = '__all__'        
        read_only_fields = ['user']