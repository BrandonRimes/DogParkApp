from django.db import models

class Park(models.Model):
    place_id = models.TextField()
    title = models.CharField(max_length=50)
    lat = models.FloatField()
    lng = models.FloatField()
    address = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.title}'

class Post(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=111)
    body = models.TextField()
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title}'
    
    def get_absolute_url(self):
        return reverse('parks:post', args=(self.id,))