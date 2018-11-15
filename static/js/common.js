// 配置参数
const FDConf = {
    page: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 50, 100, 500],
        totalDataNumber: 0, //数据的总数,
    }
};


// 异步请求封装
const AJAX = {
    _get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    resolve(res.data)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },
    _post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(res => {
                    resolve(res.data)
                })
                .catch(res => {
                    reject(res)
                })
        })
    }
};




















