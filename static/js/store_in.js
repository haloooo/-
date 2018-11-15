var app = new Vue({
    el: '#app',
    data() {
        return {

            //主数据
            mainTableData: [],

            // 搜索
            searchData: {
                "code": "",
                "store_in_type": "",
                "shelves": "",
                "qr_code": ""
            },

            // //rules
            //  FormDataRules: {
            //     code: [{required: true, message: '请输入供应商名称', trigger: 'blur'}],
            //     store_in_type: [{required: true, message: '请选择结款方式'}],
            //     shelves: [{required: true, message: '请输入联系人', trigger: 'blur'}],
            //     qr_code: [{required: true, message: '请输入联系方式', trigger: 'blur'}],
            // },

            //入库类型
            options: [{
                value: '原料入库',
                label: '原料入库'
            }]
        }
    },
    methods: {
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
                        if(app.searchData['code'] == ""){
                            app.$message({
                                showClose: true,
                                message: '请输入入库单号',
                                type: 'error'
                            });
                            return
                        }
                        if(app.searchData['store_in_type'] == ""){
                            app.$message({
                                showClose: true,
                                message: '请选择入库类型',
                                type: 'error'
                            });
                            return
                        }
                        console.log(code);
                        app.checkCode(code);
                        code = "";
                    }
                }
            };
        },

        checkCode(code){
            if(code.length < 100){
                app.searchData.shelves = code;
            }else{
                if(app.searchData.shelves == ""){
                    app.$message({
                        showClose: true,
                        message: '请先扫描货架',
                        type: 'error'
                    });
                    return
                }
                app.searchData.qr_code = code;
                app.analysisCode(code);

            }
        },

        analysisCode(code){
            let code_list = code.split('\\');
            let bp_n = code_list[4];
            let carton_id = code_list[0];
            let vendor_code = code_list[1];
            let vendor_name = code_list[2];
            let vendor_p_n = code_list[3];
            let apn = code_list[4];
            let rev = code_list[5];
            let config = code_list[6];
            let bin = code_list[7];
            let build = code_list[8];
            let desc = code_list[9];
            let lot_no = code_list[10];
            let po_no = code_list[11];
            let qty = code_list[12];
            let info = code_list[13];
            app.mainTableData = [{
                bp_n:bp_n,
                carton_id:carton_id,
                vendor_code:vendor_code,
                vendor_name:vendor_name,
                vendor_p_n:vendor_p_n,
                apn:apn,
                rev:rev,
                config:config,
                bin:bin,
                build:build,
                desc:desc,
                lot_no:lot_no,
                po_no:po_no,
                qty:qty,
                info:info
            }];
            app.store_in(app.searchData, app.mainTableData);
            console.log(code_list);
        },
        store_in(searchData, mainTableData){
            let url = '/update_store_in/';
            let params = {
                'searchData':searchData,
                'mainTableData':mainTableData
            };
            AJAX._post(url, params)
                .then(res => {
                    if (!res["status"]) {
                        alert(res["msg"]);
                        // 清空数据
                        // app.searchData.code = "";
                        // app.searchData.store_in_type = "";
                        // app.searchData.shelves = "";
                        // app.searchData.qr_code = "";
                        // app.mainTableData = [];
                    } else {
                        this.$message.success(res["msg"]);
                        // 清空数据
                        app.searchData.code = "";
                        app.searchData.store_in_type = "";
                        app.searchData.shelves = "";
                        app.searchData.qr_code = "";
                        app.mainTableData = [];
                    }
                })
                .catch(res => {
                    alert('入库失败，请重试！');
                    // // 清空数据
                    // app.searchData.code = "";
                    // app.searchData.store_in_type = "";
                    // app.searchData.shelves = "";
                    // app.searchData.qr_code = "";
                    // app.mainTableData = [];
                })
        }
    },
    mounted(){
        this.onload();
    },
});




