from .models import User, UserProfile
from django.contrib import auth
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt


@api_view(['POST'])
def signup(request):
    data = request.data
    if User.objects.filter(email=data['email']).exists():
        return Response({'message': 'User already exists'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create(name=data['name'], email=data['email'])
    user.set_password(data['password'])
    user.save()

    UserProfile.objects.create(user=user)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    data = request.data
    user = auth.authenticate(email=data['email'], password=data['password'])

    if not user:
        return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    auth.login(request, user)

    return Response({'message': 'Login Succeeded'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def logout(request):
    auth.logout(request)
    return Response({'message': 'Logout Succeeded'}, status=status.HTTP_201_CREATED)