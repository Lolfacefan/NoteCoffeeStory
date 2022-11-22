import datetime
from rest_framework import serializers
# from .models import Bids
# from .models import FileSave
#
#
# class FileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FileSave
#         fields = ('file',)

class UserSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    first_name = serializers.CharField()


class CommentsSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    # author = serializers.CharField()
    text = serializers.CharField()
    time_create = serializers.DateTimeField()
    author = UserSerializer(required=False)


class MyUserSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    first_name = serializers.CharField()



class BidsSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    status = serializers.CharField()
    user_id = serializers.CharField()
    time_finish = serializers.DateTimeField()
    done = serializers.BooleanField()



# def create(self, validated_data):
#     return Bids.objects.create(**validated_data)
#
# def update(self, instance, validated_data):
#     instance.name = validated_data.get('name', instance.name)
#     instance.link = validated_data.get('link', instance.link)
#     instance.is_to_city = validated_data.get('is_to_city', instance.is_to_city)
#     instance.count_lists = validated_data.get('count_lists', instance.count_lists)
#     instance.save()
#     return instance
