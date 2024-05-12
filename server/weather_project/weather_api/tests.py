"""
Contains unit tests for the Weather API App.
"""

from unittest.mock import patch
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
import requests

# Create your tests here.


class CurrentWeatherViewTest(TestCase):
    """
    Test cases for CurrentWeatherView
    """

    @patch("requests.get")
    def test_current_weather_success(self, mock_get):
        """
        Test successful retrieval of current weather.
        """
        # Mocking the response from the weather API
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "location": {
                "name": "London",
                "region": "City of London, Greater London",
                "country": "United Kingdom",
            },
            "current": {"temp_c": 20, "condition": {"text": "Sunny"}},
        }

        client = APIClient()
        response = client.get("/weather-api/v1/current/London")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["location"]["name"], "London")
        self.assertEqual(response.data["current"]["temp_c"], 20)
        self.assertEqual(response.data["current"]["condition"]["text"], "Sunny")

    @patch("requests.get")
    def test_current_weather_failure(self, mock_get):
        """
        Test failure in retrieving current weather.
        """
        # Mocking the response from the weather API with an error
        mock_get.side_effect = requests.exceptions.RequestException("Connection error")

        client = APIClient()
        response = client.get("/weather-api/v1/current/London")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data["error"], "Connection error")
