import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//首页
const Home = () => import('../pages/home')

const NotFound = () => import('../pages/notFound')

//当然真正应用的路由不会这么简单，vue-router也提供动态路由，嵌套路由等等，详见vue-router文档
const router = new Router({
    mode: 'hash',    //路由的模式
    routes: [
        {
            path: '/',
            component: Home
        },
        
        {
            path: '*',
            component: NotFound
        }
    ]
})

//路由跳转验证
// router.beforeEach((to, from, next) => {
//     store.dispatch("getUserData").then(data=>{
//         if(data){
//             next()
//         }else{
//             console.error("没有用户")
//         }
//     }, ()=>{
//         console.error("查询用户出错")
//     })
// })

export default router