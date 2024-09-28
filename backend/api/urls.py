from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    StudentSignupView,
    RecruiterSignupView,
    CoordinatorSignupView,
    VerifierSignupView,
    StudentProfileUpdateView,
    StudentListView,StudentProfileDeleteView,
    RecruiterListView,
    RecruiterProfileUpdateView,
    RecruiterProfileDeleteView,
    JobCreateView


)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Signup routes for different user types
    path('signup/student/', StudentSignupView.as_view(), name='student_signup'),
    path('signup/recruiter/', RecruiterSignupView.as_view(), name='recruiter_signup'),
    path('signup/coordinator/', CoordinatorSignupView.as_view(), name='coordinator_signup'),
    path('signup/verifier/', VerifierSignupView.as_view(), name='verifier_signup'),

    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/<int:student_id>/update/', StudentProfileUpdateView.as_view(), name='student-profile-update'),#For coordinators
    path('students/update/', StudentProfileUpdateView.as_view(), name='student-profile-update'),
    path('students/<int:student_id>/delete/', StudentProfileDeleteView.as_view(), name='student-delete'),


    path('recruiters/', RecruiterListView.as_view(), name='recruiter-list'),
    path('recruiters/<int:recruiter_id>/update/', RecruiterProfileUpdateView.as_view(), name='recruiter-update'),
    path('recruiters/update/', RecruiterProfileUpdateView.as_view(), name='recruiter-update'),
    path('recruiters/<int:recruiter_id>/delete/', RecruiterProfileDeleteView.as_view(), name='recruiter-delete'),
    path('recruiters/create-job-post/', JobCreateView.as_view(), name='recruiter-delete'),


]

