from django.urls import path
from .views import OrderView, SellerOrdersView

urlpatterns = [
    path('', OrderView.as_view()),
    path('seller/', SellerOrdersView.as_view()),
]