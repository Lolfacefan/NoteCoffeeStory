from django.urls import path
from django.urls import include
from .views import index, EditTask, UploadFile, addComment, deleteComment, loginUp
from .views import TaskPost, TaskPostDone
from .views import addTask
from .views import task_update


app_name = 'mainapp'

urlpatterns = [
    path('', index, name='index2'),
    path('login', loginUp, name='i'),
    path('add/', addTask, name='add'),
    path('api/tasks/', TaskPost.as_view(), name='work2'),
    path('api/tasks/done/<int:pk>/<int:pkEnd>/', TaskPostDone.as_view(), name='done'),
    path('task/<int:pk>/', task_update, name='viewTask'),
    path('api/task/<int:pk>/', EditTask.as_view(), name='apiTask'),
    path('api/uploadfile/', UploadFile.as_view(), name='apiTask'),
    path('api/comments/<int:pk>/', addComment.as_view(), name='apiTask'),
    path('api/commentdelete/<int:pk>/', deleteComment.as_view(), name='apiTask'),

]

