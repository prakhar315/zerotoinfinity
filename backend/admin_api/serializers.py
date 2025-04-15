from rest_framework import serializers
from django.contrib.auth import get_user_model
from topics.models import Topic, Content
from progress.models import Progress, OverallProgress

User = get_user_model()

class AdminUserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model with admin-specific fields
    """
    progress_percentage = serializers.SerializerMethodField()
    completed_items = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()
    last_activity = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'date_joined', 'last_login', 'is_active', 'is_staff',
            'progress_percentage', 'completed_items', 'total_items', 'last_activity'
        ]
    
    def get_progress_percentage(self, obj):
        try:
            return obj.overall_progress.get_percentage()
        except OverallProgress.DoesNotExist:
            return 0
    
    def get_completed_items(self, obj):
        try:
            return obj.overall_progress.total_completed
        except OverallProgress.DoesNotExist:
            return 0
    
    def get_total_items(self, obj):
        try:
            return obj.overall_progress.total_items
        except OverallProgress.DoesNotExist:
            return 0
    
    def get_last_activity(self, obj):
        try:
            return obj.overall_progress.last_activity
        except OverallProgress.DoesNotExist:
            return None

class AdminTopicSerializer(serializers.ModelSerializer):
    """
    Serializer for Topic model with admin-specific fields
    """
    parent_title = serializers.SerializerMethodField()
    content_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Topic
        fields = [
            'id', 'title', 'description', 'order', 'parent', 'parent_title',
            'total_items', 'content_count', 'created_at', 'updated_at'
        ]
    
    def get_parent_title(self, obj):
        return obj.parent.title if obj.parent else None
    
    def get_content_count(self, obj):
        return obj.contents.count()

class AdminContentSerializer(serializers.ModelSerializer):
    """
    Serializer for Content model with admin-specific fields
    """
    topic_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Content
        fields = [
            'id', 'title', 'content_type', 'url', 'description', 
            'order', 'topic', 'topic_title', 'created_at', 'updated_at'
        ]
    
    def get_topic_title(self, obj):
        return obj.topic.title

class AdminDashboardSerializer(serializers.Serializer):
    """
    Serializer for admin dashboard statistics
    """
    total_users = serializers.IntegerField()
    active_users = serializers.IntegerField()
    total_topics = serializers.IntegerField()
    total_content = serializers.IntegerField()
    recent_users = AdminUserSerializer(many=True)
    recent_content = AdminContentSerializer(many=True)
