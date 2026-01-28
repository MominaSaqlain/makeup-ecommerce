from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer

class PaymentCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # In a real project, integrate with payment gateway here
        # For now, simulate payment
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()
            return Response({
                'message': 'Payment processed successfully',
                'payment_id': payment.id,
                'status': payment.payment_status
            })
        return Response(serializer.errors, status=400)

class PaymentHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        payments = Payment.objects.filter(order__user=request.user)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)