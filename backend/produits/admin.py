from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "quantity", "expiration_date", "warehouse")
    search_fields = ("name", "warehouse__name")
    ordering = ("expiration_date",)


admin.site.register(Product, ProductAdmin)
