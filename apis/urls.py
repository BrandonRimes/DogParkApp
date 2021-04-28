from django.urls import path

from .views import ListPark, DetailPark

urlpatterns = [
    path('', ListPark.as_view()),
    path('<int:pk>/', DetailPark.as_view()),
]