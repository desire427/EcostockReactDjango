from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("warehouse.urls")),
    path("api/v1/", include("produits.urls")),
    path("api/v1/token", TokenObtainPairView.as_view(), name="obtenir_token"),
    path("api/v1/refresh", TokenRefreshView.as_view(), name="refresh_token"),
]
