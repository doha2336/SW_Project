from django.urls import path
from .views import OrderView
from rest_framework.routers import DefaultRouter
from rest_framework.generics import ListCreateAPIView

urlpatterns = [path('', OrderView.as_view())]