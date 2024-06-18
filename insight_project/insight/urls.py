from django.urls import path
from . import views

urlpatterns = [
    path("", views.insight_index, name="insight_index"),
]
