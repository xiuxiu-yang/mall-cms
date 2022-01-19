import axios from 'axios'

//axios 实例()

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })

// axios
//   .post('http://httpbin.org/post', {
//     name: 'why',
//     age: 18
//   })
//   .then((res) => {
//     console.log(res)
//   })

axios.defaults.baseURL = 'http://httpbin.org/'
axios.defaults.timeout = 10000

// axios
//   .get('/get', {
//     timeout: 1000
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('/post', {
//     name: 'why',
//     age: 18
//   })
//   .then((res) => {
//     console.log(res)
//   })

// 多个查询,一起返回
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'why',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'coder',
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })

// axios的拦截器
// fn1: 请求发生成功时执行的函数
// fn2: 请求发生失败时执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1. 给请求添加 token
    // 2. isloading 动画
    console.log('请求发送成功')
    return config
  },
  (err) => {
    console.log('请求发送失败')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('请求成功拦截')
    return res
  },
  (err) => {
    console.log('请求失败拦截')
    return err
  }
)
