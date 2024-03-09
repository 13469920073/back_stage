import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissions: [] // 用户的权限表
}

const mutations = {
  SET_PERMISSION: (state, permissions = []) => { // 保存用户权限
    state.permissions = permissions
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
function handlePermissions(Menus = []) {
  const permissionsTree = []
  try {
    Menus.forEach(menu => {
      // 判断是否有子菜单
      if (menu.childList && !!menu.childList.length) {
        menu.code && permissionsTree.push(menu.code)
        const childrenPermissions = handlePermissions(menu.childList)
        permissionsTree.push(...childrenPermissions)
        // permissionsTree = [
        //   'openStageMgmt', 'mOpenStageMgt', 'mOpenStageApiMgt', 'mOpenStageProviderMgt', 'mbankMgmt', 'morganMgmt', 'mbankOrganInfoquery', 'mbankOrgRoleQuery', 'mtellerRightMgmt', 'mbankTellerRoleSet', 'mtellerRightQuery', 'mtellerMgmt', 'mbankTellerSet', 'mbankTellerInfoQuery', 'mbankTellerPasswordReset', 'mbankCertMgmt', 'mbankCertMgtApply', 'mbankCertUpdateApply', 'mbankCertMgtApplyCancel', 'mbankCertMgtProcess', 'mbankCertStatusQuery', 'mfeemgmt', 'mfeeItemMgmt', 'mfeeItemQry', 'mfeeItemAdd', 'mfeeItemMod', 'mfeeItemDel', 'mfeeRateMgmt', 'mfeeRateQry', 'mfeeRateAdd', 'mfeeRateMod', 'mfeeRateDel', 'mdivFloatMgmt', 'mdivFloatQry', 'mdivFloatAdd', 'mdivFloatMod', 'mdivFloatDel', 'mfeeDiscountMgmt', 'mFeeDiscountQry', 'mfeeDiscountAdd', 'mfeeDiscountMod', 'mfeeDiscountDel', 'mentMgmt', 'mcustMgmt', 'mcustQuicksign', 'mcustsign', 'mfixedAccInterestMod', 'mcustInfoMod', 'mcustDel', 'mcustInfoQuery', 'mcustComInfoQuery', 'mcustFreezeUnFreeze', 'mcustReceiptPrintQuery', 'mcustReceiptPrintCountQuery', 'mbatchTransferNumSet', 'mcustGrade', 'mcustGradeQuery', 'mcustGradeSet', 'me2eWhite', 'me2eWhiteSet', 'me2eWhiteQuery', 'me2pWhite', 'me2pWhiteSet', 'me2pWhiteQuery', 'mcustrightmgmt', 'mentRightModelSet', 'mentRoleModelSet', 'mentRightQuery', 'mmgtEntPermissionMod', 'mgtSMSNotification', 'mgtAccountSMSSign', 'mgtAccountSMSNotificationSign', 'maccountMgmt', 'mentAccountOpen', 'mentAccountMod', 'mentAccountDel', 'mentAccountInfoQuery', 'mentInnerAccountOpen', 'mentShortAcSet', 'mperLongAcSet', 'maccountRightMgmt', 'mentPairAcSet', 'mentPairAcQuery', 'mentAcPayLimitListQuery', 'mentAuthAcSet', 'mentAuthAcQuery', 'mentUserMgmt', 'mentPaswordLetterPrintHistoryMgt', 'mentUserAdd', 'mentUserMod', 'mentUserDel', 'mentUserInfoQuery', 'mentUserAuthAcSet', 'mentUserPasswordReset', 'mentPaswordLetterPrint', 'mentRightMgmt', 'mentUserRightQuery', 'mentfeemgmt', 'mentFeeAccountMgmt', 'mentFeeAccountQry',
        //   'mbusMgmt', 'mtaskMgmt', 'mhandleTaskMgmt', 'mtaskHandleListQuery', 'mCertFeeWhiteListSet', 'mCertFeeHistory', 'test'
        // ]
      }
      if (!menu.childList || !menu.childList.length) {
        menu.code && permissionsTree.push(menu.code)
        // const { permissions } = menu
        // if (permissions && permissions.length) {
        //   permissions.forEach(permission => {
        //     permission.Id && permissionsTree.push(permission.Id)
        //   })
        // }
      }
    })
    return permissionsTree
  } catch (e) {
    console.error(e, '处理权限出错')
    return permissionsTree
  }
}

const actions = {
  // user login 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), passWord: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { result } = response.data
        const permissionsTree = handlePermissions(result)
        commit('SET_PERMISSION', permissionsTree)
        resolve(permissionsTree)
      }).catch(error => {
        console.log(1112)
        reject(error)
      })
    })
  },
  /**
 * @desc 处理权限树，企业后端返回的权限为树结构类型
 */

  // user logout 退出登录
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')

    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
