var app = new Vue({
    el: '#app',
    data() {
        return {

            //主数据
            mainTableData: [],
            page: FDConf.page,
            // 搜索
            searchData: {
                "store_out_type": "",
                "config_name": "",
                "qr_code":""
            },
            //入库类型
            options: [{
                value: '原料出库',
                label: '原料出库'
            }]
        }
    },
    methods: {
        doSearch(){
            if(app.searchData.store_out_type == ""){
                app.$message({
                    showClose: true,
                    message: '请选择出库类型',
                    type: 'error'
                });
                return
            }
            if(app.searchData.config_name == ""){
                app.$message({
                    showClose: true,
                    message: '请输入Config',
                    type: 'error'
                });
                return
            }

            // 查询config
            let url = '/search_config/';
            let params = {
                'searchData':app.searchData,
                "currentPage": this.page["currentPage"],
                "pageSize": this.page["pageSize"]
                // 'mainTableData':mainTableData
            };
            const loading = this.$loading();
            AJAX._post(url, params)
                .then(res => {
                    app.mainTableData = res['data'];
                    app.page.totalDataNumber = res['totalDataNumber'];
                    loading.close();
                })
                .catch(res => {
                    app.$message.error('获取数据出错了, 请重试！');
                    loading.close();
                    // // 清空数据
                    // app.searchData.code = "";
                    // app.searchData.store_in_type = "";
                    // app.searchData.shelves = "";
                    // app.searchData.qr_code = "";
                    // app.mainTableData = [];
                })

        },

        handleSizeChange(val) {
            app.page['pageSize'] = val;
            app.doSearch();
        },

        handleCurrentChange(val) {
            app.currentPage = val;
            app.doSearch();
        },

        onload(){
            window.onload = function(e){
                var code = "";
                var lastTime,nextTime;
                var lastCode,nextCode;

                document.onkeypress = function(e) {
                    nextCode = e.which;
                    nextTime = new Date().getTime();

                    if(lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
                        code += String.fromCharCode(lastCode);
                    } else if(lastCode != null && lastTime != null && nextTime - lastTime > 100){
                        code = "";
                    }
                    lastCode = nextCode;
                    lastTime = nextTime;
                };
                this.onkeypress = function(e){
                    if(e.which == 13){
                        console.log(code);
                        app.searchData.qr_code = code;
                        code = "";
                    }
                }
            };
        },

    },
    mounted(){
        this.onload();
    },
});

