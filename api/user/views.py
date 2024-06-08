from .models import User, UserProfile
from django.contrib import auth
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['email', 'password']
    ),
    responses={200: openapi.Response('User created successfully')},
)
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

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['email', 'password']
    ),
    responses={200: openapi.Response('Login Succeeded')},
)
@api_view(['POST'])
def login(request):
    data = request.data
    user = auth.authenticate(email=data['email'], password=data['password'])

    if not user:
        return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    auth.login(request, user)

    return Response({'message': 'Login Succeeded'}, status=status.HTTP_201_CREATED)

@swagger_auto_schema(
    method='get',
    responses={200: openapi.Response('Logout Succeeded')},
)
@api_view(['GET'])
def logout(request):
    auth.logout(request)
    return Response({'message': 'Logout Succeeded'}, status=status.HTTP_201_CREATED)

# TODO: update total_carbon_emission in UserProfile when code table is updated
# @receiver(post_save, sender=#)
def update_total_carbon(sender, **kwargs):
    return