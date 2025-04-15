from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import Progress, OverallProgress
from .serializers import ProgressSerializer, OverallProgressSerializer
from topics.models import Content

class ProgressUpdateView(APIView):
    """
    View for updating progress on a content item
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, content_id):
        try:
            content = Content.objects.get(id=content_id)
            progress, created = Progress.objects.get_or_create(
                user=request.user,
                content=content,
                defaults={'completed': False}
            )

            # Update progress
            progress.completed = request.data.get('completed', False)
            if progress.completed and not progress.completed_at:
                progress.completed_at = timezone.now()
            progress.save()

            # Update overall progress
            overall_progress, _ = OverallProgress.objects.get_or_create(user=request.user)
            completed_count = Progress.objects.filter(user=request.user, completed=True).count()
            total_count = Content.objects.count()

            overall_progress.total_completed = completed_count
            overall_progress.total_items = total_count
            overall_progress.save()

            return Response(ProgressSerializer(progress).data)
        except Content.DoesNotExist:
            return Response({"error": "Content not found"}, status=status.HTTP_404_NOT_FOUND)

class OverallProgressView(generics.RetrieveAPIView):
    """
    View for retrieving overall progress
    """
    serializer_class = OverallProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        overall_progress, created = OverallProgress.objects.get_or_create(user=self.request.user)
        if created:
            # Initialize with correct counts
            completed_count = Progress.objects.filter(user=self.request.user, completed=True).count()
            total_count = Content.objects.count()

            overall_progress.total_completed = completed_count
            overall_progress.total_items = total_count
            overall_progress.save()

        return overall_progress
