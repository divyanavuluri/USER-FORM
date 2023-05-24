from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .helpers import send_otp_to_phone
from .models import user

@api_view(['POST'])
def send_otp(request):
    data = request.data 
    
    if data.get('phone_number') is None:
        return Response({
            'status' :400,
            'message' : 'key phone_number is required'
        })
        
    if data.get('password') is None:
        return Response({
            'status' :400,
            'message' : 'key password is required'
        })
        
    user = User.objects.create(
        phone_number=data.get('phone_number'),
        otp = send_otp_to_phone(data.get('phone_number'))
    )
    user.set_password = data.get('set_assword')
    user.save()
    
    return Response({
        'status' : 200 , 'message' : 'Otp Sent'
    })
    
    
    
    
    
    
    
    
    
@api_view(['POST'])
def verify_otp(request):
    data=request.data 
    
    if data.get('phone_number') is None:
        return Response({
            'status' : 400,
            'message' : 'key phone_number is required'
        })
        
    if data.get('otp') is None:
        return Response({
            'status' : 400,
            'message' : 'key otp is required'
        })
        
    try:
        user_obj=User.objects.get(phone_number = data.get('phone_number'))
        
    except Exception as e:
        return Response({
            'status' : 400,
            'message' : 'invalid phone'
        })
        
    if user_obj.otp==data.get('otp'):
        return Response({
            'status' : 200,
            'message' : 'otp matched'
        })
       
    return Response({
        'status' : 400,
        'message' : 'invalid otp'
    })    
    