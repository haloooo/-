# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018
from django.db import connections

def add(model_name):
    try:
        cur = connections[model_name].cursor()
        sql = ""
        cur.execute(sql)
    except:
        pass




    print('ddd')




    return {"status": 'ok'}

