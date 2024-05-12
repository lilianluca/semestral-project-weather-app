"""
Defined urls for weather api app
"""

from django.urls import path
from . import views

urlpatterns = [
    path('current/<str:city>', views.CurrentWeather.as_view(), name="current_weather_data"),
]
