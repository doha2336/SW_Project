from django.shortcuts import render

from rest_framework import viewsets
from .models import Listing, Activity
from .serializers_api import ListingSerializer, ActivitySerializer  # Changed import

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
