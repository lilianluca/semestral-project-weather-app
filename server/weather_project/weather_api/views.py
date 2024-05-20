"""
Defines views for the Weather API App.
"""

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import FavoriteCity
from .serializers import FavoriteCitySerializer
import requests


# Create your views here.
class CurrentWeather(APIView):
    """
    Handling reqeusts for CurrentWeather view
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, city):
        """
        GET endpoint for getting current weather data
        """
        api_key = "58c333f28d724673a9694938241205"
        url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()  # Raise an exception for HTTP errors
            data = response.json()
            return Response(data)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)


class HistoricalWeather(APIView):
    """
    Handling requests for HistoricalWeather view
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, city, date):
        """
        GET endpoint for getting current weather data
        """
        api_key = "58c333f28d724673a9694938241205"
        url = f"http://api.weatherapi.com/v1/history.json?key={api_key}&q={city}&dt={date}"
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()  # Raise an exception for HTTP errors
            data = response.json()
            return Response(data)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)


class FavoriteCityListCreate(generics.ListCreateAPIView):
    serializer_class = FavoriteCitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FavoriteCity.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class FavoriteCityDelete(generics.DestroyAPIView):
    serializer_class = FavoriteCitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FavoriteCity.objects.filter(user=user)


class Forecast(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, city):
        """
        GET endpoint for getting current weather data
        """
        api_key = "58c333f28d724673a9694938241205"
        days = 3
        url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city}&days={days}&aqi=no&alerts=no"
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            data = response.json()
            return Response(data)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)
