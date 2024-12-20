from rest_framework import serializers
from .models import User,StudentProfile,CoordinatorProfile,RecruiterProfile,Job,StudentRegistration,CoordinatorRegistration,PasswordResetToken,JobApplication,InterviewDetails,PlacementEvent
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


# user creation and authentication serializers
class UserSerializer(serializers.ModelSerializer):
    registration_number = serializers.CharField(write_only=True, required=False)
    coordinator_id = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'password', 'user_type', 
            'registration_number', 'coordinator_id'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        email = attrs.get('email')
        user_type = attrs.get('user_type')
        registration_number = attrs.get('registration_number')
        coordinator_id = attrs.get('coordinator_id')

        if User.objects.filter(email=email).exists():
            raise ValidationError({'email': 'This email is already in use.'})

        if user_type == 'student':
            if not registration_number:
                raise ValidationError({'registration_number': 'Registration ID is required for students.'})
            try:
                student_registration = StudentRegistration.objects.get(registration_number=registration_number)
                if student_registration.is_registered:
                    raise ValidationError({'registration_number': 'This student has already registered.'})
            except StudentRegistration.DoesNotExist:
                raise ValidationError({'registration_number': 'This registration ID is not pre-registered.'})

        elif user_type == 'coordinator':
            if not coordinator_id:
                raise ValidationError({'coordinator_id': 'Coordinator ID is required.'})
            try:
                coordinator_registration = CoordinatorRegistration.objects.get(coordinator_id=coordinator_id)
                if coordinator_registration.is_registered:
                    raise ValidationError({'coordinator_id': 'This coordinator has already registered.'})
            except CoordinatorRegistration.DoesNotExist:
                raise ValidationError({'coordinator_id': 'This coordinator ID is not pre-registered.'})

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        registration_number = validated_data.pop('registration_number', None)
        coordinator_id = validated_data.pop('coordinator_id', None)

        # Create user
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if validated_data.get('user_type') == 'student':
            student_registration = StudentRegistration.objects.get(registration_number=registration_number)
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
        ordering = ['id']
        model = StudentRegistration
        fields = "__all__"

    def validate_registration_number(self, value):
        if self.instance:
            # Exclude the current instance from the validation check
            if StudentRegistration.objects.filter(registration_number=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("This student ID is already registered.")
        else:
            if StudentRegistration.objects.filter(registration_number=value).exists():
                raise serializers.ValidationError("This student ID is already registered.")
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
        

class CoordinatorRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['id']
        model = CoordinatorRegistration
        fields = "__all__"

    def validate_registration_number(self, value):
        if self.instance:
            # Exclude the current instance from the validation check
            if CoordinatorRegistration.objects.filter(coordinator_id=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("This student ID is already registered.")
        else:
            if CoordinatorRegistration.objects.filter(registration_number=value).exists():
                raise serializers.ValidationError("This student ID is already registered.")
        return value
    

class CoordinatorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    registration = CoordinatorRegisterSerializer(read_only=True) 
    class Meta:
        model = CoordinatorProfile
        fields = '__all__'        
        read_only_fields = ['user','registration']


class RecruiterProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    company_logo = serializers.ImageField(required=False)

    class Meta:
        model = RecruiterProfile
        fields = ['id', 'company_name', 'position', 'contact_number', 'company_logo','user','is_active']

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
    

class JobSerializer(serializers.ModelSerializer):
    recruiter = RecruiterProfileSerializer(read_only=True)
    application_count = serializers.IntegerField(read_only=True) 
    
    class Meta:
        ordering = ['-id']
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


class JobApplicationSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer(read_only=True)
    job = JobSerializer(read_only=True) 

    class Meta:
        ordering = ['-id']
        model = JobApplication
        fields = ['id', 'student', 'job', 'applied_on', 'status', 'is_seend','email_sent']
        read_only_fields = ['id', 'student', 'job', 'applied_on']


class InterviewDetailsSerializer(serializers.ModelSerializer):
    job_application_id = serializers.PrimaryKeyRelatedField(
        queryset=JobApplication.objects.all(), source='job_application', write_only=True
    )
    job_application = JobApplicationSerializer(read_only=True) 

    class Meta:
        model = InterviewDetails
        fields = ['id', 'job_application_id', 'job_application', 'venue', 'time', 'other_details', 'created_at', 'updated_at', 'emailSent']
        read_only_fields = ['created_at', 'updated_at', 'job_application']


class PlacementEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacementEvent
        fields = ['title', 'description', 'image', 'event_date', 'is_active']
        
#--------------------------------- password rest ----------------------------------------#
from django.core.mail import send_mail

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user with this email found.")
        return value

    def save(self):
        user = User.objects.get(email=self.validated_data['email'])
        encrypted_token = PasswordResetToken.generate_encrypted_token()
        PasswordResetToken.objects.create(user=user, token=encrypted_token)

        send_mail(
            "Password Reset Link",
            f"Your password reset link is: http://localhost:5173/reset-password/{encrypted_token}/. This link expires in 15 minutes.",
            "calicut university.com",
            [user.email]
        )



class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(max_length=255)
    new_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        token = attrs.get('token')

        try:
            user = User.objects.get(email=email)
            token_instance = PasswordResetToken.objects.filter(user=user, is_used=False).first()

            # Decrypt the stored token for comparison
            decrypted_stored_token = PasswordResetToken.decrypt_token(token_instance.token) if token_instance else None
            decrypted_received_token = PasswordResetToken.decrypt_token(token)

            if not token_instance:
                raise serializers.ValidationError("Token does not exist.")
            if decrypted_received_token != decrypted_stored_token:
                raise serializers.ValidationError("Tokens do not match.")
            if not token_instance.is_valid():
                raise serializers.ValidationError("Token has expired or is already used.")

            attrs['user'] = user
            return attrs

        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or token.")
        except Exception as e:
            raise serializers.ValidationError(f"Error during token validation: {str(e)}")
        
    def reset_password(self):
        # Custom method to reset the password
        user = self.validated_data['user']
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        # Mark the token as used
        PasswordResetToken.objects.filter(user=user).update(is_used=True)

