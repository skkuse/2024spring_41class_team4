from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def get_by_natural_key(self, email):
        return self.get(email=email)

# Create your models here.
class User(AbstractBaseUser):
    name = models.CharField(max_length=10)
    email = models.EmailField(unique=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [email]

    class Meta:
        db_table = 'user'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_carbon_emission = models.FloatField(default=0.0)
    
    class Meta:
        db_table = 'user_profile'
        ordering = ['total_carbon_emission']
