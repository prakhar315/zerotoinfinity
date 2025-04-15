import os
import django
import sys

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'takeyouforward.settings')
django.setup()

from django.contrib.auth import get_user_model
from topics.models import Topic, Content
from progress.models import Progress, OverallProgress
from django.db import connection

User = get_user_model()

def reset_database():
    """
    Reset the database by clearing all data except the admin user.
    """
    print("\n===== DATABASE RESET UTILITY =====\n")
    
    # Ask for confirmation
    confirm = input("⚠️ WARNING: This will delete all topics, content, and progress data. Continue? (y/n): ")
    if confirm.lower() != 'y':
        print("Operation cancelled.")
        return
    
    try:
        # Save admin users
        admin_users = list(User.objects.filter(is_staff=True).values('id', 'username', 'email'))
        print(f"Preserving {len(admin_users)} admin users...")
        
        # Delete all progress data
        progress_count = Progress.objects.count()
        Progress.objects.all().delete()
        print(f"Deleted {progress_count} progress records")
        
        # Delete all overall progress data
        overall_count = OverallProgress.objects.count()
        OverallProgress.objects.all().delete()
        print(f"Deleted {overall_count} overall progress records")
        
        # Delete all content
        content_count = Content.objects.count()
        Content.objects.all().delete()
        print(f"Deleted {content_count} content items")
        
        # Delete all topics
        topic_count = Topic.objects.count()
        Topic.objects.all().delete()
        print(f"Deleted {topic_count} topics")
        
        # Delete all non-admin users
        user_count = User.objects.filter(is_staff=False).count()
        User.objects.filter(is_staff=False).delete()
        print(f"Deleted {user_count} non-admin users")
        
        print("\n✅ Database reset complete!")
        print("You can now add new topics and content through the admin interface.")
        
    except Exception as e:
        print(f"❌ Error resetting database: {str(e)}")
    
    print("\n===== DATABASE RESET COMPLETE =====")

if __name__ == "__main__":
    reset_database()
