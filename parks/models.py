from django.db import models

class Park(models.Model):
    name = models.CharField(max_length=50)
    website = models.URLField()

    def __str__(self):
        return f'{self.name}'