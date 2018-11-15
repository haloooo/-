var app = new Vue({

    el: '#app',
    data() {
        return {

            //主数据
            mainTableData: [],
            // 搜索
            searchData: {
                "code": "1",
                "store_in_type": "2",
                "shelves": "3",
                "qr_code": "4"
            },

            searchData1: {
                "code": "Config_L01",
                "store_in_type": "461",
                "shelves": "",
                "qr_code": ""
            },

            tableData: [{
              rowNum: 1,
              name: '',
              usage: '',
              chinese_name: '',
              apn: '',
              rev: '',
              vendor: '',
              qty: '',
              config: '',
              remark: ''
            }]
        }
    },
    methods: {
        changeDic(list, dic) {
            for (var i = 0; i < list.length; i++) {
                dic[list[i]['id']] = (list[i]);
            }
        },

        query_plan(){
            document.getElementById("div1").style.display = "block";
            document.getElementById("div2").style.display = "none";
        },

        create_plan(){
            document.getElementById("div2").style.display = "block";
            document.getElementById("div1").style.display = "none";
        },

        // 增加行
        addRow() {
            var list = {
              rowNum: '',
              name: '',
              usage: '',
              chinese_name: '',
              apn: '',
              rev: '',
              vendor: '',
              qty: '',
              config: '',
              remark: ''}
            this.tableData.unshift(list)
        },

        delData () {
            for (let i = 0; i < this.selectlistRow.length; i++) {
              let val = this.selectlistRow
              // 获取选中行的索引的方法
              // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
              // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
              val.forEach((val, index) => {
                this.tableData.forEach((v, i) => {
                  if (val.rowNum === v.rowNum) {
                    // i 为选中的索引
                    this.tableData.splice(i, 1)
                  }
                })
              })
            }
            // 删除完数据之后清除勾选框
            this.$refs.tableData.clearSelection()
          }

    },
});