import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import success from '@/components/success'
import fail from '@/components/fail'

import controlPanel from "../components/pages/controlPanel"
import memberCenter from "../components/pages/memberCenter"
import accttype from "../components/pages/accttype"
import realNameAuth from "../components/pages/realNameAuth"

import panelIndex from '../components/pages/controlPanelSubPages/panelIndex'

import permissionMaintain from '../components/pages/controlPanelSubPages/permissionManager/permissionMaintain'
import roleMaintain from '../components/pages/controlPanelSubPages/permissionManager/roleMaintain'
import userMaintain from '../components/pages/controlPanelSubPages/permissionManager/userMaintain'

import advertisementManager from "../components/pages/controlPanelSubPages/businessManager/advertisementManager"
import aptitudeMaintain from  "../components/pages/controlPanelSubPages/businessManager/aptitudeMaintain"
import processManager from "../components/pages/controlPanelSubPages/businessManager/ProcessManager"




Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/success',
      name: 'success',
      component: success
    },
    {
      path: '/fail',
      name: 'fail',
      component: fail
    },
    {
      path: '/memberCenter',
      name: 'memberCenter',
      component: memberCenter,
      meta: { title: "-会员中心" }
    },
    {
      path: '/accttype',
      name: 'accttype',
      component: accttype,
      meta: { title: "-实名认证" }
    },
    {
      path: '/realNameAuth',
      name: 'realNameAuth',
      component: realNameAuth,
      meta: { title: "-实名认证" }
    },
    {
      path: '/controlPanel',
      name: 'controlPanel',
      component: controlPanel,
      children: [
        {
          path: '',
          name:'panelIndex',
          component: panelIndex,
          meta: { title: "-控制面板" }
        },
        {
          path: 'permissionMaintain',
          name:'permissionMaintain',
          component: permissionMaintain,
          meta: { title: "-许可维护" }
        },
        {
          path: 'roleMaintain',
          name:'roleMaintain',
          component: roleMaintain,
          meta: { title: "-角色维护" }
        },
        {
          path: 'userMaintain',
          name:'userMaintain',
          component: userMaintain,
          meta: { title: "-用户维护" }
        },
        {
          path: 'advertisementManager',
          name:'advertisementManager',
          component: advertisementManager,
          meta: { title: "-广告管理" }
        },
        {
          path: 'aptitudeMaintain',
          name:'aptitudeMaintain',
          component: aptitudeMaintain,
          meta: { title: "-资质维护" }
        },
        {
          path: 'processManager',
          name:'processManager',
          component: processManager,
          meta: { title: "-流程管理" }
        }
      ]
    }

  ]
})
