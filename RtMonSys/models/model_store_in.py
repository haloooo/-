# * coding:utf-8 *
# Author    : Administrator
# Createtime: 11/12/2018
from libs.sql import query, execute, insert_update

def createTable():
    sql = '''CREATE TABLE IF NOT EXISTS store(
            id SERIAL primary key ,
            bp_n varchar(50) NOT NULL,
            carton_id varchar(50) NOT NULL,
            vendor_code varchar(50) NOT NULL,
            vendor_name varchar(50) NOT NULL,
            vendor_p_n varchar(50) NOT NULL,
            apn varchar(50) NOT NULL,
            rev varchar(50) NOT NULL,
            config varchar(50) NOT NULL,
            bin varchar(50) NOT NULL,
            build varchar(50) NOT NULL,
            desc_ varchar(50) NOT NULL,
            lot_no varchar(50) NOT NULL,
            po_no varchar(50) NOT NULL,
            qty varchar(50) NOT NULL,
            info varchar(50) NOT NULL,
            into_time timestamp NOT NULL,
            into_order varchar(50),
            in_order varchar(50),
            shelves varchar(50),
            status varchar(50) 
        )'''
    insert_update(sql)

def update_store(searchData,mainTableData):
    createTable()
    sql = "SELECT count(1) FROM store WHERE bp_n = '%s'" % (mainTableData[0]['bp_n'],)
    rows = execute(sql)
    count = rows[0][0]
    if count == 1:
        sql = "UPDATE store SET in_order = '%s', shelves = '%s'" % (searchData['code'],searchData['shelves'],)
        insert_update(sql)
        return {"status": True, "msg": "入库成功"}
    else:
        return {"status": False, "msg": "请先进库"}







