import router, {constantRoutes} from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

let flag = false;

router.beforeEach(async (to, from, next) => {
    // set page title
    document.title = getPageTitle(to.meta.title)

    const menus = sessionStorage.getItem('menus');
    const appToken = location.href.split("tokenId=")[1];
    // const tokenId = sessionStorage.getItem("tokenId");
    // determine whether the user has logged in
    console.log(appToken, to.path, flag)
    if (appToken && to.path === '/home/index' && !flag) {
        console.log(appToken, to.path, flag)
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        const {userMenuList} = await store.dispatch('user/login', appToken)
        flag = true

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes', userMenuList)
        // localStorage.setItem('menudata', JSON.stringify(constantRoutes.concat(accessRoutes)));

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
    } else {
        // router.options.routes = JSON.parse(localStorage.getItem("menudata"));
        next()
    }
});
