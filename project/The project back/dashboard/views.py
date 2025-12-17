#from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from products.models import Product
from orders.models import Order


class DashboardView(APIView):
    def get(self, request):
        user = request.user

        if user.user_type == 'seller':
            return Response({
                'my_products': Product.objects.filter(seller=user).count(),
                'orders_received': Order.objects.filter(product__seller=user).count(),
            })
        
        return Response({
            'orders_made': Order.objects.filter(buyer=user).count(),
            'purchase_history': Order.objects.filter(buyer=user).count(),
        })


from rest_framework.permissions import AllowAny


class ActivitiesView(APIView):
    """Return recent activities for the current user (products for sellers, orders for buyers)."""
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        activities = []

        if user and getattr(user, 'user_type', None) == 'seller':
            prods = Product.objects.filter(seller=user).order_by('-created_at')[:20]
            for p in prods:
                activities.append({
                    'type': 'product',
                    'id': p.id,
                    'title': p.name,
                    'created_at': p.created_at,
                })
        else:
            orders_qs = Order.objects.filter(buyer=user).order_by('-created_at')[:20] if user else Order.objects.order_by('-created_at')[:20]
            for o in orders_qs:
                activities.append({
                    'type': 'order',
                    'id': o.id,
                    'title': getattr(o.product, 'name', ''),
                    'created_at': o.created_at,
                })

        return Response(activities)
