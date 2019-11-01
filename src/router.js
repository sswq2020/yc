import Vue from 'vue'
import Router from 'vue-router'
const CommodityManage = () => import('@/views/basicManage/commodityManage/index')
const MaterialManage = () => import('@/views/basicManage/materialManage/index')
const PilePositionManage = () => import('@/views/basicManage/pilePositionManage/index')
const OriginPlaceManage = () => import('@/views/basicManage/originPlaceManage/index')
const ProductNameManage = () => import('@/views/basicManage/productNameManage/index')
const SettlementStorageManage = () => import('@/views/basicManage/settlementStorageManage/index')
const SettlementForm = () => import('@/views/basicManage/settlementStorageManage/settlementForm')
const ShipperManage = () => import('@/views/basicManage/shipperManage/index')
const SpecificationManage = () => import('@/views/basicManage/specificationManage/index')

/**油品信息*/
const OilQualityInfo = () => import('@/views/basicManage/oilQualityInfo/index')
/**油品信息新增编辑页面*/
const OilQualityInfoForm = () => import('@/views/basicManage/oilQualityInfo/oilQualityInfoForm')
/**储罐管理*/
const OilTankManage = () => import('@/views/basicManage/oilTankManage/index')
/**牌号管理*/
const TrademarkManage = () => import('@/views/basicManage/trademarkManage/index')
/**品类管理*/
const CategoryManage = () => import('@/views/basicManage/categoryManage/index')
/**生产商管理*/
const ManufactureManage = () => import('@/views/basicManage/manufactureManage/index')


// #region 仓储管理
/**入库明细*/
const EnterStorageDetail = () => import('@/views/warehouseManage/enterStorageDetail/index')
/**入库登记*/
const EnterStorageRegister = () => import('@/views/warehouseManage/enterStorageDetail/enterStorageRegister.vue')
/**待验收入库*/
const WaitCheckEnter = () => import('@/views/warehouseManage/waitCheckEnter/index')
/**验收入库*/
const CheckEnter = () => import('@/views/warehouseManage/waitCheckEnter/checkEnter')
/**验收出库*/
const CheckOuter = () => import('@/views/warehouseManage/waitCheckOuter/checkOuter')
/**待验收出库*/
const WaitCheckOuter = () => import('@/views/warehouseManage/waitCheckOuter/index')
/**出库申请*/
const ApplyCheckOut = () => import('@/views/warehouseManage/outerStorageDetail/applyCheckout')
/**出库明细*/
const OuterStorageDetail = () => import('@/views/warehouseManage/outerStorageDetail/index')
/**质押明细*/
const PledgeDetail = () => import('@/views/warehouseManage/pledgeDetail/index')
/**解押明细*/
const ReleasePledgeDetail = () => import('@/views/warehouseManage/releasePledgeDetail/index')
/**过户明细*/
const TransferOwnershipDetail = () => import('@/views/warehouseManage/transferOwnershipDetail/index')
/**过户管理*/
const TransferOwnershipManage = () => import('@/views/warehouseManage/transferOwnershipDetail/transferOwnershipManage')
/**库存表*/
const InventoryTable = () => import('@/views/warehouseManage/inventoryManage/inventoryTable.vue')
/**库存明细*/
const InventoryDetail = () => import('@/views/warehouseManage/inventoryManage/inventoryDetail.vue')
/**质解押管理*/
const TogglePledgeManage = () => import('@/views/warehouseManage/togglePledgeManage/index.vue')
/**质押管理*/
const PledgeManage = () => import('@/views/warehouseManage/togglePledgeManage/pledgeManage.vue')
/**解押管理*/
const ReleasePledgeManage = () => import('@/views/warehouseManage/togglePledgeManage/releasePledgeManage.vue')
// #endregion 仓储管理


// #region 会员管理
/**交易会员管理列表*/
const VipManage = () => import('views/vipManage/index.vue')
/**新增会员表单模块*/
const AddMemberForm = () => import('views/vipManage/addMemberForm.vue')
/**者编辑会员表单模块*/
const EditMemberForm = () => import('views/vipManage/editMemberForm.vue')
// #endregion

