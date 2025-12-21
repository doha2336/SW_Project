from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListingViewSet, ActivityViewSet

router = DefaultRouter()
router.register(r'listings', ListingViewSet)
router.register(r'activities', ActivityViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
