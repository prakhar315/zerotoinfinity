import os
import django
from datetime import datetime, timedelta

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'takeyouforward.settings')
django.setup()

from django.contrib.auth import get_user_model
from topics.models import Topic, Content
from progress.models import Progress, OverallProgress
from django.utils import timezone

User = get_user_model()

def create_sample_data():
    print("Creating sample data...")

    # Create admin user if it doesn't exist
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

    # Create regular users
    users = []
    for i in range(1, 6):
        username = f'user{i}'
        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(
                username=username,
                email=f'user{i}@example.com',
                password='password123',
                first_name=f'User{i}',
                last_name='Test',
                date_joined=timezone.now() - timedelta(days=i*5)
            )
            users.append(user)
            print(f"User created: {user.username}")
        else:
            users.append(User.objects.get(username=username))
            print(f"User already exists: {username}")

    # Create topics
    topics = []
    main_topics = [
        {'title': 'Linear Algebra', 'description': 'Learn the fundamentals of linear algebra', 'order': 1},
        {'title': 'Calculus', 'description': 'Master differential and integral calculus', 'order': 2},
        {'title': 'Probability', 'description': 'Understand probability theory and applications', 'order': 3},
    ]

    for topic_data in main_topics:
        topic, created = Topic.objects.get_or_create(
            title=topic_data['title'],
            defaults={
                'description': topic_data['description'],
                'order': topic_data['order'],
                'total_items': 0
            }
        )
        topics.append(topic)
        if created:
            print(f"Topic created: {topic.title}")
        else:
            print(f"Topic already exists: {topic.title}")

    # Create subtopics
    subtopics = [
        {'title': 'Vectors', 'description': 'Understanding vectors and operations', 'parent': 'Linear Algebra', 'order': 1},
        {'title': 'Matrices', 'description': 'Matrix operations and properties', 'parent': 'Linear Algebra', 'order': 2},
        {'title': 'Derivatives', 'description': 'Rules and applications of derivatives', 'parent': 'Calculus', 'order': 1},
        {'title': 'Integrals', 'description': 'Techniques of integration', 'parent': 'Calculus', 'order': 2},
        {'title': 'Random Variables', 'description': 'Discrete and continuous random variables', 'parent': 'Probability', 'order': 1},
    ]

    for subtopic_data in subtopics:
        parent = next((t for t in topics if t.title == subtopic_data['parent']), None)
        if parent:
            subtopic, created = Topic.objects.get_or_create(
                title=subtopic_data['title'],
                defaults={
                    'description': subtopic_data['description'],
                    'parent': parent,
                    'order': subtopic_data['order'],
                    'total_items': 0
                }
            )
            topics.append(subtopic)
            if created:
                print(f"Subtopic created: {subtopic.title} (parent: {parent.title})")
            else:
                print(f"Subtopic already exists: {subtopic.title}")

    # Create content
    content_items = [
        {'title': 'Introduction to Vectors', 'topic': 'Vectors', 'content_type': 'video', 'order': 1,
         'url': 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
         'description': 'Learn about vectors and their properties'},
        {'title': 'Vector Operations', 'topic': 'Vectors', 'content_type': 'notes', 'order': 2,
         'url': 'https://example.com/vector-operations',
         'description': 'Notes on vector addition, subtraction, and scalar multiplication'},
        {'title': 'Vector Practice Problems', 'topic': 'Vectors', 'content_type': 'exercise', 'order': 3,
         'url': 'https://example.com/vector-exercises',
         'description': 'Practice problems on vectors'},

        {'title': 'Matrix Basics', 'topic': 'Matrices', 'content_type': 'video', 'order': 1,
         'url': 'https://www.youtube.com/watch?v=xyAuNHPsq-g',
         'description': 'Introduction to matrices'},
        {'title': 'Matrix Multiplication', 'topic': 'Matrices', 'content_type': 'notes', 'order': 2,
         'url': 'https://example.com/matrix-multiplication',
         'description': 'Notes on matrix multiplication'},

        {'title': 'Derivative Rules', 'topic': 'Derivatives', 'content_type': 'video', 'order': 1,
         'url': 'https://www.youtube.com/watch?v=HfACrKJ_Y2w',
         'description': 'Learn the rules of differentiation'},
        {'title': 'Derivative Applications', 'topic': 'Derivatives', 'content_type': 'exercise', 'order': 2,
         'url': 'https://example.com/derivative-applications',
         'description': 'Applications of derivatives in real-world problems'},

        {'title': 'Integration Techniques', 'topic': 'Integrals', 'content_type': 'video', 'order': 1,
         'url': 'https://www.youtube.com/watch?v=0QCRpxJhMmM',
         'description': 'Various techniques for integration'},

        {'title': 'Probability Distributions', 'topic': 'Random Variables', 'content_type': 'notes', 'order': 1,
         'url': 'https://example.com/probability-distributions',
         'description': 'Notes on common probability distributions'},
    ]

    all_topics = Topic.objects.all()
    content_objects = []

    for content_data in content_items:
        topic = next((t for t in all_topics if t.title == content_data['topic']), None)
        if topic:
            content, created = Content.objects.get_or_create(
                title=content_data['title'],
                topic=topic,
                defaults={
                    'content_type': content_data['content_type'],
                    'url': content_data['url'],
                    'description': content_data['description'],
                    'order': content_data['order']
                }
            )
            content_objects.append(content)
            if created:
                print(f"Content created: {content.title} (topic: {topic.title})")
            else:
                print(f"Content already exists: {content.title}")

    # Update total_items for each topic
    for topic in all_topics:
        # Count direct content items
        direct_count = Content.objects.filter(topic=topic).count()

        # Count content items in subtopics
        subtopic_count = 0
        for subtopic in Topic.objects.filter(parent=topic):
            subtopic_content_count = Content.objects.filter(topic=subtopic).count()
            subtopic.total_items = subtopic_content_count
            subtopic.save()
            subtopic_count += subtopic_content_count

        # Update total_items
        topic.total_items = direct_count + subtopic_count
        topic.save()
        print(f"Updated topic {topic.title}: total_items = {topic.total_items}")

    # Create progress records
    for user in users:
        for content in content_objects:
            # Randomly mark some content as completed
            completed = (user.id + content.id) % 3 == 0
            progress, created = Progress.objects.get_or_create(
                user=user,
                content=content,
                defaults={
                    'completed': completed,
                    'completed_at': timezone.now() if completed else None
                }
            )
            if created:
                print(f"Progress created for {user.username} on {content.title}: {'Completed' if completed else 'In Progress'}")
            else:
                print(f"Progress already exists for {user.username} on {content.title}")

    # Create or update overall progress
    for user in users:
        completed_count = Progress.objects.filter(user=user, completed=True).count()
        total_count = Content.objects.count()

        overall_progress, created = OverallProgress.objects.get_or_create(
            user=user,
            defaults={
                'total_completed': completed_count,
                'total_items': total_count,
                'last_activity': timezone.now()
            }
        )

        if not created:
            overall_progress.total_completed = completed_count
            overall_progress.total_items = total_count
            overall_progress.last_activity = timezone.now()
            overall_progress.save()

        print(f"Overall progress for {user.username}: {overall_progress.get_percentage()}%")

    print("Sample data creation complete!")

if __name__ == "__main__":
    create_sample_data()
