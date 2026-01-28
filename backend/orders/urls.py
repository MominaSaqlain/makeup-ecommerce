from django.urls import path
from .views import OrderCreateAPIView, UserOrdersAPIView

urlpatterns = [
    path('create/', OrderCreateAPIView.as_view()),
    path('my/', UserOrdersAPIView.as_view()),
]
