import requests
from io import BytesIO
import shutil

# 'http://127.0.0.1:8000/add'
# cookies = {'csrftoken': '6cwJ797uvriTBqSPhcxrCd6P8v4MCSlsoG0er7VOsnCKFTMxGkrXieKTWVMjg8ml', 'sessionid': '51g0soeewmx5bq5a4vqdxq3x6tifgg8q'}
# r = requests.get('http://127.0.0.1:8000/admin/index/bids/add/', cookies=cookies)
# print(r.text)
# t = r.text.split('csrfmiddlewaretoken')
# t = t[1].split('"')
# print(t[2])
#
# token = t[2]
#
#
# headers = {'X-CSRFToken': token}
#
# payload = {
#     "csrfmiddlewaretoken": token,
#     "name": 'Для Теста',
#     "description": 'Описание',
#     "status": "В работе",
#     "user_id": '1',
#     "time_finish_0": "05.11.2022",
#     "time_finish_1": "16:37:37",
#     "file_tabs": None,
#     "_save": "Сохранить"
# }
# r = requests.post('http://127.0.0.1:8000/add/', cookies=cookies, headers=headers, json=payload)
# print(r.text)
# print(r)


with open('tabl.xlsx', 'rb') as file:
    url = 'http://127.0.0.1:8000/api/uploadfile/'
    files = {'file': file}
    headers = {"Content-Disposition": "attachment; filename=dog.jpg"}
    # передаем созданный словарь аргументу `files`
    resp = requests.post(url, headers=headers, files=files, )
    file.close()
    print(resp.text)

# # целевой URL-адрес
# url = 'http://127.0.0.1:8000/api/uploadfile/'
# # открываем файл на чтение в
# # бинарном режиме ('rb')
# fp = open('tabl.xlsx', 'rb', encoding="utf8")
# print(type(fp))
# # bi = fp.read()
# #
# # for chunk in bi:
# #     print(type(chunk))
# # помещаем объект файла в словарь
# # в качестве значения с ключом 'file'
# files = {'file': fp}
# headers = {"Content-Disposition": "attachment; filename=tabl.xlsx"}
# # передаем созданный словарь аргументу `files`
# resp = requests.post(url, headers=headers, files=files,)
# fp.close()
# print(resp.text)
#
