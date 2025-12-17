from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)  # Auto-set by backend
    
    class Meta:
        model = Product
        fields = '__all__'
