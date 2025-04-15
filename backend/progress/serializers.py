from rest_framework import serializers
from .models import Progress, OverallProgress

class ProgressSerializer(serializers.ModelSerializer):
    """
    Serializer for Progress model
    """
    content_title = serializers.CharField(source='content.title', read_only=True)
    content_type = serializers.CharField(source='content.content_type', read_only=True)
    
    class Meta:
        model = Progress
        fields = ['id', 'content', 'content_title', 'content_type', 'completed', 'completed_at']
        read_only_fields = ['id', 'content_title', 'content_type', 'completed_at']

class OverallProgressSerializer(serializers.ModelSerializer):
    """
    Serializer for OverallProgress model
    """
    percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = OverallProgress
        fields = ['total_completed', 'total_items', 'percentage', 'last_activity']
        read_only_fields = ['total_completed', 'total_items', 'last_activity']
    
    def get_percentage(self, obj):
        return obj.get_percentage()
