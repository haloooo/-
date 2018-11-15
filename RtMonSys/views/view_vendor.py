# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018

from django.shortcuts import render
from RtMonSys.models import model_store_in, model_vendor
from RtMonSys.models.models_logger import Logger
from django.http import HttpResponse
from django.http import JsonResponse


def getVendorList(request):
    Logger.write_log("获取vendor数据")
    result =  model_vendor.getVendorList()
    totalDataNumber = len(result)
    return JsonResponse({"totalDataNumber": totalDataNumber, "data": result})

def  go_vendor(request):
    Logger.write_log("进入vendor页面")
    return render(request, 'base/vendor/index.html')