"""
User api app configuration module
"""

from django.apps import AppConfig


class UserApiConfig(AppConfig):
    """
    UserApi config
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "user_api"