// #region 预警管理
/**协议到期预警*/
const DealDueforeWarn = () => import('views/foreWarnManage/dealDueforeWarn.vue')
// #endregion


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
            path: '/web/yc/base/goods/listGoods',
            name: 'commodityManage',
            component: CommodityManage
        },
        {
            path: '/web/yc/base/material/listMaterials',
            name: 'materialManage',
            component: MaterialManage
        },
        {
            path: '/web/yc/base/pilePosition/listPilePositions',
            name: 'pilePositionManage',
            component: PilePositionManage
        },
        {
            path: '/web/yc/base/originPlace/listOriginPlaces',
            name: 'originPlaceManage',
            component: OriginPlaceManage
        },
        {
            path: '/web/yc/base/productName/listProductNames',
            name: 'productNameManage',
            component: ProductNameManage
        },  
        {
            path: '/web/yc/base/deliveryStoreManage/pageDeliveryStore',
            name: 'settlementStorageManage',
            component: SettlementStorageManage
        },
        {
            path: '/web/yc/base/deliveryStoreManage/settlementForm',
            name: 'settlementForm',
            component: SettlementForm
        },
        {
            path: '/web/yc/base/cargoManage/pageCargo',
            name: 'shipperManage',
            component: ShipperManage
        },
        {
            path: '/web/yc/base/spec/listSpecs',
            name: 'specificationManage',
            component: SpecificationManage
        },  
        {
            path: '/web/settlement/pageList/print',
            name: 'print',
            component: () => import('@/views/basicManage/print/index')
        },  
        {
            path: '/web/yc/base/category/listCategorys',
            name: 'categoryManage',
            component: CategoryManage
        },  
        {
            path: '/web/yc/product/product/pageForSale',
            name: 'oilQualityInfo',
            component: OilQualityInfo
        },      
        {
            path: '/web/yc/product/product/pageForSale/form',
            name: 'oilQualityInfoForm',
            component: OilQualityInfoForm
        },          
        {
            path: '/web/yc/base/producer/listProducers',
            name: 'manufactureManage',
            component: ManufactureManage
        },  
        {
            path: '/web/yc/base/brand/listBrands',
            name: 'trademarkManage',
            component: TrademarkManage
        },  
        {
            path: '/web/yc/base/oilTank/listOilTanks',
            name: 'oilTankManage',
            component: OilTankManage
        },  
        // #region  仓储信息      
        {
            path: '/web/yc/storage/stockRegisterDetail/page',
            name: 'enterStorageDetail',
            component: EnterStorageDetail
        }, 
        {
            path: '/web/yc/storage/stockRegisterDetail/page/register',
            name: 'enterStorageRegister',
            component: EnterStorageRegister
        },        
        {
            path: '/web/yc/storage/stockInventory/page',
            name: 'inventoryTable',
            component: InventoryTable
        },
        {
            path: '/web/yc/storage/stockInventory/page/inventoryDetail',
            name: 'inventoryDetail',
            component: InventoryDetail
        },
        {
            path: '/web/yc/storage/stockRegister/page',
            name: 'waitCheckEnter',
            component: WaitCheckEnter
        },  
        {
            path: '/web/yc/storage/stockRegister/page/checkEnter',
            name: 'checkEnter',
            component: CheckEnter
        },  
        {
            path: '/web/yc/storage/stockRemoval/page',
            name: 'waitCheckOuter',
            component: WaitCheckOuter
        },  
        {
            path: '/web/yc/storage/stockRemoval/page/CheckOuter',
            name: 'checkOuter',
            component: CheckOuter
        },  
        {
            path: '/web/yc/storage/stockRemovalDetail/page',
            name: 'outerStorageDetail',
            component: OuterStorageDetail
        },
        {
            path: '/web/yc/storage/stockRemovalDetail/page/applyCheckOut',
            name: 'applyCheckOut',
            component: ApplyCheckOut
        },        
        {
            path: '/web/yc/pledgeinfo/detail',
            name: 'pledgeDetail',
            component: PledgeDetail
        },  
        {
            path: '/web/yc/releaseinfo/detail',
            name: 'releasePledgeDetail',
            component: ReleasePledgeDetail
        },  
        {
            path: '/web/yc/pledgeinfo/page',
            name: 'togglePledgeManage',
            component: TogglePledgeManage
        },  
        {
            path: '/web/yc/pledgeinfo/page/pledgeManage',
            name: 'pledgeManage',
            component: PledgeManage
        },  
        {
            path: '/web/yc/pledgeinfo/page/releasePledgeManage',
            name: 'releasePledgeManage',
            component: ReleasePledgeManage
        },  
        {
            path: '/web/yc/inventory/transfer/detail',
            name: 'transferOwnershipDetail',
            component: TransferOwnershipDetail
        },
        {
            path: '/web/settlement/pageList/transferOwnershipManage',
            name: 'transferOwnershipManage',
            component: TransferOwnershipManage
        },
        // #endregion       
        
        
        // #region  会员管理  
        {
            path: '/web/yc/member/page',
            name: 'vipManage',
            component: VipManage
        },
        {
            path: '/web/yc/member/member/addmemberForm',
            name: 'addMemberForm',
            component: AddMemberForm
        },      
        {
            path: '/web/yc/member/member/editmemberForm',
            name: 'editMemberForm',
            component: EditMemberForm
        },
        // #endregion     


        // #region  预警管理      
        {
            path: '/web/yc/agreement/pageWarn',
            name: 'dealDueforeWarn',
            component: DealDueforeWarn
        },
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
