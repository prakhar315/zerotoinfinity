import os
import django
import json

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'takeyouforward.settings')
django.setup()

from django.contrib.auth import get_user_model
from topics.models import Topic, Content
from django.core.serializers.json import DjangoJSONEncoder

User = get_user_model()

def test_database_connection():
    """
    Test the database connection and print out some basic information
    about the database contents.
    """
    print("\n===== DATABASE CONNECTION TEST =====\n")
    
    # Test User model
    try:
        user_count = User.objects.count()
        print(f"✅ Successfully connected to User table")
        print(f"   - {user_count} users in the database")
        
        # List admin users
        admin_users = User.objects.filter(is_staff=True)
        print(f"   - {admin_users.count()} admin users:")
        for user in admin_users:
            print(f"     * {user.username} (email: {user.email})")
    except Exception as e:
        print(f"❌ Error connecting to User table: {str(e)}")
    
    print("\n")
    
    # Test Topic model
    try:
        topic_count = Topic.objects.count()
        print(f"✅ Successfully connected to Topic table")
        print(f"   - {topic_count} topics in the database")
        
        # List main topics
        main_topics = Topic.objects.filter(parent=None)
        print(f"   - {main_topics.count()} main topics:")
        for topic in main_topics:
            print(f"     * {topic.title} (ID: {topic.id})")
            
            # List subtopics
            subtopics = Topic.objects.filter(parent=topic)
            if subtopics.exists():
                print(f"       Subtopics:")
                for subtopic in subtopics:
                    print(f"       - {subtopic.title} (ID: {subtopic.id})")
    except Exception as e:
        print(f"❌ Error connecting to Topic table: {str(e)}")
    
    print("\n")
    
    # Test Content model
    try:
        content_count = Content.objects.count()
        print(f"✅ Successfully connected to Content table")
        print(f"   - {content_count} content items in the database")
        
        # List content by type
        content_types = Content.objects.values_list('content_type', flat=True).distinct()
        for content_type in content_types:
            type_count = Content.objects.filter(content_type=content_type).count()
            print(f"   - {type_count} {content_type} resources")
    except Exception as e:
        print(f"❌ Error connecting to Content table: {str(e)}")
    
    print("\n===== DATABASE SAMPLE DATA =====\n")
    
    # Export sample data as JSON
    try:
        # Get a sample topic with its content
        sample_topic = Topic.objects.first()
        if sample_topic:
            topic_data = {
                'id': sample_topic.id,
                'title': sample_topic.title,
                'description': sample_topic.description,
                'order': sample_topic.order,
                'parent_id': sample_topic.parent_id,
                'content': []
            }
            
            # Get content for this topic
            for content in Content.objects.filter(topic=sample_topic):
                topic_data['content'].append({
                    'id': content.id,
                    'title': content.title,
                    'content_type': content.content_type,
                    'url': content.url,
                    'description': content.description,
                    'order': content.order
                })
            
            print(f"Sample Topic Data (ID: {sample_topic.id}):")
            print(json.dumps(topic_data, indent=2, cls=DjangoJSONEncoder))
        else:
            print("No topics found in the database.")
    except Exception as e:
        print(f"❌ Error exporting sample data: {str(e)}")
    
    print("\n===== DATABASE CONNECTION TEST COMPLETE =====")

if __name__ == "__main__":
    test_database_connection()
