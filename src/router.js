import Vue from 'vue'
import Router from 'vue-router'
const CommodityManage = () => import('@/views/basicManage/commodityManage/index')
const MaterialManage = () => import('@/views/basicManage/materialManage/index')
const PilePositionManage = () => import('@/views/basicManage/pilePositionManage/index')
const OriginPlaceManage = () => import('@/views/basicManage/originPlaceManage/index')
const ProductNameManage = () => import('@/views/basicManage/productNameManage/index')
const SettlementStorageManage = () => import('@/views/basicManage/settlementStorageManage/index')
const ShipperManage = () => import('@/views/basicManage/shipperManage/index')
const SpecificationManage = () => import('@/views/basicManage/specificationManage/index')

Vue.use(Router)

let globelRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index')
    }
]

let commonRoutes = {
	path:'/main',
	name:'main',
	component:() => import(/* webpackChunkName: "about" */ '@/views/main/main'),
	children:[
        {
            path: '/test',
            name: 'test',
            component: () => import(/* webpackChunkName: "demo" */ '@/views/test/index'),
        },
        {
            path: '/personal',
            name: 'personal',
            component: () => import(/* webpackChunkName: "avatar" */ '@/views/personal/index'),
        },
        {
            path: '/web/settlement/pageList/commodityManage',
            name: 'commodityManage',
            component: CommodityManage
        },
        {
            path: '/web/settlement/pageList/materialManage',
            name: 'materialManage',
            component: MaterialManage
        },
        {
            path: '/web/settlement/pageList/pilePositionManage',
            name: 'pilePositionManage',
            component: PilePositionManage
        },
        {
            path: '/web/settlement/pageList/originPlaceManage',
            name: 'originPlaceManage',
            component: OriginPlaceManage
        },
        {
            path: '/web/settlement/pageList/productNameManage',
            name: 'productNameManage',
            component: ProductNameManage
        },  
        {
            path: '/web/settlement/pageList/settlementStorageManage',
            name: 'settlementStorageManage',
            component: SettlementStorageManage
        },
        {
            path: '/web/settlement/pageList/shipperManage',
            name: 'shipperManage',
            component: ShipperManage
        },
        {
            path: '/web/settlement/pageList/specificationManage',
            name: 'specificationManage',
            component: SpecificationManage
        }                                    

    ]
}

export const router = new Router({
    routes: [
        ...globelRoutes,
        commonRoutes
    ]
})

//留取一份普通路由的name集合
let commonRoutesCluster = commonRoutes.children.map(target => target.name)
let globalRoutesCluster = globelRoutes.map(target => target.name)

router.beforeEach((to, from, next) => {
    if (commonRoutesCluster.includes(to.name) || globalRoutesCluster.includes(to.name)) {
        next()
    } else {
        next({name: 'test'})
    }
})
