import os
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'takeyouforward.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Create admin user
if not User.objects.filter(username='admin').exists():
    admin_user = User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123'
    )
    print(f"Admin user created: {admin_user.username}")
else:
    admin_user = User.objects.get(username='admin')
    admin_user.set_password('admin123')
    admin_user.save()
    print(f"Admin user password reset: {admin_user.username}")

# Create a test topic
from topics.models import Topic

topic, created = Topic.objects.get_or_create(
    title='Test Topic',
    defaults={
        'description': 'A test topic',
        'order': 1,
        'total_items': 0
    }
)

if created:
    print(f"Topic created: {topic.title}")
else:
    print(f"Topic already exists: {topic.title}")

# Create a test content
from topics.models import Content

content, created = Content.objects.get_or_create(
    title='Test Content',
    topic=topic,
    defaults={
        'content_type': 'video',
        'url': 'https://example.com/test',
        'description': 'A test content item',
        'order': 1
    }
)

if created:
    print(f"Content created: {content.title}")
else:
    print(f"Content already exists: {content.title}")

print("Done!")
