from django.contrib import admin
from .models import Progress, OverallProgress

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'completed', 'completed_at')
    list_filter = ('completed', 'user')
    search_fields = ('user__username', 'content__title')

@admin.register(OverallProgress)
class OverallProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_completed', 'total_items', 'get_percentage', 'last_activity')
    search_fields = ('user__username',)
