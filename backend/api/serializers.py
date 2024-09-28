from rest_framework import serializers
from .models import User,StudentProfile,CoordinatorProfile,RecruiterProfile,Job
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


# user creation and authentication serializers
class UserSerializer(serializers.ModelSerializer):
    course = serializers.ChoiceField(choices=StudentProfile.COURSE_CHOICES, required=False)
    class Meta:
        model = User
        fields = ('id','email', 'first_name', 'last_name', 'password', 'user_type','course')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        course = validated_data.pop('course', None)

        # create user
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        # Create StudentProfile if user_type is 'student'
        if user.user_type == 'student':
            if not course:
                raise serializers.ValidationError("Course is required for students.")

            StudentProfile.objects.create(
                user=user,
                course=course
            )
        elif user.user_type == 'coordinator':
            CoordinatorProfile.objects.create(
                user=user,
            )
        elif user.user_type == 'recruiter':
            RecruiterProfile.objects.create(
                user=user,
            )
        print(user,'hh')        
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

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_type': user.user_type,
        }

    # -------------------------------------------------------------------------------------------------#


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



class JobSerializer(serializers.ModelSerializer):
    user = RecruiterProfileSerializer(read_only=True) 
    class Meta:
        model = Job
        fields = '__all__'        
        read_only_fields = ['user']