from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = 'parks'

urlpatterns = [
    path('', TemplateView.as_view(template_name="home.html"), name='home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)