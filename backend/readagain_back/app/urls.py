from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import DonationViewSet, BookViewSet, SwapViewSet, WishlistViewSet

# Initialize the router
router = DefaultRouter()
router.register(r'donations', DonationViewSet)
router.register(r'addbooks', BookViewSet)
router.register(r'swaps', SwapViewSet)
router.register(r'wishlist', WishlistViewSet)

# Include the router's URLs
urlpatterns = [
    path('', include(router.urls)),  # Include API routes
]
