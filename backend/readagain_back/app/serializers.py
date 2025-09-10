from rest_framework import serializers
from .models import Donation, AddBook, Swap, Wishlist

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddBook
        fields = '__all__'

class SwapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swap
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'
