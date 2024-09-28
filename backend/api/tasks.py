# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from .models import Job


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
def delete_expired_job_posts():
    now = timezone.now()
    expired_jobs = Job.objects.filter(expiry_date__lt=now)
    count, _ = expired_jobs.delete()
    return f"{count} expired job posts were deleted"