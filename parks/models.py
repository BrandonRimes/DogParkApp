from django.db import models

class Park(models.Model):
    show = False
    place_id = models.TextField()
    title = models.CharField(max_length=50)
    lat = models.FloatField()
    lng = models.FloatField()
    address = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.title}'

class Posts(models.Model):
    park_id = models.TextField()
    title = models.CharField(max_length=111)
    body = models.TextField()
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("parks:posts", args=(self.id,))