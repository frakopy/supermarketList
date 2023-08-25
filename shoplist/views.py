from django.views.generic.base import TemplateView
from .models import Item

class HomePageView(TemplateView):
    template_name = "shoplist/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["items"] = Item.objects.filter(purchased=False)
        return context

class PurchasedView(TemplateView):
    template_name = "shoplist/purchased_status.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["items"] = Item.objects.all()
        return context
