from django.db import models

class Park(models.Model):
    title = models.CharField(max_length=50)
    lat = models.FloatField()
    lng = models.FloatField()

    def __str__(self):
        return f'{self.title}'