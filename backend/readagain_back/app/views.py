from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Donation, AddBook, Swap, Wishlist
from .serializers import DonationSerializer, BookSerializer, SwapSerializer, WishlistSerializer

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = AddBook.objects.all()
    serializer_class = BookSerializer

class SwapViewSet(viewsets.ModelViewSet):
    queryset = Swap.objects.all()
    serializer_class = SwapSerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
