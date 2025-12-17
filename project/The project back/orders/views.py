#from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView
from .models import Order
from .serializers import OrderSerializer


class OrderView(ListCreateAPIView):
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)
        
    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        qty = serializer.validated_data['quantity']
        serializer.save(
            buyer=self.request.user,
            total_price=product.price * qty
        )
