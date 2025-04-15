from django.urls import path
from .views import ProgressUpdateView, OverallProgressView

urlpatterns = [
    path('content/<int:content_id>/', ProgressUpdateView.as_view(), name='progress-update'),
    path('overall/', OverallProgressView.as_view(), name='overall-progress'),
]
