from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models


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
    

class StudentRegistration(models.Model):
    COURSE_CHOICES = (
        ('MBA', 'MBA'),
        ('BBA', 'BBA'),
        ('MCA', 'MCA'),
        # Add more courses
    )

    student_id = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    registration_code = models.CharField(max_length=100, null=True, blank=True)
    is_registered = models.BooleanField(default=False) 
    course = models.CharField(max_length=10, choices=COURSE_CHOICES, null=True, blank=True) 

    def __str__(self):
        return f'{self.student_id} - {self.email} - Course: {self.course} - Registered: {self.is_registered}'
    

class CoordinatorRegistration(models.Model):
    coordinator_id = models.CharField(max_length=20, unique=True)  
    email = models.EmailField(unique=True)
    registration_code = models.CharField(max_length=100, null=True, blank=True)  
    is_registered = models.BooleanField(default=False) 
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='coordinator_profile', 
        null=True, blank=True
    )

    def __str__(self):
        if self.user:  # Check if user is not None
            return f'{self.user.first_name} {self.user.last_name} - {self.email} - Registered: {self.is_registered}'
        return f'{self.coordinator_id} - {self.email} - Registered: {self.is_registered}'


    # def __str__(self):
    #     return f'{self.user.first_name} {self.user.last_name}'

# CoordinatorProfile model 
class CoordinatorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'coordinator'})
    registration = models.OneToOneField(CoordinatorRegistration, on_delete=models.CASCADE, related_name='profile')

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    

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

# Student Profile Model
class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'student'})
    registration = models.OneToOneField(StudentRegistration, on_delete=models.CASCADE, related_name='profile') 
    graduation_year = models.IntegerField(null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    # jop_post = mod  ls.ForeignKey(Job, on_delete=models.CASCADE)
