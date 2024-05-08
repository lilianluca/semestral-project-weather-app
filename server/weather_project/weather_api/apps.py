"""
Django AppConfig file for the Weather API App.
"""

from django.apps import AppConfig


class WeatherApiConfig(AppConfig):
    """
    Django AppConfig for the Weather API App.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "weather_api"
