from django.urls import path
from .views import HomePageView, PurchasedView, LoginPageView


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('login/', LoginPageView.as_view(), name='login'),
    path('purchased/', PurchasedView.as_view(), name='purchased'),
]