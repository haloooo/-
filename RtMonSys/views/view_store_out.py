# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018

from django.shortcuts import render
from RtMonSys.models import model_store_out
from RtMonSys.models.models_logger import Logger
from django.http import HttpResponse, JsonResponse
import json

def go_store_out(request):
    """
    进入出库页面
    :param request:
    :return:
    """
    Logger.write_log("进入出库页面")
    return render(request, 'base/store/store_out/index.html')

def search_config(request):
    """
    查询config
    :param request:
    :return:
    """
    Logger.write_log("查询config")
    # 解析参数
    params = json.loads(request.body.decode('utf-8'))
    searchData = params['searchData']
    # 构建分页数据start与end
    currentPage = params['currentPage']
    pageSize = params['pageSize']
    start = (currentPage - 1) * pageSize
    end = currentPage * pageSize
    totalDataNumber, results = model_store_out.search_config(searchData, start, end)
    return JsonResponse({"totalDataNumber": totalDataNumber, "data": results})





