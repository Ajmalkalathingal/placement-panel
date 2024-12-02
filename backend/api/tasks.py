# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.conf import settings
from .models import JobApplication,RecruiterProfile, User

import logging

logger = logging.getLogger(__name__)

@shared_task
def send_job_post_email_to_students(subject, message, recipient_list):
    send_mail(
        subject,
        message,
        'your-email@example.com',  # From email
        recipient_list,
        fail_silently=False,
    )

@shared_task
def send_application_notification(application_id):
    try:
        application = JobApplication.objects.get(id=application_id)
        recruiter_email = application.job.recruiter.user.email
        student_name = f"{application.student.user.first_name} {application.student.user.last_name}"
        job_title = application.job.title

        send_mail(
            subject=f"New Application for {job_title}",
            message=f"Dear {application.job.recruiter.user.first_name},\n\n"
                    f"{student_name} has applied for the position '{job_title}' that you posted.\n\n"
                    f"Log in to your dashboard to view more details.\n\n"
                    "Best regards,\nYour Job Portal Team",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recruiter_email],
            fail_silently=False,
        )
    except JobApplication.DoesNotExist:
        # Handle the case where the application does not exist
        pass


@shared_task
def send_verification_email(recruiter_id):
    try:
        recruiter = RecruiterProfile.objects.get(id=recruiter_id)
        verifiers = User.objects.filter(user_type='verifier').values_list('email', flat=True)

        logger.info(f"Verifiers: {list(verifiers)}")

        if verifiers:
            send_mail(
                'New Recruiter Registered',
                f'A new recruiter, {recruiter.user.first_name} {recruiter.user.last_name}, from {recruiter.company_name} has registered. Please verify their details.',
                'from@example.com',
                verifiers,
                fail_silently=False,
                
            )

    except RecruiterProfile.DoesNotExist:
        print(f"Recruiter with id {recruiter_id} not found.")


@shared_task
def send_interview_email_task(recruiter_email, student_email, subject, message):
    email = EmailMessage(
        subject=subject,
        body=message,
        from_email=settings.EMAIL_HOST_USER, 
        to=[student_email],                  
        reply_to=[recruiter_email]   
    )
    email.send(fail_silently=False)