import unittest
import requests

BASE_URL = "http://localhost:5000/api/data"

class TestAPI(unittest.TestCase):
    def test_get_data(self):
        response = requests.get(BASE_URL)
        self.assertEqual(response.status_code, 200)

    def test_post_data(self):
        sample_data = {
            "end_year": "2022",
            "intensity": 5,
            "sector": "Energy",
            "topic": "Oil",
            "region": "World",
            "pestle": "Economic",
            "source": "Test Source"
        }
        response = requests.post(BASE_URL, json=sample_data)
        self.assertEqual(response.status_code, 201)

if __name__ == '__main__':
    unittest.main()
