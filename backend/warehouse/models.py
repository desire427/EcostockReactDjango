from django.db import models


class WareHouse(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom du magasin")
    location = models.CharField(max_length=100, verbose_name="lieu du magasin")
    capacity = models.IntegerField(verbose_name="capacité du magasin")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="date de mise à jour")

    def __str__(self):
        return f"{self.name} - {self.location}"
