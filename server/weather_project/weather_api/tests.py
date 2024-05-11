"""
Contains unit tests for the Weather API App.
"""

import unittest

# from django.test import TestCase


# Create your tests here.
class TestStringMethods(unittest.TestCase):
    """
    test
    """

    def test_upper(self):
        """
        test
        """
        self.assertEqual("foo".upper(), "FOO")

    def test_isupper(self):
        """
        test
        """
        self.assertTrue("FOO".isupper())
        self.assertFalse("Foo".isupper())
