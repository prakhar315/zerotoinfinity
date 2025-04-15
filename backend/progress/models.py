from django.db import models
from django.conf import settings
from topics.models import Content

class Progress(models.Model):
    """
    Model to track user progress on content items
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progress')
    content = models.ForeignKey('topics.Content', on_delete=models.CASCADE, related_name='progress')
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'content']
        verbose_name_plural = 'Progress'

    def __str__(self):
        return f"{self.user.username} - {self.content.title} - {'Completed' if self.completed else 'In Progress'}"

class OverallProgress(models.Model):
    """
    Model to track overall user progress across all topics
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='overall_progress')
    total_completed = models.IntegerField(default=0)
    total_items = models.IntegerField(default=0)
    last_activity = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Overall Progress: {self.get_percentage()}%"

    def get_percentage(self):
        if self.total_items == 0:
            return 0
        return int((self.total_completed / self.total_items) * 100)
