# Generated by Django 5.1.1 on 2024-11-07 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_studentregistration_registration_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='email_sent',
            field=models.BooleanField(default=False),
        ),
    ]