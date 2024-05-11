"""
Serializers for User API functionality.
"""

from django.contrib.auth import get_user_model, authenticate
from django.forms import ValidationError
from rest_framework import serializers

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    Creates a new user instance based on provided data.
    """

    class Meta:
        """
        Meta class
        """

        model = UserModel
        fields = "__all__"

    def create(self, validated_data):
        """
        Create a new user object.
        """
        user_obj = UserModel.objects.create_user(
            email=validated_data["email"], password=validated_data["password"]
        )
        user_obj.username = validated_data["username"]
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login.

    Authenticates user based on provided credentials.
    """

    email = serializers.EmailField()
    password = serializers.CharField()

    ##
    def check_user(self, clean_data):
        """
        Authenticate user.
        """
        user = authenticate(
            username=clean_data["email"], password=clean_data["password"]
        )
        if not user:
            raise ValidationError("user not found")
        return user

    def create(self, validated_data):
        """
        Create object - not applicable in this serializer.
        """

    def update(self, instance, validated_data):
        """
        Update object - not applicable in this serializer.
        """


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user data.

    Serializes user information such as email and username.
    """

    class Meta:
        """
        Meta class
        """

        model = UserModel
        fields = ("email", "username")
