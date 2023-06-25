import axios from "axios";

import { Toast, Dialog } from "vant";

const request = axios.create({
  // baseURL: '/api',
  baseURL: "https://www.minjisd.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
let loading;

function startLoading() {
  loading = Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
}

function endLoading() {
  loading.clear();
}

// 添加请求拦截器
request.interceptors.request.use(config => {
    startLoading()
    // 可以在这里进行token认证,每次请求都带上token
    // config.headers.Authorization='xxxx'
    config.headers.authorization = !localStorage.getItem('token') ? '' : 'bearer ' + localStorage.getItem('token')
    // config.headers.authorization='bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy5taW5qaXNkLmNvbS93ZWNoYXQvd3hiYWNrIiwiaWF0IjoxNjcyMTQ1NTUxLCJleHAiOjE2NzIxNDkxNTEsIm5iZiI6MTY3MjE0NTU1MSwianRpIjoibkpHaXVXNzRtd2c0M3lpSSIsInN1YiI6NCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImd1YXJkIjoiYXBpIn0.vg7pKWCEIzrreqYsAvXrStjtBWWmeMXFRUxj0M68WzI'
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
}, error => {
    // return Promise.reject(error)
    return error
});

//响应拦截器
request.interceptors.response.use(response => {
    endLoading();
    if(response.data.code !== 200){
      Dialog.alert({
        title: "错误",
        message: response.data.message,
      });
    }
    return response
}, error => {
    if (error.response.status == 401 || error.response.status == 500) {
        localStorage.removeItem('token')
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13ab299182632eee&redirect_uri=https://www.minjisd.com/wechat/wxback&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
    }
    endLoading();
    return error.response

})

export default request;
