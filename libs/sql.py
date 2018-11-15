# -*- coding: utf-8 -*-
from django.db import connection, transaction

def query(sql, params=None):
    """
    执行sql语句  并返回一个数组对象
    :param sql:
    :param params:
    :return:
    """
    connection.connect()
    cursor = connection.cursor()
    try:
        cursor.execute(sql, params)
        rawData = cursor.fetchall()
        col_names = [desc[0] for desc in cursor.description]

        result = []
        for row in rawData:
            objDict = {}
            for index, value in enumerate(row):
                objDict[col_names[index]] = value
            result.append(objDict)
    finally:
        cursor.close()
        connection.close()
    return result

def query_one(sql, params=None):
    """
    执行sql语句  并返回一个对象
    :param sql:
    :param params:
    :return:
    """
    connection.connect()
    cursor = connection.cursor()
    cursor.execute(sql, params)
    rawData = cursor.fetchone()
    col_names = [desc[0] for desc in cursor.description]

    objDict = {}
    for index, value in enumerate(rawData):
        objDict[col_names[index]] = value
    cursor.close()
    connection.close()
    return objDict

def execute(sql, params=None):
    """
    执行sql语句  并返回一个对象
    :param sql:
    :param params:
    :return:
    """
    connection.connect()
    cursor = connection.cursor()
    cursor.execute(sql, params)
    rawData = cursor.fetchall()
    cursor.close()
    connection.close()
    return rawData

def insert_update(sql, params=None):
    connection.connect()
    cursor = connection.cursor()
    cursor.execute(sql, params)
    cursor.close()
    connection.close()


