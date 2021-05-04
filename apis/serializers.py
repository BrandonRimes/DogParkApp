from rest_framework import serializers
from parks import models

class ParkSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = models.Park

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = models.Posts
