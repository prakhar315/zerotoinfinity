import os
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'takeyouforward.settings')
django.setup()

from django.contrib.auth import get_user_model
from topics.models import Topic, Content

User = get_user_model()

def create_sample_data():
    # Create sample topics
    linear_algebra = Topic.objects.create(
        title="Linear Algebra",
        description="Learn the fundamentals of linear algebra, including vectors, matrices, and transformations.",
        order=1,
        total_items=14
    )
    
    calculus = Topic.objects.create(
        title="Calculus",
        description="Master differential and integral calculus concepts and applications.",
        order=2,
        total_items=12
    )
    
    probability = Topic.objects.create(
        title="Probability & Statistics",
        description="Understand probability theory, statistical inference, and data analysis.",
        order=3,
        total_items=10
    )
    
    # Create subtopics for Linear Algebra
    vectors = Topic.objects.create(
        title="Vectors and Vector Spaces",
        description="Learn about vectors, vector operations, and vector spaces.",
        order=1,
        parent=linear_algebra,
        total_items=4
    )
    
    matrices = Topic.objects.create(
        title="Matrices and Linear Transformations",
        description="Understand matrices, matrix operations, and linear transformations.",
        order=2,
        parent=linear_algebra,
        total_items=5
    )
    
    eigenvalues = Topic.objects.create(
        title="Eigenvalues and Eigenvectors",
        description="Learn about eigenvalues, eigenvectors, and their applications.",
        order=3,
        parent=linear_algebra,
        total_items=3
    )
    
    # Create content for Vectors subtopic
    Content.objects.create(
        topic=vectors,
        title="Introduction to Vectors",
        content_type="video",
        url="https://www.youtube.com/watch?v=fNk_zzaMoSs",
        description="Learn the basics of vectors and vector operations.",
        order=1
    )
    
    Content.objects.create(
        topic=vectors,
        title="Vector Addition and Scalar Multiplication",
        content_type="video",
        url="https://www.youtube.com/watch?v=k7RM-ot2NWY",
        description="Understand how to add vectors and multiply them by scalars.",
        order=2
    )
    
    Content.objects.create(
        topic=vectors,
        title="Vector Spaces",
        content_type="video",
        url="https://www.youtube.com/watch?v=ozwodzD5bJM",
        description="Learn about vector spaces and their properties.",
        order=3
    )
    
    Content.objects.create(
        topic=vectors,
        title="Vector Space Exercises",
        content_type="exercise",
        url="https://www.math.ucdavis.edu/~linear/old/exercises/chapter2.pdf",
        description="Practice problems on vector spaces.",
        order=4
    )
    
    # Create content for Matrices subtopic
    Content.objects.create(
        topic=matrices,
        title="Introduction to Matrices",
        content_type="video",
        url="https://www.youtube.com/watch?v=xyAuNHPsq-g",
        description="Learn the basics of matrices and matrix operations.",
        order=1
    )
    
    Content.objects.create(
        topic=matrices,
        title="Matrix Multiplication",
        content_type="video",
        url="https://www.youtube.com/watch?v=XkY2DOUCWMU",
        description="Understand how to multiply matrices.",
        order=2
    )
    
    Content.objects.create(
        topic=matrices,
        title="Linear Transformations",
        content_type="video",
        url="https://www.youtube.com/watch?v=kYB8IZa5AuE",
        description="Learn about linear transformations and their matrix representations.",
        order=3
    )
    
    Content.objects.create(
        topic=matrices,
        title="Matrix Inverse",
        content_type="video",
        url="https://www.youtube.com/watch?v=uQhTuRlWMxw",
        description="Understand matrix inverses and how to compute them.",
        order=4
    )
    
    Content.objects.create(
        topic=matrices,
        title="Matrix Exercises",
        content_type="exercise",
        url="https://www.math.ucdavis.edu/~linear/old/exercises/chapter3.pdf",
        description="Practice problems on matrices and linear transformations.",
        order=5
    )
    
    # Create content for Eigenvalues subtopic
    Content.objects.create(
        topic=eigenvalues,
        title="Eigenvalues and Eigenvectors",
        content_type="video",
        url="https://www.youtube.com/watch?v=PFDu9oVAE-g",
        description="Learn about eigenvalues and eigenvectors.",
        order=1
    )
    
    Content.objects.create(
        topic=eigenvalues,
        title="Computing Eigenvalues",
        content_type="video",
        url="https://www.youtube.com/watch?v=e50Bj7jn9IQ",
        description="Learn how to compute eigenvalues and eigenvectors.",
        order=2
    )
    
    Content.objects.create(
        topic=eigenvalues,
        title="Eigenvalue Exercises",
        content_type="exercise",
        url="https://www.math.ucdavis.edu/~linear/old/exercises/chapter7.pdf",
        description="Practice problems on eigenvalues and eigenvectors.",
        order=3
    )
    
    # Create subtopics for Calculus
    limits = Topic.objects.create(
        title="Limits and Continuity",
        description="Learn about limits, continuity, and their applications.",
        order=1,
        parent=calculus,
        total_items=3
    )
    
    derivatives = Topic.objects.create(
        title="Derivatives",
        description="Understand derivatives, differentiation rules, and applications.",
        order=2,
        parent=calculus,
        total_items=4
    )
    
    integrals = Topic.objects.create(
        title="Integrals",
        description="Learn about integrals, integration techniques, and applications.",
        order=3,
        parent=calculus,
        total_items=5
    )
    
    # Create content for Limits subtopic
    Content.objects.create(
        topic=limits,
        title="Introduction to Limits",
        content_type="video",
        url="https://www.youtube.com/watch?v=riXcZT2ICjA",
        description="Learn the basics of limits.",
        order=1
    )
    
    Content.objects.create(
        topic=limits,
        title="Continuity",
        content_type="video",
        url="https://www.youtube.com/watch?v=ebP7R_NJYp0",
        description="Understand continuity and its relationship with limits.",
        order=2
    )
    
    Content.objects.create(
        topic=limits,
        title="Limits and Continuity Exercises",
        content_type="exercise",
        url="https://tutorial.math.lamar.edu/Problems/CalcI/LimitsAndContinuity.aspx",
        description="Practice problems on limits and continuity.",
        order=3
    )
    
    print("Sample data created successfully!")

if __name__ == "__main__":
    create_sample_data()
