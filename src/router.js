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


// #region 仓储管理
const EnterStorageDetail = () => import('@/views/warehouseManage/enterStorageDetail/index')
const EnterStorageRegister = () => import('@/views/warehouseManage/enterStorageDetail/enterStorageRegister.vue')


const WaitCheckEnter = () => import('@/views/warehouseManage/waitCheckEnter/index')
const WaitCheckOuter = () => import('@/views/warehouseManage/waitCheckOuter/index')
const OuterStorageDetail = () => import('@/views/warehouseManage/outerStorageDetail/index')
const PledgeDetail = () => import('@/views/warehouseManage/pledgeDetail/index')
const ReleasePledgeDetail = () => import('@/views/warehouseManage/releasePledgeDetail/index')
const TransferOwnershipDetail = () => import('@/views/warehouseManage/transferOwnershipDetail/index')
const TransferOwnershipManage = () => import('@/views/warehouseManage/transferOwnershipDetail/transferOwnershipManage')

const InventoryTable = () => import('@/views/warehouseManage/inventoryManage/inventoryTable.vue')
// #endregion 仓储管理
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
        },  

        // #region  仓储信息      
        {
            path: '/web/settlement/pageList/enterStorageDetail',
            name: 'enterStorageDetail',
            component: EnterStorageDetail
        }, 
        {
            path: '/web/settlement/pageList/enterStorageDetail/register',
            name: 'enterStorageRegister',
            component: EnterStorageRegister
        },        
        {
            path: '/web/settlement/pageList/inventoryTable',
            name: 'inventoryTable',
            component: InventoryTable
        },

        {
            path: '/web/settlement/pageList/waitCheckEnter',
            name: 'waitCheckEnter',
            component: WaitCheckEnter
        },  
        {
            path: '/web/settlement/pageList/waitCheckOuter',
            name: 'waitCheckOuter',
            component: WaitCheckOuter
        },  
        {
            path: '/web/settlement/pageList/outerStorageDetail',
            name: 'outerStorageDetail',
            component: OuterStorageDetail
        },  
        {
            path: '/web/settlement/pageList/pledgeDetail',
            name: 'pledgeDetail',
            component: PledgeDetail
        },  
        {
            path: '/web/settlement/pageList/releasePledgeDetail',
            name: 'releasePledgeDetail',
            component: ReleasePledgeDetail
        },  
        {
            path: '/web/settlement/pageList/transferOwnershipDetail',
            name: 'transferOwnershipDetail',
            component: TransferOwnershipDetail
        },
        {
            path: '/web/settlement/pageList/transferOwnershipManage',
            name: 'transferOwnershipManage',
            component: TransferOwnershipManage
        }
        // #endregion           
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
