from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.urls import reverse
from django.db.models import Count


class MyUser(AbstractUser):
    avatar = models.ImageField(upload_to='users_avatars', blank=True)

    def __str__(self):
        return f'{self.first_name}'


class Images(models.Model):
    file = models.FileField(upload_to='comentImages/%Y/%m/%d/')
    comment_id = models.ForeignKey("Comments", on_delete=models.CASCADE, null=True)


class Comments(models.Model):
    author = models.ForeignKey(MyUser, on_delete=models.PROTECT)
    text = models.CharField(max_length=255)
    task_id = models.ForeignKey("Bids", on_delete=models.CASCADE, null=True)
    time_create = models.DateTimeField(auto_now_add=True, null=True)

class Bids(models.Model):
    author = models.ForeignKey(MyUser, on_delete=models.PROTECT, null=True, blank=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=12)
    user_id = models.ForeignKey(MyUser, on_delete=models.PROTECT, related_name='worker', null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_finish = models.DateTimeField(auto_now=False, auto_now_add=False)
    done = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}, id: {self.pk}'


class Bids2(models.Model):
    author = models.ForeignKey(MyUser, on_delete=models.PROTECT, null=True, blank=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=12)
    user_id = models.CharField(max_length=100, blank=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_finish = models.DateTimeField(auto_now=False, auto_now_add=False)
    done = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}, id: {self.pk}'
