#from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer


class OrderView(ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return buyer's orders by default
        return Order.objects.filter(buyer=self.request.user)
        
    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        qty = serializer.validated_data['quantity']
        serializer.save(
            buyer=self.request.user,
            total_price=product.price * qty
        )


class SellerOrdersView(ListAPIView):
    """List all orders that relate to products owned by the authenticated seller."""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(product__seller=self.request.user).select_related('product', 'buyer')

