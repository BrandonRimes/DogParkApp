from django.urls import path

from .views import ListPark, DetailPark, ListPost, DetailPost

urlpatterns = [
    path('', ListPark.as_view()),
    path('<int:pk>/', DetailPark.as_view()),
    path('post/', ListPost.as_view()),
    path('post/<int:pk>/', DetailPost.as_view()),
]