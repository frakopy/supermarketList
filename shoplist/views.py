from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Item


class LoginPageView(TemplateView):
    template_name = "shoplist/login.html"


class HomePageView(LoginRequiredMixin, TemplateView):
    login_url = "/"

    template_name = "shoplist/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["items"] = Item.objects.filter(purchased=False).order_by("-id")
        return context

class PurchasedView(LoginRequiredMixin, TemplateView):
    login_url = "/"

    template_name = "shoplist/purchased_status.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["items"] = Item.objects.all()
        return context
