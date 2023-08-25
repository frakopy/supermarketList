from django.db import models

class PriceItem(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    brand = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    shop_name = models.CharField(max_length=255)
    price = models.FloatField()

    def __str__(self):
        return self.name