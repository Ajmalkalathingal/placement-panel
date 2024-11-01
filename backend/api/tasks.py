# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from .models import Job,RecruiterProfile, User

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
def send_verification_email(recruiter_id):
    try:
        recruiter = RecruiterProfile.objects.get(id=recruiter_id)
        verifiers = User.objects.filter(user_type='verifier').values_list('email', flat=True)

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
 