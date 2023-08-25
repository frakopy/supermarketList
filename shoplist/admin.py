from django.contrib import admin
from .models import Item


class ItemAdmin(admin.ModelAdmin):

    # Display specific columns to show in the panel
    list_display = ("name", "description","number", "purchased", "purchased_at")


admin.site.register(Item, ItemAdmin)
