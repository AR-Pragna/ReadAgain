from django.db import models
from django.contrib.auth.models import User

# class Book(models.Model):
#     title = models.CharField(max_length=255)
#     author = models.CharField(max_length=255, blank=True, null=True)
#     description = models.TextField()
#     image = models.ImageField(upload_to='book_images/')
#     genre = models.CharField(max_length=100, blank=True, null=True)
#     location = models.CharField(max_length=255)  # For location-based services
#     added_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="added_books")
#     is_available = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

class Donation(models.Model):
    book_title = models.CharField(max_length=255, verbose_name="Book Title")
    author = models.CharField(max_length=255, verbose_name="Author")
    condition = models.CharField(
        max_length=255, 
        verbose_name="Condition"
    )
    description = models.TextField(verbose_name="Description")
    cover_image = models.ImageField(upload_to='donated_books/')  # Save under MEDIA_ROOT/donated_books
    selected_location = models.TextField(
        verbose_name="Selected Location", 
    )

class AddBook(models.Model):
    book_name = models.CharField(max_length=255, verbose_name="Book Name")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.CharField(max_length=255, verbose_name="Author")
    book_img = models.ImageField(upload_to='added_books/')
    publisher = models.CharField(max_length=255, verbose_name="Publisher")


class Swap(models.Model):
    book_offered = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name="offered_in_swaps")
    book_requested = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name="requested_in_swaps")
    swapper = models.ForeignKey(User, on_delete=models.CASCADE, related_name="initiated_swaps")
    is_accepted = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Swap: {self.book_offered.title} for {self.book_requested.title}"

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlist")
    book = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name="wishlisted_by")

    def __str__(self):
        return f"{self.user.username}'s Wishlist: {self.book.title}"
