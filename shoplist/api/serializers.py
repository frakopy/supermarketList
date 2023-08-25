from rest_framework import serializers
from shoplist.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id','name', 'description', 'number', 'purchased')