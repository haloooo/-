# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/12/2018
from __future__ import unicode_literals
from django.shortcuts import render
from RtMonSys.models.models_logger import Logger
from django.http import HttpResponse

def index(request):
    Logger.write_log("进入config管理首页")
    return render(request, 'base/config_mgr/index.html')