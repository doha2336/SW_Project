from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)  # Auto-set by backend
    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if getattr(obj, 'image', None):
            try:
                return request.build_absolute_uri(obj.image.url)
            except Exception:
                return obj.image.url
        return None
