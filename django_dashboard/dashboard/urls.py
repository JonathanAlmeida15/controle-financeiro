from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clients/', include('clients.urls', namespace='clients')),
    path('', RedirectView.as_view(url='/clients/')),  # redireciona home para /clients/
    path('accounts/', include('django.contrib.auth.urls')),  # login/logout/password management
    path('', views.home, name='home'),
]
