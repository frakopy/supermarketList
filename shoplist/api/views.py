from rest_framework.views import APIView
from .serializers import ItemSerializer
from shoplist.models import Item
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class ItemCreateView(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        if isinstance(data, list):
            serializer = ItemSerializer(data=data, many=True)
        else:
            serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemDetailView(APIView):
    def get(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        data = request.data
        serializer = ItemSerializer(item, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
