"""
Defines views for the Weather API App.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
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
