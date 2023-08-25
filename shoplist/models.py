from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.CharField(max_length=50)
    number = models.IntegerField(default=1)
    purchased = models.BooleanField(default=False)
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

