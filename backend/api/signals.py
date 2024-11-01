from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RecruiterProfile,JobApplication
from django.core.mail import send_mail
from django.conf import settings
from .tasks import send_verification_email

@receiver(post_save, sender=RecruiterProfile)
def notify_verifier(sender, instance, created, **kwargs):
    if created:
        send_verification_email.delay(instance.id)


@receiver(post_save, sender=JobApplication)
def notify_recruiter(sender, instance, created, **kwargs):
    if created:
        recruiter_email = instance.job.recruiter.user.email
        student_profile = instance.student
        student_data = f"Student Name: {student_profile.user.first_name} {student_profile.user.last_name}\nEmail: {student_profile.user.email}\nCourse: {student_profile.registration.course}"

        send_mail(
            'New Job Application Received',
            f'A student has applied for your job: {instance.job.title}\n\n{student_data}',
            settings.DEFAULT_FROM_EMAIL,
            [recruiter_email],
            fail_silently=False,
        )

