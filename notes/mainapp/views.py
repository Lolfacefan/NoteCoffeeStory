import random

from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .forms import *
from .serializers import BidsSerializer, MyUserSerializer, CommentsSerializer
from .models import Bids
from .models import MyUser
from .models import Comments
from .models import Images
from django.contrib.auth.models import User


# class FileDetail(generics.RetrieveAPIView):
#     serializer_class = FileSerializer
#
#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         return get_object_or_404(FileSave, pk=item)


class EditTask(APIView):
    def get(self, request, pk):
        edit_task = get_object_or_404(Bids, pk=pk)
        result = MyUser.objects
        serializer = MyUserSerializer(result, many=True)

        data = {
            "name": edit_task.name,
            "description": edit_task.description,
            "status": edit_task.status,
            "user_id": edit_task.user_id.pk,
            "time_finish": edit_task.time_finish,
            "done": edit_task.done,
            "users": serializer.data
        }
        return Response(data)

    def post(self, request, pk):
        edit_task = get_object_or_404(Bids, pk=pk)
        edit_task.author = get_object_or_404(MyUser, pk=request.user.id)
        edit_task.name = request.data.get('name')
        edit_task.description = request.data.get('description')
        edit_task.status = request.data.get('status')
        edit_task.user_id = get_object_or_404(MyUser, pk=request.data.get('user_id'))
        edit_task.time_finish = request.data.get('time_finish')
        if request.data.get('status') == 'done':
            edit_task.done = True
        else:
            edit_task.done = False
        edit_task.save()
        return Response({"success": "Article created successfully"})


def task_update(request, pk):
    user_id = request.user.id
    print(user_id)
    return render(request, 'mainapp/edit.html', {"pk": pk, "user_id": user_id})


def loginUp(request):
    user_id = request.user.id
    if user_id is None:
        return render(request, 'mainapp/index.html')
    else:
        return HttpResponseRedirect(reverse('index:index2'))


def index(request):
    user_id = request.user.id
    img = get_object_or_404(Images, pk=3)
    comment = get_object_or_404(Comments, pk=52)
    comment.images.remove(img)
    print(comment.images.all())

    # user = authenticate(username='admin', password='admin')
    # print(user)
    # print(type(user))
    # login(request, user)


    # if user is not None:
    # # A backend authenticated the credentials
    # else:
    # # No backend authenticated the credentials

    # hash = "%032x" % random.getrandbits(128)
    # # hash = "%032x" % hash
    # send_mail(
    #     'Авторизация вашего email',
    #     f'Ваш хеш {hash}',
    #     'info@fanfile.ru',
    #     ['fedorovich20@yandex.ru'],
    #     fail_silently=False,
    # )

    # result = get_object_or_404(FileSave, comment_id=9)
    # print(f"result: {result}")
    # file = get_object_or_404(FileSave, pk=3)
    # print(f"id comment {file.comment_id}")
    # # tast = get_object_or_404(Bids, pk=file.comment_id)
    # # print(tast)
    # print(type(user_id))
    if user_id is None:
        return HttpResponseRedirect('admin/')
    else:
        return render(request, 'mainapp/index.html')


def addTask(request):
    user_id = request.user.id
    user = get_object_or_404(MyUser, pk=user_id)
    print(user_id)
    if request.method == 'POST':
        form = BidsEditForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.author = user
            form.save()
            # ID Сохраненной задачи
            print(form.pk)
            return HttpResponseRedirect(reverse('index:index2'))

    else:
        form = BidsEditForm()
        return render(request, 'mainapp/addTask.html', {'form': form})


class TaskPost(APIView):

    def get(self, request):
        user_id = request.user.id
        print(user_id)
        result = Bids.objects.filter(done=False).order_by("time_finish")
        serializer = BidsSerializer(result, many=True)
        return Response(serializer.data)


class TaskPostDone(APIView):
    def get(self, request, pk, pkEnd):
        user_id = request.user.id
        result = Bids.objects.filter(done=True).order_by("time_finish")[pk:pkEnd]
        serializer = BidsSerializer(result, many=True)
        return Response(serializer.data)


class UploadFile(APIView):
    def post(self, request):
        # file = get_object_or_404(FileSave, pk=3)
        # data = request.data.get('file')
        # file.file = request.FILES['file']
        # file.save()
        dict = request.FILES.dict()
        for i, file in dict.items():
            images = Images()
            images.file = file
            images.save()
            print(images.pk)
            print(file)

        return Response({"success": "Article created successfully"})


class deleteComment(APIView):
    def get(self, request, pk):
        user_id = request.user.id
        comment = get_object_or_404(Comments, pk=pk)
        if user_id == comment.author.pk:
            comment.delete()
            return Response({"status": "Success"})


class addComment(APIView):
    def get(self, request, pk):
        task = get_object_or_404(Bids, pk=pk)
        result = Comments.objects.filter(task_id=task)
        serializer = CommentsSerializer(result, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        user_id = request.user.id
        user = get_object_or_404(MyUser, pk=user_id)
        task = get_object_or_404(Bids, pk=pk)
        print(request.POST)
        comment = Comments()
        comment.text = request.POST['text']
        comment.author = user
        comment.task_id = task
        comment.save()
        # Подвязываем фотки к комментам
        dict = request.FILES.dict()
        for i, file in dict.items():
            images = Images()
            images.file = file
            images.save()
            comment.images.add(images)
            comment.save()



        return Response({"success": "Article created successfully"})

    # Пример api запроса
    # with open('tabl.xlsx', 'rb') as file:
    #     url = 'http://127.0.0.1:8000/api/uploadfile/'
    #     files = {'file': file}
    #     headers = {"Content-Disposition": "attachment; filename=dog.jpg"}
    #     # передаем созданный словарь аргументу `files`
    #     resp = requests.post(url, headers=headers, files=files, )
    #     file.close()
    #     print(resp.text)
