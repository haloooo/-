var app = new Vue({
    el: '#app',
    data() {
        return {
            //主数据
            mainTableData: [],
            page: FDConf.page,
            // 查询
            searchFormData: {
                apn_cd: '',
            },
            // 添加
            addFormDialogVisible: false,
            addFormData: {
                apn_cd: '',
                apn_text_en: '',
                apn_text_cn: ''
            },
            addOrEditFormDataRules: {
                apn_cd: [{required: true, message: '请输入产品编号', trigger: "blur"}],
                apn_text_en: [{required: true, message: '请输入产品英文名称', trigger: "blur"}],
                apn_text_cn: [{required: true, message: '请输入产品中文名称', trigger: 'blur'}],
            },
            // 编辑
            editIndex: '',
            editFormDialogVisible: false,
            editFormData: {
                apn_cd: '',
                apn_text_en: '',
                apn_text_cn: ''
            },

            // loading
            fullscreenLoading: false
        }
    },
    methods: {
        // 主数据
        // 获取数据
        loadData() {
            let url = '/get_material_list/';
            let params = {
                'condition': this.searchFormData,
                'currentPage': this.page['currentPage'],
                'pageSize': this.page['pageSize']
            };

            const loading = this.$loading();
            AJAX._post(url,params)
                .then(res => {
                    this.mainTableData = res['data'];
                    this.page.totalDataNumber = res['totalDataNumber'];
                    loading.close();
                })
                .catch(res => {
                    this.$message.error('获取数据出错了, 请重试！');
                    loading.close();
                });
        },

        isCenter({row, column, rowIndex, columnIndex}) {
            return 'text-align:center'
        },

        //上一页
        prevClick(){
            this.page.currentPage-=1;
            this.loadData();
        },

        //下一页
        nextClick(){
            this.page.currentPage+=1;
            this.loadData();
        },

        //每页显示数据改变
        handleSizeChange(val){
            this.page['pageSize']= parseInt(val);
            this.page['currentPage']=1
            this.loadData();
        },
        //跳转到第几页
        handleCurrentChange(val){
             this.page['currentPage']=parseInt(val)
            this.loadData();
        },

        //查询
        doSearch(){
            this.loadData();
        },

        doAdd(formName){
            this.$refs[formName].validate((valid) => {
                // 验证数据
                if (!valid) {
                    return false;
                }
                // 请求后端
                let url = '/add_material/';
                let params = this.addFormData;
                this.fullscreenLoading = true;
                AJAX._post(url, params)
                    .then(res => {
                        if (!res["status"]) {
                            this.$message.error(res["msg"]);
                        } else {
                            this.addFormDialogVisible = false;
                            this.restDialog('addForm');
                            this.$message({message: '添加成功', type: 'success'});
                            this.fullscreenLoading = false;
                            this.loadData();
                        }
                        this.fullscreenLoading = false;
                    })
                    .catch(res => {
                        this.$message.error('添加失败，请重试！');
                        this.fullscreenLoading = false;
                    })
            })
        },

        // 编辑
        showEdit(index, row) {
            this.editIndex = index;
            this.editFormData = row;
            this.editFormDialogVisible = true;
        },
        doEdit(formName) {
            /*this.$refs[formName].validate((valid) => {
                // 验证数据
                if (!valid) {
                    return false;
                }
                // 请求后端
                let url = '/vendor/edit/';
                let params = this.editFormData;
                this.fullscreenLoading = true;
                AJAX._post(url, params)
                    .then(res => {
                        if (!res["status"]) {
                            this.$message.error(res["msg"]);
                        } else {
                            this.editFormDialogVisible = false;
                            this.$message({message: '编辑成功', type: 'success'});
                            this.fullscreenLoading = false;
                            this.loadData();
                        }
                        this.fullscreenLoading = false;
                    })
                    .catch(res => {
                        this.$message.error('编辑失败，请重试！');
                        this.fullscreenLoading = false;
                    })
            })*/
        },

        // 删除
        doDelete(index, rows, selectRow) {
            this.$confirm('此操作将会删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true;
                let url = '/delete_material/';
                let params = {
                    'condition': selectRow['apn_cd'],
                };
                // 请求删除
                const loading = this.$loading();
                AJAX._post(url,params)
                    .then(res => {
                        if(res.msg == "删除成功"){
                            this.$message({type: 'info', message: '删除成功'});
                        }else {
                            this.$message({type: 'info', message: '删除失败'});
                        }
                        this.loadData();
                        loading.close()
                    })
                    .catch(res => {
                        this.$message.error('获取数据出错了, 请重试！');
                        loading.close();
                    });
            }).catch(() => {
                this.$message({type: 'info', message: '已取消删除'});
            });
        },

    },

    mounted() {
        this.loadData();
    }
});