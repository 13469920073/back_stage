<template>
  <!-- 左侧导航栏 -->
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        <div v-if="item.meta.title == '客户管理' && (customerCount||accCount)" class="tip_sadmin">
          <span>{{ customerCount+accCount }}</span>
        </div>
        <div v-if="item.meta.title == '财务管理' && (outlayCount|| incomeCount)" class="tip_sadmin">
          <span>{{ outlayCount+incomeCount }}</span>
        </div>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
  <!-- <el-menu-item>
          <item :icon="quit" title="退出" />
        </el-menu-item> -->
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { getAdmininfo } from '@/api/user'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      outlayCount: '',
      customerCount: '',
      accCount: '',
      incomeCount: ''
    }
  },
  created() {
    getAdmininfo().then((res) => {
      const { incomeCount, outlayCount, customerCount, accCount } = res.data
      this.incomeCount = incomeCount // 拒绝入金总条数
      this.outlayCount = outlayCount // 拒绝出金总条数
      this.customerCount = customerCount // 客户待审核总条数
      this.accCount = accCount // 账户待审核总条数
    })
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style>
.tip_sadmin {
  position: absolute;
    padding: 0;
    height: 22px;
    width: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    color: white;
    background-color: red;
  right: 36px;
  z-index: 99;
  bottom: 18px;
  margin: auto;
    font-size: 12px;
    transform: scale(.72);
}
</style>
