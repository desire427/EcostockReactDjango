from rest_framework import serializers
from .models import WareHouse


class WareHouseSerializer(serializers.ModelSerializer):
    # Nombre de produits liés, calculé depuis le related_name "products"
    products_count = serializers.SerializerMethodField()

    class Meta:
        model = WareHouse
        fields = ['id', 'name', 'location', 'capacity', 'created_at', 'updated_at', 'products_count']

    def get_products_count(self, obj):
        return obj.products.count()
