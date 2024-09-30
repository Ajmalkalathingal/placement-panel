from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User,StudentProfile,RecruiterProfile,Job,StudentRegistration,CoordinatorRegistration
from .forms import CustomUserCreationForm, CustomUserChangeForm

class UserAdmin(BaseUserAdmin):
    # Forms for adding and changing user instances
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    # Fields to display in the admin panel
    list_display = ('email', 'first_name', 'last_name', 'user_type', 'is_staff', 'is_superuser', 'is_active', 'is_approved', 'date_joined')
    list_filter = ('is_superuser', 'is_staff', 'is_active', 'user_type')

    # Fieldsets for the detail view in the admin (note: date_joined is removed)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'user_type')}),
        (_('Permissions'), {'fields': ('is_active', 'is_approved', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login',)}),  # 'date_joined' removed from here
    )

    # Customize the form to enter email and password instead of username
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'user_type', 'password1', 'password2', 'is_active', 'is_approved', 'is_staff', 'is_superuser')}
        ),
    )

    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions')

admin.site.register(User, UserAdmin)

admin.site.register(StudentProfile)
admin.site.register(RecruiterProfile)
admin.site.register(Job)
admin.site.register(StudentRegistration)
admin.site.register(CoordinatorRegistration)
