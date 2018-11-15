from django.shortcuts import render
from django.http import JsonResponse
# from libs import tool
import logging
import json
from libs.sql import query
def getVendorList():
    sql = '''SELECT vendor_cd,vendor_text_en,vendor_text_cn FROM m_vendor'''
    result = query(sql)
    print(result)
    return result