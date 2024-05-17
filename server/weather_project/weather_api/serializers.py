from rest_framework import serializers
from .models import FavoriteCity


class FavoriteCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteCity
        fields = ["id", "city_name", "user"]
        extra_kwargs = {"user": {"read_only": True}}
