from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Topic, Content
from .serializers import TopicSerializer, TopicListSerializer, ContentSerializer

class TopicListView(generics.ListAPIView):
    """
    View for listing main topics (no parent)
    """
    serializer_class = TopicListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Topic.objects.filter(parent=None)

class TopicDetailView(generics.RetrieveAPIView):
    """
    View for retrieving a specific topic with its subtopics and contents
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated]

class ContentListView(generics.ListAPIView):
    """
    View for listing contents of a specific topic
    """
    serializer_class = ContentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        topic_id = self.kwargs.get('topic_id')
        return Content.objects.filter(topic_id=topic_id)
