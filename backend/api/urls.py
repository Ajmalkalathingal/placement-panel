from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    StudentSignupView,
    RecruiterSignupView,
    CoordinatorSignupView,
    VerifierSignupView,
    StudentProfileUpdateView,
    StudentProfileView,StudentProfileDeleteView,

    RecruiterListView,
    RecruiterProfileView,
    RecruiterProfileUpdateView,
    RecruiterProfileDeleteView,
    JobCreateView,

    RegistredStudentListView,
    RegisteredStudentDeleteView,
    RegisteredStudentUpdateView,

    CordinatorProfileView,

)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Signup routes for different user types
    path('signup/student/', StudentSignupView.as_view(), name='student_signup'),
    path('signup/recruiter/', RecruiterSignupView.as_view(), name='recruiter_signup'),
    path('signup/coordinator/', CoordinatorSignupView.as_view(), name='coordinator_signup'),
    path('signup/verifier/', VerifierSignupView.as_view(), name='verifier_signup'),



     path('students/profile/', StudentProfileView.as_view(), name='student_profile'),
    path('student-profile/<int:student_id>/', StudentProfileUpdateView.as_view(), name='student-profile-update'),
    path('students/<int:student_id>/delete/', StudentProfileDeleteView.as_view(), name='student-delete'),


    path('recruiters/', RecruiterListView.as_view(), name='recruiter-list'),
    path('recruiters/profile/', RecruiterProfileView.as_view(), name='recruiter-list'),
    path('recruiters/<int:recruiter_id>/update/', RecruiterProfileUpdateView.as_view(), name='recruiter-update'),
    path('recruiters/update/', RecruiterProfileUpdateView.as_view(), name='recruiter-update'),
    path('recruiters/<int:recruiter_id>/delete/', RecruiterProfileDeleteView.as_view(), name='recruiter-delete'),
    path('recruiters/create-job-post/', JobCreateView.as_view(), name='recruiter-delete'),


    path('registred-student-list/', RegistredStudentListView.as_view(), name='recruiter-delete'),
    path('registred-student/<int:pk>/update/', RegisteredStudentUpdateView.as_view(), name='recruiter-delete'),
    path('registred-student/<int:pk>/delete/', RegisteredStudentDeleteView.as_view(), name='recruiter-delete'),

    # CoordinatorProfile
    path('coordinators/profile/', CordinatorProfileView.as_view(), name='recruiter-delete'),


]

