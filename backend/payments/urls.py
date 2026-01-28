from django.urls import path
from .views import PaymentCreateAPIView, PaymentHistoryAPIView

urlpatterns = [
    path('create/', PaymentCreateAPIView.as_view()),
    path('history/', PaymentHistoryAPIView.as_view()),
]