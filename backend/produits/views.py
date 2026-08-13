from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from warehouse.models import WareHouse
from django.utils import timezone

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()
        # Filtre optionnel par entrepôt : /api/v1/products/?warehouse=<id>
        warehouse_id = self.request.query_params.get('warehouse')
        if warehouse_id is not None:
            queryset = queryset.filter(warehouse_id=warehouse_id)
        return queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Statistiques globales des produits pour le tableau de bord."""
        total = Product.objects.count()
        today = timezone.now().date()
        # Produits non expirés = disponibles
        disponibles = Product.objects.filter(expiration_date__gte=today).count()
        # Produits avec faible stock (quantité ≤ 10)
        a_surveiller = Product.objects.filter(quantity__lte=10).count()
        return Response({
            'total_products': total,
            'disponibles': disponibles,
            'a_surveiller': a_surveiller,
        })

    @action(detail=True, methods=['post'])
    def move(self, request, pk=None):
        product = Product.objects.get(pk=pk)
        warehouse_id = request.data.get('warehouse')

        if warehouse_id is None:
            return Response({'message': 'Le champ warehouse est obligatoire'}, status=400)

        if product.expiration_date < timezone.now().date():
            return Response(
                {'message': 'Le déplacement ne peut pas s\'effectuer car la date est expirée'},
                status=400,
            )

        warehouse = WareHouse.objects.get(id=warehouse_id)
        product.warehouse = warehouse
        product.save()
        return Response({'message': 'Produit déplacé'})
