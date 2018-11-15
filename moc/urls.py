"""sf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.views.generic.base import RedirectView
from RtMonSys.views import view_store_in, view_store_out,view_material
from RtMonSys.views import view_config, view_store_in, view_vendor
from RtMonSys.views import view_config, view_store_in
from RtMonSys.views import view_store_in, view_store_out, view_employee
urlpatterns = [
    # favicon
    url(r'^favicon.ico$',RedirectView.as_view(url=r'static/resource/images/favicon.ico')),

    # config
    url(r'^$',  view_config.go_config),

    # vendor

    url(r'^getVendorList',  view_vendor.getVendorList),
    url(r'^go_vendor',  view_vendor.go_vendor),

    # 入库
    url(r'^go_store_in',  view_store_in.go_store_in),
    url(r'^update_store_in',view_store_in.update_store_in),

    # 出库
    url(r'^go_store_out', view_store_out.go_store_out),
    url(r'^search_config',view_store_out.search_config),


    # 员工
    url(r'^employee_index', view_employee.go_config),
    url(r'^employee/getList', view_employee.getList),
    url(r'^employee/add', view_employee.add),
    url(r'^go_store_out', view_store_out.go_store_out),

    # 原料 material
    url(r'^go_material', view_material.go_material),  # 进入原料页面
    url(r'^get_material_list', view_material.get_material_list),  # 获取原料数据
    url(r'^add_material', view_material.add_material),  # 根据apn_cd删除原料数据
    url(r'^delete_material', view_material.delete_material)  # 根据apn_cd删除原料数据
]
