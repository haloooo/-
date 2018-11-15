# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018
from __future__ import unicode_literals

import json

from django.shortcuts import render

from RtMonSys.models import model_employee
from RtMonSys.models.models_logger import Logger
from django.http import HttpResponse

def go_config(request):
    Logger.write_log("进入basic页面")
    return render(request, 'base/config/index.html')


def go_employee(request):
    Logger.write_log("进入员工管理页面")
    return render(request, 'base/basic/employee.html')


def add(request):
    Logger.write_log("添加员工信息")
    result =  model_employee.add()
    jsonstr = json.dumps(result)
    return HttpResponse(jsonstr)





    return render(request, 'base/basic/employee.html')