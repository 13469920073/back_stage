<!--
 * @Description: 银行交易流水查询
 * @Date: 2021-09-10 08:40:19
-->
<template>
  <div>
    <div v-if="showMainPage" class="app-container">
      <div class="form-container">
        <el-form
          ref="form"
          label-width="100px"
          :inline="true"
          :model="form"
          :rules="searchFormRules"
        >
          <el-form-item label="关键词" prop="keyWords">
            <el-input ref="keyWords" v-model="form.keyWords" placeholder="关键词" />
          </el-form-item>
          <el-form-item label="开始日期" prop="beforeTime">
            <el-date-picker
              v-model="form.beforeTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              @keydown.native.enter.stop.prevent="jumpFocus('afterTime')"
              @keydown.native.tab.stop.prevent="jumpFocus('afterTime')"
            />
          </el-form-item>
          <el-form-item label="结束日期" prop="afterTime">
            <el-date-picker
              ref="afterTime"
              v-model="form.afterTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width:100%"
            />
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
          <el-table-column v-for="(item,index) in tableList" :key="index" :label="item.label" min-width="110px" align="center">
            <template slot-scope="{row}">
              <div v-if="item.rowName ==='photo'" class="vicp-preview-item" @click="onView(row)">
                <img :src="row[item.rowName]" style="width: 40px; height: 40px;">
              </div>
              <span v-else-if="item.rowName==='startNum'">{{ $money(row[item.rowName]) }}</span>
              <span v-else-if="item.rowName==='adminFinalNum'">{{ $money(row[item.rowName]) }}</span>
              <span v-else-if="item.rowName==='adminTotalNum'">{{ $money(row[item.rowName]) }}</span>
              <span v-else>{{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.limit" @pagination="getList" />

    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <img :src="previewpic" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
import { adminstatisticslist } from '@/api/platform-statistics'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { turn } from 'mock/user'
export default {
  name: 'AgencyStatistics', // 代理统计
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      dialogVisible: false,
      previewpic: '',
      arr: [],
      list: [], // 表格
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
        { label: '登录帐号', rowName: 'userName' },
        { label: '代理昵称', rowName: 'nickName' },
        { label: '期初总余额', rowName: 'startNum' },
        { label: '团队总充值', rowName: 'adminIncomeNum' },
        { label: '团队总提现', rowName: 'adminOutlayNum' },
        { label: '提现待审核', rowName: 'adminOutlayYetNum' },
        { label: '提现退回', rowName: 'adminOutlayRejectNum' },
        { label: '占用保证金', rowName: 'adminTakeDepositNum' },
        { label: '期末总余额', rowName: 'adminFinalNum' },
        { label: '团队总盈亏', rowName: 'adminTotalNum' }
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
    // 获取已审核客户
    getList() {
      this.listLoading = true
      adminstatisticslist(this.form).then(response => {
        this.list = response.data.result
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },
    // 图片预览
    onView(row) {
      this.dialogVisible = true
      this.previewpic = row.photo
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

    // 详情关闭
    closeApproval() {

    }
  }
}
</script>
<style scoped lang="scss">

</style>
