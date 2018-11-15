# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/12/2018
from libs.sql import query, execute, insert_update

def search_config(searchData, start, end):
    sql_num = "SELECT name,usage,chinese_name,apn,rev,vendor,qty,config,remark FROM m_config_mgr_copy WHERE config_name = '%s'" % (searchData['config_name'],)
    result = query(sql_num)
    totalDataNumber = result.__len__()
    sql_result = sql_num + "	LIMIT " + str(end) + " OFFSET " + str(start)
    results = query(sql_result)
    return totalDataNumber, results







