from django.urls import path
from . import views

urlpatterns = [
    path("", views.insight_index, name="insight_index"),
    path("upload/", views.upload_file, name="upload"),
    path("analyze/<int:id>", views.analyze, name="analyze"),
]
