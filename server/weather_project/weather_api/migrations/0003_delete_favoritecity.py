# Generated by Django 5.0.6 on 2024-05-17 10:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("weather_api", "0002_remove_favoritecity_user"),
    ]

    operations = [
        migrations.DeleteModel(
            name="FavoriteCity",
        ),
    ]
