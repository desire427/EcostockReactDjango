from django.contrib import admin
from .models import WareHouse


class WareHouseAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "capacity")
    search_fields = ("name", "location")
    list_filter = ("location",)


admin.site.register(WareHouse, WareHouseAdmin)
