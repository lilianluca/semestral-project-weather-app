"""
Define database models for the Weather API App.
"""

from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class FavoriteCity(models.Model):
    city_name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.city_name
