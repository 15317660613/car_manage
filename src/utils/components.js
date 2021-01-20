import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import Login from '@/views/login/login'
import Home from '@/views/home/home'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/',
        redirect: '/login/login'
    },
    {
        path: '/login/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/Home',
        component: Layout,
        children: [
            {
                path: 'Home',
                component: () => import('@/views/home/home.vue'),
                name: 'Home',
                meta: {title: '首页', icon: 'component'}
            }
        ]
    },
    {
        path: '/Advertising',
        component: Layout,
        children: [
            {
                path: 'Advertising',
                component: () => import('@/views/Advertising/Advertising.vue'),
                name: 'Personal',
                meta: {title: '广告投放', icon: 'dashboard'}
            }
        ]
    },
    {
        path: '/system',
        meta: {title: '系统管理', icon: 'system'},
        component: Layout,
        children: [
            {
                path: 'user',
                component: () => import('@/views/system/user/user.vue'),
                name: 'User',
                meta: {title: '用户管理', icon: 'feature'},
            },
            {
                path: 'role',
                component: () => import('@/views/system/role/role.vue'),
                name: 'Role',
                meta: {title: '角色管理', icon: 'people'}
            },
        ]
    },
    {
        path: '/industryOverview',
        meta: {title: '行业速览', icon: 'chart'},
        component: Layout,
        children: [
            {
                path: 'share',
                component: () => import('@/views/industryOverview/share/share.vue'),
                name: 'Share',
                meta: {title: '专题分享', icon: 'feature'}
            },
            {
                path: 'track',
                component: () => import('@/views/industryOverview/track/track.vue'),
                name: 'Track',
                meta: {title: '热点跟踪', icon: 'reputation'}
            },
            {
                path: 'unscramble',
                component: () => import('@/views/industryOverview/unscramble/unscramble.vue'),
                name: 'Unscramble',
                meta: {title: '数据解读', icon: 'tree'}
            },
            {
                path: 'pendingApproval',
                component: () => import('@/views/industryOverview/pendingApproval/pendingApproval.vue'),
                name: 'PendingApproval',
                meta: {title: '待审批', icon: 'feature'}
            },
        ]
    },
    {
        path: '/exchangeExperts',
        meta: {title: '专家交流', icon: 'attention'},
        component: Layout,
        children: [
            {
                path: 'train',
                component: () => import('@/views/exchangeExperts/train/train.vue'),
                name: 'Train',
                meta: {title: '课程培训', icon: 'tree-table'}
            },
            {
                path: 'questionnaire',
                component: () => import('@/views/exchangeExperts/questionnaire/questionnaire.vue'),
                name: 'Questionnaire',
                meta: {title: '调查问卷', icon: 'clipboard'}
            },
            {
                path: 'feedback',
                component: () => import('@/views/exchangeExperts/feedback/feedback.vue'),
                name: 'Feedback',
                meta: {title: '用户反馈', icon: 'edit'}
            },
            {
                path: 'pendingApproval',
                component: () => import('@/views/exchangeExperts/pendingApproval/pendingApproval.vue'),
                name: 'PendingApproval',
                meta: {title: '待审批', icon: 'feature'}
            },
        ]
    }
]

const router = new VueRouter({
    routes: constantRoutes
})

export default router
