from django.urls import path
from .views import (
    AdminLoginView,
    AdminDashboardView,
    AdminUserListView,
    AdminTopicListCreateView,
    AdminTopicDetailView,
    AdminContentListCreateView,
    AdminContentDetailView,
    AdminUserStatsView
)

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('users/', AdminUserListView.as_view(), name='admin-users'),
    path('topics/', AdminTopicListCreateView.as_view(), name='admin-topics'),
    path('topics/<int:pk>/', AdminTopicDetailView.as_view(), name='admin-topic-detail'),
    path('content/', AdminContentListCreateView.as_view(), name='admin-content'),
    path('content/<int:pk>/', AdminContentDetailView.as_view(), name='admin-content-detail'),
    path('user-stats/', AdminUserStatsView.as_view(), name='admin-user-stats'),
]
