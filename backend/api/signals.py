from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RecruiterProfile
from .tasks import send_verification_email

@receiver(post_save, sender=RecruiterProfile)
def notify_verifier(sender, instance, created, **kwargs):
    if created:
        send_verification_email.delay(instance.id)

