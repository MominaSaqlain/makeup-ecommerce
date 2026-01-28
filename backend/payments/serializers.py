from rest_framework import serializers
from .models import Payment
from orders.serializers import OrderSerializer

class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_method', 'amount', 'payment_status', 'transaction_id', 'created_at']