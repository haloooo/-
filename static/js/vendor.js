var app = new Vue({
    el: '#app',
    data() {
        return {
            //主数据
            // mainTableData: [{
            //     vendor_cd: '2016-05-02',
            //     vendor_text_en: '王小虎',
            //     vendor_text_cn: '上海市普陀区金沙江路 1518 弄'
            // }]
            mainTableData:[],

        }
    },
    methods: {
        // 主数据
        loadData() {
            let url = '/model_vendor/getVendorList/';
            let params = {
                //'condition': this.searchFormData,
                'currentPage': this.page['currentPage'],
                'pageSize': this.page['pageSize']
            };

            const loading = this.$loading();

            AJAX._get(url)

                .then(res => {
                    this.mainTableData = res['data'];
                    //this.page.totalDataNumber = res['totalDataNumber'];
                    loading.close();
                })
                .catch(res => {
                    this.$message.error('获取数据出错了, 请重试！');
                    loading.close();
                })
        },
         mounted(){
            this.loadData()

         }



    }
});



