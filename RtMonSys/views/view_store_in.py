# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018

from django.shortcuts import render
from RtMonSys.models import model_store_in
from RtMonSys.models.models_logger import Logger
from django.http import HttpResponse, JsonResponse
import json

def go_store_in(request):
    """
    进入入库页面
    :param request:
    :return:
    """
    Logger.write_log("进入入库页面")
    # model_store_in.testConnecion()
    return render(request, 'base/store/store_in/index.html')

def update_store_in(request):
    """
    进行入库操作
    :param request:
    :return:
    """
    Logger.write_log("进行入库操作")
    # 解析参数
    params = json.loads(request.body.decode('utf-8'))
    searchData = params['searchData']
    mainTableData = params['mainTableData']
    result = model_store_in.update_store(searchData, mainTableData)
    return JsonResponse(result)







