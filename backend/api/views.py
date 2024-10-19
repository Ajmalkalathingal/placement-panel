from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .permissions import IsStudent,IsCoordinator,IsRecruiter,IsVerifier
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import StudentProfile,RecruiterProfile,Job,StudentRegistration,CoordinatorProfile
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import Http404
from .serializers import (UserSerializer,
        StudentProfileSerializer,   
        RecruiterProfileSerializer,
        CustomTokenObtainPairSerializer,
        JobSerializer,
        RegistredStudentSerializer,
        CoordinatorProfileSerializer
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



# student registration
class CourseChoicesView(APIView):
    """
    API view to return the list of available course choices
    """
    def get(self, request, *args, **kwargs):
        choices = StudentRegistration.COURSE_CHOICES
        course_choices = [] 

        for choice in choices:
            course_choices.append({
                "value": choice[0],  
                "label": choice[1]  
            })
        return Response(course_choices)
    

class RegisterStudentView(APIView):
    """
    API view to handle student registration
    """

    def post(self, request, *args, **kwargs):
        serializer = RegistredStudentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()  
            return Response({
                "message": "Student registered successfully",
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistredStudentListView(generics.ListAPIView):
    queryset = StudentRegistration.objects.all()  
    serializer_class = RegistredStudentSerializer
    permission_classes = [IsAuthenticated,IsCoordinator|IsVerifier] 

class RegisteredStudentUpdateView(generics.UpdateAPIView):
    queryset = StudentRegistration.objects.all()
    serializer_class = RegistredStudentSerializer
    permission_classes = [IsAuthenticated, IsCoordinator | IsVerifier]

    def perform_update(self, serializer):
        serializer.save()

class RegisteredStudentDeleteView(generics.DestroyAPIView):
    queryset = StudentRegistration.objects.all()
    serializer_class = RegistredStudentSerializer
    permission_classes = [IsAuthenticated, IsCoordinator | IsVerifier]        
 


# student profile  
class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get(self, request):
        try:
            user = request.user
            student_profile = StudentProfile.objects.get(user=user)
            serializer = StudentProfileSerializer(student_profile)
            return Response(serializer.data)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StudentProfileUpdateView(generics.UpdateAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated, IsCoordinator | IsStudent]
    parser_classes = [MultiPartParser, FormParser]  # To handle file uploads
    lookup_field = 'student_id'

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



# Recruiter 
class RecruiterListView(generics.ListAPIView):
    queryset = RecruiterProfile.objects.all()  
    serializer_class = RecruiterProfileSerializer
    permission_classes = [IsAuthenticated]

class RecruterRegisterView(APIView):
    """
    API view to handle Recruiter profile creation and fetching
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = RecruiterProfile.objects.get(user=request.user)
            serializer = RecruiterProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RecruiterProfile.DoesNotExist:
            return Response({'detail': 'Recruiter profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            # Check if the user already has a profile
            recruiter_profile = RecruiterProfile.objects.get(user=request.user)
            return Response({'detail': 'Recruiter profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        except RecruiterProfile.DoesNotExist:
            # Create a new profile if it doesn't exist
            serializer = RecruiterProfileSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()  # Save the profile
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      

class RecruiterProfileView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        try:
            user = request.user
            recruiter_profile = RecruiterProfile.objects.get(user=user)
            serializer = RecruiterProfileSerializer(recruiter_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RecruiterProfile.DoesNotExist: 
            return Response({"error": "Recruiter profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RecruiterProfileUpdateView(generics.UpdateAPIView):
    serializer_class = RecruiterProfileSerializer
    permission_classes = [IsAuthenticated, IsRecruiter | IsCoordinator|IsStudent]

    def get_object(self, recruiter_id=None):
        # If recruiter_id is passed, fetch the profile based on ID
        if recruiter_id:
            try:
                return RecruiterProfile.objects.get(user=self.request.user)
            except RecruiterProfile.DoesNotExist:
                raise NotFound("Recruiter profile not found.")

        return RecruiterProfile.objects.get(user=self.request.user)

    def update(self, request, *args, **kwargs):
        recruiter_id = kwargs.get('recruiter_id') 
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


from api.tasks import send_job_post_email_to_students
class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer 
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user.recruiterprofile)
        # self.send_email_to_students(job)


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

class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(recruiter__user=self.request.user)
    
class JobUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(recruiter__user=self.request.user)
    
class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(recruiter__user=self.request.user)


class CordinatorProfileView(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        try:
            user = request.user
            coordinator_profile = CoordinatorProfile.objects.get(user=user)
            serializer = CoordinatorProfileSerializer(coordinator_profile)
            return Response(serializer.data)
        except CoordinatorProfile.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


