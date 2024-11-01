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

    RecruterRegisterView,
    RecruiterListView,
    RecruiterProfileView,
    RecruiterProfileUpdateView,
    RecruiterProfileDeleteView,


    JobCreateView,
    JobListView,
    JobUpdateView,
    JobDeleteView,

    AllJobListView,
    apply_for_job,
    AppliedJobListView,

    JobApplicationsForRecruiterView,

    UpdateApplicationStatusView,
    unseen_applications_count,
    mark_applications_as_seen,

    CourseChoicesView,
    RegisterStudentView,
    RegistredStudentListView,
    RegisteredStudentDeleteView,
    RegisteredStudentUpdateView,

    CordinatorProfileView,

    export_student_registration_to_excel,
    UploadStudentDataView,

    PasswordResetRequestView,
    PasswordResetView,
)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/refresh/', TokenRefreshSlidingView.as_view(), name='token_refresh'),

    # Signup routes for different user types
    path('signup/student/', StudentSignupView.as_view(), name='student_signup'),
    path('signup/recruiter/', RecruiterSignupView.as_view(), name='recruiter_signup'),
    path('signup/coordinator/', CoordinatorSignupView.as_view(), name='coordinator_signup'),
    path('signup/verifier/', VerifierSignupView.as_view(), name='verifier_signup'),



     path('students/profile/', StudentProfileView.as_view(), name='student_profile'),
    path('student-profile/<int:student_id>/', StudentProfileUpdateView.as_view(), name='student-profile-update'),
    path('students/<int:student_id>/delete/', StudentProfileDeleteView.as_view(), name='student-delete'),


    path('recruiter/register/', RecruterRegisterView.as_view(), name='recruiter-register'),
    path('recruiters/profile/', RecruiterProfileView.as_view(), name='recruiter-profile'),
    path('recruiters/', RecruiterListView.as_view(), name='recruiter-list'),
    path('recruiters/<int:recruiter_id>/update/', RecruiterProfileUpdateView.as_view(), name='recruiter-update'),
    # path('recruiters/update/', RecruiterProfileUpdateView.as_view(), name='recruiter-update'),
    path('recruiters/<int:recruiter_id>/delete/', RecruiterProfileDeleteView.as_view(), name='recruiter-delete'),

    # job
    path('recruiters/create-job-post/', JobCreateView.as_view(), name='recruiter-delete'),
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('jobs/<int:pk>/update/', JobUpdateView.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', JobDeleteView.as_view(), name='job-delete'),

    path('jobs-lists/', AllJobListView.as_view(), name='job-list'),
    path('jobs/<int:job_id>/apply/', apply_for_job, name='apply_for_job'),
    path('jobs/applied-list/', AppliedJobListView.as_view(), name='apply_for_job'),

    path('recruiter/job-applications/', JobApplicationsForRecruiterView.as_view(), name='job-applications-for-recruiter'),
    path('applications/unseen-count/', unseen_applications_count, name='unseen-applications-count'),
    path('applications/mark-seen/', mark_applications_as_seen, name='mark-applications-as-seen'),
    path('recruiter/job-applications/<int:pk>/',UpdateApplicationStatusView.as_view(), name='update-application-status'),

    # registration
    path('course-choices/', CourseChoicesView.as_view(), name='course-choices'),
    path('register/', RegisterStudentView.as_view(), name='student-register'),
    path('student-list/', RegistredStudentListView.as_view(), name='recruiter-delete'),
    path('student-list/<int:pk>/', RegisteredStudentUpdateView.as_view(), name='recruiter-delete'),
    path('registred-student/<int:pk>/delete/', RegisteredStudentDeleteView.as_view(), name='recruiter-delete'),

    # CoordinatorProfile
    path('coordinators/profile/', CordinatorProfileView.as_view(), name='recruiter-delete'),

    # upload and download reg student 
    path('upload-student-data/', UploadStudentDataView.as_view(), name='upload_student_data'),
    path('export-student-registration/', export_student_registration_to_excel, name='export_student_registration'),

    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('reset-password/<str:token>/', PasswordResetView.as_view(), name='password_reset'),


]

