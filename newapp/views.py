from django.shortcuts import render
from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegistrationSerializer, WeatherSerializer
from rest_framework.response import Response
from django.http.response import JsonResponse
import requests
import json
# import jsonify
# Create your views here.


@api_view(['POST',])
def register(request):
    if request.method=='POST':
        serializer=RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            refresh=RefreshToken.for_user(user)
            access_token=str(refresh.access_token)
            refresh_token=str(refresh)
            return Response({'access_token':access_token,'refresh_token':refresh_token})
        else:
            return Response(serializer.errors,status=400)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user (you can use Django's built-in authentication system)
    user = authenticate(username=username, password=password)

    if user:
    # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
    # Return the tokens in the response
        return Response({'access_token': access_token, 'refresh_token': refresh_token})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['GET'])
def weather_search(request):
    location = request.data
    print(location.get('location'))

    
    APIkey='fa7fffeca65b44264beaa7cbb2a5a2a3'
    city=location.get('location')
    
    url = requests.get("http://api.openweathermap.org/geo/1.0/direct?q={}&appid={}".format(city,APIkey))
    
    jsonData = json.loads(url.content)
    latitude = jsonData[0]['lat']
    longitude = jsonData[0]['lon']    
    urls = requests.get("https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}".format(latitude,longitude,APIkey))
    # print('URLS', urls.text)
    # return JsonResponse(urls.text)

    response = {'message': 'success', 'error': False, 'data': json.loads(urls.text), 'status': 'success'}
    return JsonResponse(response)
    
    # try:
    #     response = requests.get(url)
    #     response.raise_for_status()
    #     data = response.json()

    #     # Extract the relevant weather information
    #     temperature = data['current']['temp_c']
    #     humidity = data['current']['humidity']

    #     weather_data = {
    #     'location': location,
    #     'temperature': temperature,
    #     'humidity': humidity,
    #     }

    #     return Response(weather_data)

    # except requests.exceptions.RequestException as e:
    #     return Response({'error': str(e)}, status=500)