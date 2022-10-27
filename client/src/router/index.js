import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import rootStore from '../store'


const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/project',
        component: () => import('../views/Project.vue'),
        beforeEnter(to, form, next) {
            const store = rootStore()
            if (store.token) {
                next()
            }else {
                next('/login')
            }
        }
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
