from django.contrib import admin
from .models import *
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

admin.site.register(MyUser, UserAdmin)

# admin.site.register(MyUser)
admin.site.register(Bids)
admin.site.register(Images)
admin.site.register(Comments)

# Register your models here.
