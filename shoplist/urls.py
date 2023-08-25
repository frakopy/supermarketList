from django.urls import path
from .views import HomePageView, PurchasedView


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('purchased/', PurchasedView.as_view(), name='purchased'),
]