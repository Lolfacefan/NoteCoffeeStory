from django import forms
from django.core.exceptions import ValidationError
from django.forms import TextInput, ModelForm, CheckboxInput, Select
from .models import *
from .models import Bids


class EditForm(forms.ModelForm):
    class Meta:
        model = Bids
        # fields = '__all__'
        fields = ['name', 'description', 'status', 'user_id', "time_finish"]

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)

class BidsEditForm(ModelForm):
    class Meta:
        model = Bids
        # fields = '__all__'
        fields = ['name', 'description', 'status', 'user_id', "time_finish"]
        # fields = ['name', 'link', 'is_to_city', 'count_lists']
#
#
# class AddPostForm(forms.Form):
#     file_tabs = models.FileField(upload_to='tabs/%Y/%m/%d/', blank=True)
#     is_able = models.BooleanField(default=False, blank=True)
#
#
# class AddBidForm(ModelForm):
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields['count_lists'].empty_label = 'Кол-во страниц для сбора'
#
#     class Meta:
#         model = Bids
#         fields = ['name', 'link', 'is_to_city', 'count_lists']
#         pages = [(0, 'Кол-во страниц для сбора'), (1, 1), (5, 5), (10, 10), (15, 15), (20, 20), (25, 25), (30, 30)]
#         widgets = {
#             "name": TextInput(attrs={
#                 'class': 'form-control'
#             }),
#             "link": TextInput(attrs={
#                 'class': 'form-control'
#             }),
#             "is_to_city": CheckboxInput(attrs={
#                 'class': 'form-check-input',
#                 'checked': 'checked'
#             }),
#             "count_lists": Select(attrs={
#                 'class': 'form-select2 form-select',
#                 'aria-label': 'Пример выбора по умолчанию'
#             }, choices=pages)
#         }
#
#     # Проверка на заполненное поле
#     def clean_count_lists(self):
#         count_lists = self.cleaned_data['count_lists']
#         if int(count_lists) == 0:
#             self.add_error('count_lists', 'Не выбрано кол-во страниц')
#             # raise ValidationError('выаывавыа')
#         return count_lists
#
#     # Проверка на длину названия
#     def clean_name(self):
#         name = self.cleaned_data['name']
#         if len(name) > 13:
#             self.add_error('name', 'Максимум 13 букв')
#         return name
