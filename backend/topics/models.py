from django.db import models

class Topic(models.Model):
    """
    Model for math topics (can be main topics or subtopics)
    """
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subtopics')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_items = models.IntegerField(default=0)  # Total number of content items in this topic

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

    def get_progress_percentage(self, user):
        """
        Calculate the progress percentage for a user on this topic
        """
        from progress.models import Progress
        # Get all content IDs for this topic
        content_ids = self.contents.values_list('id', flat=True)
        # Count completed content items
        completed_count = Progress.objects.filter(
            user=user,
            content_id__in=content_ids,
            completed=True
        ).count()
        if self.total_items == 0:
            return 0
        return int((completed_count / self.total_items) * 100)

class Content(models.Model):
    """
    Model for content items (videos, exercises, notes)
    """
    CONTENT_TYPES = (
        ('video', 'Video'),
        ('exercise', 'Exercise'),
        ('notes', 'Notes'),
    )

    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='contents')
    title = models.CharField(max_length=255)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    url = models.URLField()
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} ({self.get_content_type_display()})"
