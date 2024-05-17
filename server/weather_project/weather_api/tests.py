"""
Contains unit tests for the Weather API App.
"""

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import FavoriteCity
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import FavoriteCitySerializer
import requests_mock


# Create your tests here.
class CurrentWeatherTests(APITestCase):
    def setUp(self):
        self.city = "London"
        self.url = reverse("current-weather", kwargs={"city": self.city})

    @requests_mock.Mocker()
    def test_get_current_weather_success(self, mocker):
        # Mocking the external weather API response
        mock_data = {
            "location": {
                "name": "London",
                "region": "",
                "country": "United Kingdom",
                "lat": 51.52,
                "lon": -0.11,
                "tz_id": "Europe/London",
                "localtime_epoch": 1618317040,
                "localtime": "2021-04-13 16:30",
            },
            "current": {
                "temp_c": 14.0,
                "condition": {
                    "text": "Partly cloudy",
                    "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                    "code": 1003,
                },
            },
        }
        mocker.get(
            f"http://api.weatherapi.com/v1/current.json?key=58c333f28d724673a9694938241205&q={self.city}&aqi=no",
            json=mock_data,
            status_code=200,
        )

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["location"]["name"], "London")
        self.assertEqual(response.data["current"]["temp_c"], 14.0)
        self.assertEqual(response.data["current"]["condition"]["text"], "Partly cloudy")

    @requests_mock.Mocker()
    def test_get_current_weather_failure(self, mocker):
        # Mocking the external weather API to return an error
        mocker.get(
            f"http://api.weatherapi.com/v1/current.json?key=58c333f28d724673a9694938241205&q={self.city}&aqi=no",
            status_code=500,
        )

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("error", response.data)


class HistoricalWeatherTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client = APIClient()
        self.token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse(
            "historical-weather", kwargs={"city": "London", "date": "2023-05-01"}
        )

    @requests_mock.Mocker()
    def test_get_historical_weather_failure(self, mocker):
        # Mocking the external weather API to return an error
        mocker.get(
            "http://api.weatherapi.com/v1/history.json?key=58c333f28d724673a9694938241205&q=London&dt=2023-05-01",
            status_code=500,
        )

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("error", response.data)

    @requests_mock.Mocker()
    def test_get_historical_weather_success(self, mocker):
        # Mocking the external weather API response
        mock_data = {
            "location": {
                "name": "London",
                "region": "",
                "country": "United Kingdom",
                "lat": 51.52,
                "lon": -0.11,
                "tz_id": "Europe/London",
                "localtime_epoch": 1618317040,
                "localtime": "2023-05-01",
            },
            "forecast": {
                "forecastday": [
                    {
                        "date": "2023-05-01",
                        "day": {
                            "maxtemp_c": 20.0,
                            "mintemp_c": 10.0,
                            "avgtemp_c": 15.0,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000,
                            },
                        },
                    }
                ]
            },
        }
        mocker.get(
            "http://api.weatherapi.com/v1/history.json?key=58c333f28d724673a9694938241205&q=London&dt=2023-05-01",
            json=mock_data,
            status_code=200,
        )

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["location"]["name"], "London")
        self.assertEqual(
            response.data["forecast"]["forecastday"][0]["day"]["maxtemp_c"], 20.0
        )
        self.assertEqual(
            response.data["forecast"]["forecastday"][0]["day"]["condition"]["text"],
            "Sunny",
        )


class FavoriteCityListCreateTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client = APIClient()
        self.token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(self.token))
        self.url = reverse("favorite-city-list-create")

    def test_list_favorite_cities(self):
        # Create some favorite cities for the user
        FavoriteCity.objects.create(user=self.user, city_name="London")
        FavoriteCity.objects.create(user=self.user, city_name="New York")

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        cities = FavoriteCity.objects.filter(user=self.user)
        serializer = FavoriteCitySerializer(cities, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_create_favorite_city(self):
        data = {"city_name": "Tokyo"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        city = FavoriteCity.objects.get(user=self.user, city_name="Tokyo")
        self.assertIsNotNone(city)
        self.assertEqual(city.city_name, "Tokyo")

    def test_create_favorite_city_invalid(self):
        data = {"city_name": ""}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_favorite_cities_unauthenticated(self):
        self.client.credentials()  # Clear credentials (no token)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_favorite_city_unauthenticated(self):
        self.client.credentials()  # Clear credentials (no token)
        data = {"city_name": "Tokyo"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class FavoriteCityDeleteTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.favorite_city = FavoriteCity.objects.create(
            user=self.user, city_name="London"
        )
        self.url = reverse("favorite-city-delete", kwargs={"pk": self.favorite_city.pk})

    def test_delete_favorite_city(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(FavoriteCity.objects.filter(pk=self.favorite_city.pk).exists())

    def test_delete_favorite_city_unauthenticated(self):
        self.client.logout()
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_favorite_city_of_another_user(self):
        # Create another user and favorite city
        other_user = User.objects.create_user(username="otheruser", password="testpass")
        other_favorite_city = FavoriteCity.objects.create(
            user=other_user, city_name="New York"
        )
        url = reverse("favorite-city-delete", kwargs={"pk": other_favorite_city.pk})

        # Attempt to delete the favorite city of another user
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
