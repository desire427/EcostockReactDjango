from rest_framework.routers import SimpleRouter
from .views import WareHouseViewSet


router = SimpleRouter()
router.register("warehouse", WareHouseViewSet, basename="warehouse")

urlpatterns = router.urls