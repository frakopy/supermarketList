from django.urls import path
from .views import HomePageView, PurchasedView, LoginPageView


urlpatterns = [
    path('', LoginPageView.as_view(), name='login'),
    path('home/', HomePageView.as_view(), name='home'),
    path('purchased/', PurchasedView.as_view(), name='purchased'),
]