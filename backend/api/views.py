from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .permissions import IsStudent,IsCoordinator,IsRecruiter,IsVerifier
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import TokenAuthentication
from .models import StudentProfile,RecruiterProfile,Job,StudentRegistration,CoordinatorProfile
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse

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

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, user_type):
        data = request.data.copy()
        data['user_type'] = user_type

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentSignupView(SignupView):
    permission_classes = [AllowAny]
    def post(self, request):
        return super().post(request, 'student')

class RecruiterSignupView(SignupView):
    permission_classes = [AllowAny]
    def post(self, request):
        return super().post(request, 'recruiter')

class CoordinatorSignupView(SignupView):
    permission_classes = [AllowAny]
    def post(self, request):
        return super().post(request, 'coordinator')

class VerifierSignupView(SignupView):
    permission_classes = [AllowAny]
    def post(self, request):
        return super().post(request, 'verifier')
    

class CustomTokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Extract validated data
        data = serializer.validated_data
        
        # Prepare the response
        response = JsonResponse({
            'message': 'Login successful',
            'user_type': data.get('user_type'),  
            'refresh_token': data.get('refresh_token'),  
            'access_token': data.get('access_token')   
        })
        

        return response
        # deploymnet 
        # response.set_cookie('access', data['access_token'], httponly=True, secure=True, samesite='None')
        # response.set_cookie('refresh', data['refresh_token'], httponly=True, secure=True, samesite='None')
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
    
class AllJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.all()
    

    
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


# exel upload for registration
import pandas as pd

def export_student_registration_to_excel(request):
    student_data = StudentRegistration.objects.all()

    # Create a list of dictionaries to pass to pandas
    data = []
    for student in student_data:
        data.append({
            'Student ID': student.student_id,
            'Email': student.email,
            'Registration Code': student.registration_code,
            'Is Registered': 'Yes' if student.is_registered else 'No',
            'Course': student.course
        })

    # Create a pandas DataFrame from the data
    df = pd.DataFrame(data)

    # Create a response object with the correct MIME type for Excel
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=student_registration.xlsx'

    with pd.ExcelWriter(response, engine='openpyxl') as writer:
        df.to_excel(writer, index=False)

    return response

import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from .models import StudentRegistration

class UploadStudentDataView(APIView):
    parser_classes = [MultiPartParser]  # To handle file upload

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        try:
            # Get the uploaded file from the request
            excel_file = request.FILES['file']
            
            # Read the Excel file using pandas
            df = pd.read_excel(excel_file)

            # Iterate over the rows and create StudentRegistration instances
            for _, row in df.iterrows():
                StudentRegistration.objects.update_or_create(
                    student_id=row['Student ID'],
                    defaults={
                        'email': row['Email'],
                        'registration_code': row['Registration Code'],
                        'is_registered': row['Is Registered'] == 'Yes',
                        'course': row['Course']
                    }
                )

            return JsonResponse({'message': 'Data uploaded successfully'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        
        