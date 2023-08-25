from django.urls import path
from .views import ItemDetailView, ItemCreateView


urlpatterns = [
    path('items_create/', ItemCreateView.as_view(), name='items_create'),
    path('item/<int:pk>', ItemDetailView.as_view(), name='item'),
]