from django.db import models
from warehouse.models import WareHouse


class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom du produit")
    quantity = models.IntegerField(verbose_name="Quantité du produit")
    expiration_date = models.DateField(verbose_name="Date d'expiration du produit")
    warehouse = models.ForeignKey(WareHouse, on_delete=models.CASCADE, verbose_name="Magasin", related_name="products")
    
    def _str__(self):
        return f"{self.name} - {self.quantity} - {self.expiration_date} - {self.warehouse}"