from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    # Nom de l'entrepôt lié, en lecture seule
    warehouse_name = serializers.CharField(source='warehouse.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'quantity', 'expiration_date', 'warehouse', 'warehouse_name']
