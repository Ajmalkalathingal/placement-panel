from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.utils import timezone




# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('user_type', 'admin')
        return self.create_user(email, password, **extra_fields)

# Custom User Model
class User(AbstractBaseUser,PermissionsMixin):
    USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('recruiter', 'Recruiter'),
        ('coordinator', 'Coordinator'),
        ('verifier', 'Verifier'),
        ('admin', 'Admin'),
    )
    
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)

    is_active = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups', 
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups"
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions', 
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions"
    )

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return f'{self.email} - {self.user_type}'
    

# Student Profile
class StudentProfile(models.Model):
    COURSE_CHOICES = (
        ('MBA', 'MBA'),
        ('BBA', 'BBA'),
        ('MCA', 'MCA'),
        # Add more courses 
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'student'})
    enrollment_number = models.CharField(max_length=20, unique=True, blank=True)
    branch = models.CharField(max_length=50, null=True, blank=True)
    graduation_year = models.IntegerField(null=True, blank=True)
    course = models.CharField(max_length=3, choices=COURSE_CHOICES)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.enrollment_number:
            current_year = timezone.now().year

    
            latest_student = StudentProfile.objects.filter(
                course=self.course,
                enrollment_number__startswith=f"{self.course}-{current_year}"
            ).order_by('enrollment_number').last()

            if latest_student:
                last_enrollment_number = latest_student.enrollment_number
                last_sequence = int(last_enrollment_number.split('-')[-1])
                new_sequence = last_sequence + 1
            else:
                new_sequence = 1

            self.enrollment_number = f"{self.course}-{current_year}-{new_sequence:03d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.enrollment_number}'


# Recruiter Profile
class RecruiterProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'recruiter'})
    company_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    company_logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.company_name}'
    

class CoordinatorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'coordinator'})
    coordinator_id = models.CharField(max_length=20, unique=True) 

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.coordinator_id}'
    

class verifierProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'verifier'})

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'


# Job model
class Job(models.Model):
    recruiter = models.ForeignKey(RecruiterProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    requirements = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    job_type = models.CharField(max_length=20, choices=[('full-time', 'Full-Time'), ('internship', 'Internship')])
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [
            models.Index(fields=['recruiter', 'posted_on']),  
        ]

    def __str__(self):
        return self.title

