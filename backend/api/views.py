from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .permissions import IsStudent,IsCoordinator,IsRecruiter,IsVerifier
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import StudentProfile,RecruiterProfile,Job,StudentRegistration

from .serializers import (UserSerializer,
        StudentProfileSerializer,   
        RecruiterProfileSerializer,
        CustomTokenObtainPairSerializer,
        JobSerializer,
        RegistredStudentSerializer
        )   
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404


# Signup views for different user types
class StudentSignupView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        data = request.data.copy()
        data['user_type'] = 'student'
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecruiterSignupView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        data = request.data.copy()
        data['user_type'] = 'recruiter'
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CoordinatorSignupView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        data = request.data.copy()
        data['user_type'] = 'coordinator'
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifierSignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data.copy()
        data['user_type'] = 'verifier'
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Custom TokenObtainPair view for login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    # -----------------------------------------------------------------------------#



# student list and update profile
class RegistredStudentListView(generics.ListAPIView):
    queryset = StudentRegistration.objects.all()  
    serializer_class = RegistredStudentSerializer
    permission_classes = [IsAuthenticated,IsCoordinator|IsVerifier] 

class RegisteredStudentUpdateView(generics.UpdateAPIView):
    queryset = StudentRegistration.objects.all()
    serializer_class = RegistredStudentSerializer
    permission_classes = [IsAuthenticated, IsCoordinator | IsVerifier]

class RegisteredStudentDeleteView(generics.DestroyAPIView):
    queryset = StudentRegistration.objects.all()
    serializer_class = RegistredStudentSerializer
    permission_classes = [IsAuthenticated, IsCoordinator | IsVerifier]        


class StudentListView(generics.ListAPIView):
    queryset = StudentProfile.objects.all()  
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]  


class StudentProfileUpdateView(generics.UpdateAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated, IsCoordinator | IsStudent]

    def get_object(self, student_id=None):
        
        if student_id:
            try:
                return StudentProfile.objects.get(id=student_id)
            except StudentProfile.DoesNotExist:
                raise NotFound("Student profile not found.")
       
        return StudentProfile.objects.get(user=self.request.user)

    def update(self, request, *args, **kwargs):
        student_id = kwargs.get('student_id') 
        student_profile = self.get_object(student_id=student_id)
        
        serializer = self.get_serializer(student_profile, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    

class StudentProfileDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsCoordinator | IsStudent]

    def get_object(self, student_id=None):
        if student_id:
            try:
                return StudentProfile.objects.get(id=student_id)
            except StudentProfile.DoesNotExist:
                raise NotFound("Student profile not found.")

        return StudentProfile.objects.get(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        student_id = kwargs.get('student_id')
        student_profile = self.get_object(student_id=student_id)
        
        student_profile.delete()
        return Response({"detail": "Student profile deleted successfully."}, status=204)        

# Recruiter List View
class RecruiterListView(generics.ListAPIView):
    queryset = RecruiterProfile.objects.all()  
    serializer_class = RecruiterProfileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can view the list

# Recruiter Profile Update View
class RecruiterProfileUpdateView(generics.UpdateAPIView):
    serializer_class = RecruiterProfileSerializer
    permission_classes = [IsAuthenticated, IsRecruiter | IsCoordinator|IsStudent]

    def get_object(self, recruiter_id=None):
        # If recruiter_id is passed, fetch the profile based on ID
        if recruiter_id:
            try:
                return RecruiterProfile.objects.get(id=recruiter_id)
            except RecruiterProfile.DoesNotExist:
                raise NotFound("Recruiter profile not found.")

        return RecruiterProfile.objects.get(user=self.request.user)

    def update(self, request, *args, **kwargs):
        recruiter_id = kwargs.get('recruiter_id')  # Get recruiter ID from URL if provided
        recruiter_profile = self.get_object(recruiter_id=recruiter_id)
        
        serializer = self.get_serializer(recruiter_profile, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    
    
class RecruiterProfileDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsCoordinator | IsRecruiter]

    def get_object(self, recruiter_id=None):
        if recruiter_id:
            try:
                return RecruiterProfile.objects.get(id=recruiter_id)
            except RecruiterProfile.DoesNotExist:
                raise NotFound("Recruiter profile not found.")
        
        return RecruiterProfile.objects.get(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        recruiter_id = kwargs.get('recruiter_id')
        recruiter_profile = self.get_object(recruiter_id=recruiter_id)
        
        recruiter_profile.delete()
        return Response({"detail": "Recruiter profile deleted successfully."}, status=204)    



from .tasks import send_job_post_email_to_students
class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer 

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        self.send_email_to_students(response.data)
        return response

    def send_email_to_students(self, job_data):
        # Get the recruiter object using the recruiter ID
        recruiter_id = job_data['recruiter']
        recruiter = get_object_or_404(RecruiterProfile, id=recruiter_id)

        student_emails = StudentProfile.objects.values_list('user__email', flat=True)

        # Create the email content
        subject = f"New Job Posting: {job_data['title']}"
        message = (
            f"Dear Student,\n\n"
            f"A new job has been posted by {recruiter.company_name}.\n\n"
            f"Job Title: {job_data['title']}\n"
            f"Description: {job_data['description']}\n"
            f"Location: {job_data['location']}\n\n"
            f"Best regards,\nYour University Job Portal"
        )

        # Send the email using an asynchronous task (using Celery)
        send_job_post_email_to_students.delay(subject, message, list(student_emails))
