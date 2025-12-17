from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product
from .serializers import ProductSerializer
from .permissions import IsSeller


class ProductViewSet(ModelViewSet):
    """
    A viewset for managing products.
    Sellers can create/update/delete their own products.
    Listing and retrieving products is public (read-only).
    """
    serializer_class = ProductSerializer

    def get_permissions(self):
        # allow anyone to list and retrieve
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated(), IsSeller()]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return Product.objects.all()
        return Product.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)
