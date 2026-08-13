from rest_framework.views import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import WareHouse
from .serializers import WareHouseSerializer

class WareHouseViewSet(ModelViewSet):
    queryset = WareHouse.objects.all()
    serializer_class = WareHouseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=["get"])
    def audit(self, request, pk=None):
        warehouse = WareHouse.objects.get(pk=pk)
        total_products = warehouse.products.count()

        return Response(data={"total produis:": total_products}, status=200)
