from django.shortcuts import render

from rest_framework import generics

from parks import models
from .serializers import ParkSerializer

class ListPark(generics.ListCreateAPIView):
    queryset = models.Park.objects.all()
    serializer_class = ParkSerializer


class DetailPark(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Park.objects.all()
    serializer_class = ParkSerializer