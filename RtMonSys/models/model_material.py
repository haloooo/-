# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/9/2018

from libs.sql import query, insert_update
from time import time


def add(params):
    try:
        sql = 'INSERT INTO m_apn(apn_cd,apn_text_en,apn_text_cn,status_id,user_id,update_at)' \
              ' VALUES (%s,%s,%s,%s,%s,%s)',\
              [str(params['apn_cd']),str(params['apn_text_en']),str(params['apn_text_cn']),'0','admin',time.time()]
        print(sql)
        result = query(sql)
    except:
        print("%%%%%%%%%%%%%%%")
        result = 0
    return result

def materialisExist(apn_cd):
    try:
        sql = 'SELECT apn_cd FROM m_apn WHERE apn_cd = '+ "\'"+str(apn_cd) +"\'"
        result = query(sql)
    except:
        result = 1
    return result

def get_materail_list(condition, pageSize, start):
    """
    获取原料数据
    :return:
    """
    if(condition == ''):
        sql = 'SELECT apn_cd,apn_text_en,apn_text_cn,status_id,user_id,update_at FROM m_apn  LIMIT ' + str(pageSize) + ' OFFSET ' + str(start)
    else:
        sql = 'SELECT apn_cd,apn_text_en,apn_text_cn,status_id,user_id,update_at FROM m_apn WHERE apn_cd ~*'+ "\'"+str(condition) +"\'"+ ' LIMIT '+ str(pageSize) + ' OFFSET '  + str(start)
    result = query(sql)
    return result

def get_materail_length(params):
    """
    获取原料的全部数据数量
    :return:
    """
    if(params!=""):
        sql = 'SELECT apn_cd,apn_text_en,apn_text_cn,status_id,user_id,update_at FROM m_apn WHERE apn_cd ~*'+ "\'"+str(params) +"\'"
    else:
        sql = 'SELECT apn_cd,apn_text_en,apn_text_cn,status_id,user_id,update_at FROM m_apn'
    result = query(sql)
    return len(result)

def del_material(params):
    try:
        sql = 'DELETE FROM m_apn WHERE apn_cd = '+ "\'"+str(params) +"\'"
        result = insert_update(sql)
    except:
        result = 0
    return result


