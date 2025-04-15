from rest_framework import serializers
from .models import Topic, Content

class ContentSerializer(serializers.ModelSerializer):
    """
    Serializer for Content model
    """
    class Meta:
        model = Content
        fields = ['id', 'title', 'content_type', 'url', 'description', 'order']

class SubtopicSerializer(serializers.ModelSerializer):
    """
    Serializer for subtopics
    """
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'order', 'total_items']

class TopicSerializer(serializers.ModelSerializer):
    """
    Serializer for Topic model
    """
    subtopics = SubtopicSerializer(many=True, read_only=True)
    contents = ContentSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'order', 'subtopics', 'contents', 'total_items', 'progress']
    
    def get_progress(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.get_progress_percentage(user)
        return 0

class TopicListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for listing topics
    """
    subtopics_count = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'total_items', 'subtopics_count', 'progress']
    
    def get_subtopics_count(self, obj):
        return obj.subtopics.count()
    
    def get_progress(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.get_progress_percentage(user)
        return 0
