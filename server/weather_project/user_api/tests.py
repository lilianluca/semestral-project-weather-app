"""
Tests for user_api app
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .models import AppUser
from .serializers import UserRegisterSerializer
from . import validations

UserModel = get_user_model()

AppUser = get_user_model()


# Create your tests here.
class AppUserModelTest(TestCase):
    """
    Testing AppUser model
    """

    def setUp(self):
        """
        Setup method for tests
        """
        self.user = AppUser.objects.create(
            email="test@example.com", username="testuser"
        )

    def test_user_creation(self):
        """
        Test that a user is created correctly.
        """
        self.assertEqual(self.user.email, "test@example.com")
        self.assertEqual(self.user.username, "testuser")

    def test_user_str_representation(self):
        """
        Test the string representation of the user.
        """
        self.assertEqual(str(self.user), "testuser")

    def test_unique_email_constraint(self):
        """
        Test that email field enforces uniqueness constraint.
        """
        with self.assertRaises(Exception):
            AppUser.objects.create(email="test@example.com", username="anotheruser")


class AppUserManagerTest(TestCase):
    """
    Testing AppUserManager model
    """

    def test_create_user(self):
        """
        Test creating a regular user.
        """
        user = AppUser.objects.create_user(
            email="test@example.com", password="testpassword"
        )
        self.assertEqual(user.email, "test@example.com")
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.check_password("testpassword"))

    def test_create_superuser(self):
        """
        Test creating a superuser.
        """
        superuser = AppUser.objects.create_superuser(
            email="admin@example.com", password="adminpassword"
        )
        self.assertEqual(superuser.email, "admin@example.com")
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.check_password("adminpassword"))

    def test_missing_email(self):
        """
        Test if error is raised when email is missing.
        """
        with self.assertRaises(ValueError):
            AppUser.objects.create_user(email=None, password="testpassword")

    def test_missing_password(self):
        """
        Test if error is raised when password is missing.
        """
        with self.assertRaises(ValueError):
            AppUser.objects.create_user(email="test@example.com", password=None)


class CustomValidationTest(TestCase):
    """
    Testing CustomValidation
    """

    def test_custom_validation(self):
        """
        Test custom validation function.
        """
        # Valid data
        valid_data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword",
        }
        self.assertEqual(validations.custom_validation(valid_data), valid_data)

        # Short password
        short_password_data = {
            "email": "new@example.com",
            "username": "testuser",
            "password": "short",
        }
        with self.assertRaises(ValidationError) as context:
            validations.custom_validation(short_password_data)
        self.assertIn(
            "choose another password, min 8 characters", str(context.exception)
        )

        # Empty username
        empty_username_data = {
            "email": "new@example.com",
            "username": "",
            "password": "testpassword",
        }
        with self.assertRaises(ValidationError) as context:
            validations.custom_validation(empty_username_data)
        self.assertIn("choose another username", str(context.exception))


class ValidateEmailTest(TestCase):
    """
    Testing ValidateEmail
    """

    def test_validate_email(self):
        """
        Test validate_email function.
        """
        # Valid email
        valid_data = {"email": "test@example.com"}
        self.assertTrue(validations.validate_email(valid_data))

        # Empty email
        empty_email_data = {"email": ""}
        with self.assertRaises(ValidationError) as context:
            validations.validate_email(empty_email_data)
        self.assertIn("an email is needed", str(context.exception))


class ValidateUsernameTest(TestCase):
    """
    Testing ValidateUsername
    """

    def test_validate_username(self):
        """
        Test validate_username function.
        """
        # Valid username
        valid_data = {"username": "testuser"}
        self.assertTrue(validations.validate_username(valid_data))

        # Empty username
        empty_username_data = {"username": ""}
        with self.assertRaises(ValidationError) as context:
            validations.validate_username(empty_username_data)
        self.assertIn("choose another username", str(context.exception))


class ValidatePasswordTest(TestCase):
    """
    Testing ValidatePassword
    """

    def test_validate_password(self):
        """
        Test validate_password function.
        """
        # Valid password
        valid_data = {"password": "testpassword"}
        self.assertTrue(validations.validate_password(valid_data))

        # Empty password
        empty_password_data = {"password": ""}
        with self.assertRaises(ValidationError) as context:
            validations.validate_password(empty_password_data)
        self.assertIn("a password is needed", str(context.exception))


class UserRegisterSerializerTest(TestCase):
    """
    Test UserRegisterSerializer
    """

    def test_user_register_serializer_create(self):
        """
        Test UserRegisterSerializer create method.
        """
        data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword",
        }
        serializer = UserRegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.username, "testuser")
