# Generated by Django 5.0.6 on 2024-05-17 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("weather_api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="favoritecity",
            name="user",
        ),
    ]
