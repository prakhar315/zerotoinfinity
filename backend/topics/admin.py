from django.contrib import admin
from .models import Topic, Content

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'parent', 'order', 'total_items')
    list_filter = ('parent',)
    search_fields = ('title', 'description')

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'content_type', 'order')
    list_filter = ('topic', 'content_type')
    search_fields = ('title', 'description')
