<!--
 * @Description: 银行交易流水查询
 * @Date: 2021-09-10 08:40:19
-->
<template>
  <div>
    <div v-if="showMainPage" class="app-container">
      <div class="form-container">
        <el-form ref="form" label-width="100px" :inline="true" :model="form" :rules="searchFormRules">
          <el-form-item label="关键词">
            <el-input ref="BiId" v-model="form.keyWords" placeholder="关键词" />
          </el-form-item>
          <el-form-item class="search-button">
            <div class="form-button">
              <el-button type="primary" icon="el-icon-search" @click="onQuery">搜索</el-button>
              <el-button type="primary" icon="el-icon-edit" @click="handle('det')">清空</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <div v-if="showEmpty === 'table'">
        <el-table
          :key="tableKey"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @cell-click="chooseItem"
        >
          <el-table-column
            v-for="(item, index) in tableList"
            :key="index"
            :label="item.label"
            min-width="110px"
            align="center"
          >
            <template slot-scope="{row}">
              <span v-if="item.rowName === 'status'">{{ $dict(row[item.rowName], 'StatusList') }}</span>
              <span v-if="item.rowName === 'registeredTime'">{{
                row[item.rowName] ? dayjs(row[item.rowName]).format('YYYY-MM-DD HH:mm:ss') : '-' }}</span>
              <!--  <span v-else-if="item.rowName==='BiChannel'">{{ row[item.rowName] | dict('BiChannelList') }}</span>
              <span v-else>{{ row[item.rowName] }}</span>-->
              <span v-else>{{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.lockStatus === '1'"
                size="small"
                type="primary"
                @click="onLock(scope.row, scope.$index)"
              >锁定</el-button>
              <el-button
                v-else-if="scope.row.lockStatus === '2'"
                size="small"
                type="danger"
                @click="onUnlock(scope.row, scope.$index)"
              >解锁</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="form.pageNum"
        :limit.sync="form.limit"
        @pagination="getList"
      />

    </div>

  </div>

</template>

<script>
import { customerlist, updateLockStatus } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'CustList',
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      arr: [],
      list: [
        // {
        //   id: '561',
        //   nickName: 'NO.73401',
        //   loginAccount: '61-432012117',
        //   superior: '张',
        //   balance: '48980.5210',
        //   accountName: '伊藤和成',
        //   realName: '张',
        //   bindAccount: '张'
        // },
        // {
        //   id: '561',
        //   nickName: 'NO.73401',
        //   loginAccount: '61-432012117',
        //   superior: '张',
        //   balance: '48980.5210',
        //   accountName: '伊藤和成',
        //   realName: '张',
        //   bindAccount: '张'
        // }
      ], // 表格
      total: 0, // 分页
      form: {
        // 分页

        page: 1,
        limit: 10,
        keyWords: '',
        pageNum: 1,
        pageSize: 10,
        status: ''
      },
      showEmpty: 'table',
      showMainPage: true,
      temp: {},

      searchFormRules: {
        OrgName: [{ required: true, message: '请选择机构', trigger: 'change' }]

      },
      processVisible: false,

      tableList: [
        // table配置
        { label: 'id', rowName: 'id' },
        { label: '用户昵称', rowName: 'nickName' },
        { label: '登录账号', rowName: 'loginAccount' },
        { label: '上级', rowName: 'superior' },
        { label: 'USDT余额', rowName: 'balance' },
        { label: '业务名称', rowName: 'accountName' },
        { label: '真实姓名', rowName: 'realName' },
        { label: '绑定账户', rowName: 'bindAccount' },
        { label: '注册时间', rowName: 'registeredTime' },
        { label: '实名状态', rowName: 'status' }
      ],
      option: {
        placeholder: ' 请输入金额'
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {

    getList() {
      this.listLoading = true
      customerlist(this.form).then(response => {
        this.list = response.data.result
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },
    clickTens(val) {

    },

    handleResole(res) {

    },
    onQuery() {
      this.form.page = 1
      this.getList()
    },

    getBranchDialogValue(val) {

    },
    // 选中一行
    chooseItem(row) {

    },
    handle(flag) {
      this.form.keyWords = ''
      this.form.page = 1
      this.getList()
    },
    closeProcess() {
      this.processVisible = false
    },
    getprocessDialogValue(val) {

    },
    // 锁定
    onLock(row) {
      this.$confirm('是否锁定该账户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: row.id,
          lockStatus: 2
        }
        updateLockStatus(param).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '锁定成功'
          })
        })
      }).catch(() => {
      })
    },
    // 解锁
    onUnlock(row) {
      console.log()
      this.$confirm('是否解锁该账户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: row.id,
          lockStatus: 1
        }(param).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '解锁成功'
          })
        })
      }).catch(() => {
      })
    },

    // 详情关闭
    closeApproval() {

    }
  }
}
</script>
<style scoped lang="scss"></style>
