
from django.db import models

class Listing(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('sold', 'Sold'),
        ('expired', 'Expired'),
    ]
    
    CATEGORY_CHOICES = [
        ('wood', 'Wood'),
        ('metal', 'Metal'),
        ('furniture', 'Furniture'),
        ('home', 'Home'),
        ('lighting', 'Lighting'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='listing_images/', null=True, blank=True)
    
    def __str__(self):
        return self.name

class Activity(models.Model):
    ACTIVITY_TYPES = [
        ('listing', 'New Listing'),
        ('sale', 'Sale'),
        ('message', 'Message'),
        ('warning', 'Warning'),
        ('delete', 'Delete'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
