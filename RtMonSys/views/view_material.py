# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018

from django.shortcuts import render
from RtMonSys.models import model_store_in
from RtMonSys.models.models_logger import Logger
from RtMonSys.models.model_material import *
from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
import json


def go_material(request):
    Logger.write_log("进入原料页面")
    return render(request, 'base/material/index.html')

def get_material_list (request):
    """
        获取原料数据
        :param req:
        :return:
        """
    Logger.write_log("获取原料数据")
    # 解析参数
    params = json.loads(request.body.decode('utf-8'))
    condition = params['condition'] #查询条件
    currentPage = params['currentPage']
    pageSize = params['pageSize']

    # 构建分页数据start
    start = (currentPage - 1) * pageSize

    result = get_materail_list(condition['apn_cd'],pageSize, start)
    totalDataNumber = get_materail_length(condition['apn_cd'])

    return JsonResponse({"totalDataNumber": totalDataNumber, "data": result})

def add_material(request):
    """
    添加原料
    :param request:
    :return:
    """
    Logger.write_log("添加原料数据")
    params = json.loads(request.body.decode('utf-8'))
    # 判定apn_cd否存在相同
    isExist = materialisExist(params["apn_cd"]);
    if isExist == 1:
        return JsonResponse({'status': False, "msg": "已存在该原料"})

    result = add(params)
    if result == 0 :
        return JsonResponse({"status": False, "msg": "添加失败"})

    return JsonResponse({"status": True, "msg": "添加成功"})

def delete_material(request):
    """
    根据apn_cd删除原料数据
    :param request:
    :return:
    """
    # 解析参数
    params = json.loads(request.body.decode('utf-8'))
    condition = params['condition']  # apn_cd
    print(condition)
    result = del_material(condition)
    if(result != 0):
        msg = "删除成功"
    else:
        msg = "删除失败"
    return JsonResponse({"msg": msg})