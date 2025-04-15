from django.urls import path
from .views import TopicListView, TopicDetailView, ContentListView

urlpatterns = [
    path('', TopicListView.as_view(), name='topic-list'),
    path('<int:pk>/', TopicDetailView.as_view(), name='topic-detail'),
    path('<int:topic_id>/contents/', ContentListView.as_view(), name='content-list'),
]
