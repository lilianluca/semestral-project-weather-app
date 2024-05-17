"""
Defined urls for weather api app
"""

from django.urls import path
from . import views

urlpatterns = [
    path(
        "current/<str:city>/",
        views.CurrentWeather.as_view(),
        name="current-weather",
    ),
    path(
        "history/<str:city>/<str:date>/",
        views.HistoricalWeather.as_view(),
        name="historical-weather",
    ),
    path(
        "favorite-cities/",
        views.FavoriteCityListCreate.as_view(),
        name="favorite-city-list-create",
    ),
    path(
        "favorite-cities/delete/<int:pk>/",
        views.FavoriteCityDelete.as_view(),
        name="favorite-city-delete",
    ),
]
