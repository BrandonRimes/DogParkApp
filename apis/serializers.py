from rest_framework import serializers

from parks import models
from django.contrib.auth.models import User

class NestedPostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.Post

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ParkSerializer(serializers.ModelSerializer):
    posts = NestedPostSerializer(read_only=True, many=True)
    class Meta:
        fields = (
            'id',
            'place_id',
            'title',
            'lat',
            'lng',
            'address',
            'posts',
        )
        model = models.Park

class PostSerializer(serializers.ModelSerializer):
    author_detail = NestedUserSerializer(read_only=True, source='author')
    class Meta:
        fields = (
            'id',
            'title',
            'author',
            'author_detail',
            'created',
            'updated',
            'body',
        )
        model = models.Post