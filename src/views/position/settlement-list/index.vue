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
          <el-table-column v-for="(item,index) in tableList" :key="index" :label="item.label" min-width="110px" align="center">
            <template slot-scope="{row}">
              <div v-if="item.rowName ==='photo'" class="vicp-preview-item" @click="onView(row)">
                <img :src="row[item.rowName]" style="width: 40px; height: 40px;">
              </div>
              <!--   <span v-if="item.rowName ==='BiTime'">{{ row[item.rowName].split('.')[0] }}</span>
              <span v-else-if="item.rowName==='BiChannel'">{{ row[item.rowName] | dict('BiChannelList') }}</span>
              <span v-else>{{ row[item.rowName] }}</span>-->
              <span v-else>{{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />

    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <img :src="previewpic" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
import { custcheckoutlist } from '@/api/position'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { turn } from 'mock/user'
export default {
  name: 'CustList', // 结算列表
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      dialogVisible: false,
      previewpic: '',
      arr: [],
      list: [
        {
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          PartyName: '48980.5210',
          realName: '伊藤和成',
          ProdCategory: '张',
          BiStateName: '张',
          photo: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        },
        {
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          PartyName: '48980.5210',
          realName: '伊藤和成',
          ProdCategory: '张',
          BiStateName: '张',
          photo: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
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
        { label: '订单编号', rowName: 'orderId' },
        { label: '昵称', rowName: 'nickName' },
        { label: '建仓时间', rowName: 'createTime' },
        { label: '持仓类型', rowName: 'holdType' },
        { label: '币种', rowName: 'type' },
        { label: '总持仓数量', rowName: 'holdNum' },
        { label: '持仓价', rowName: 'holdPrice' },
        { label: '平仓价', rowName: 'overPrice' },
        { label: '杠杆倍数', rowName: 'times' },
        { label: '占用保证金', rowName: 'takeDeposit' },
        { label: '止盈率', rowName: 'profitRatio' },
        { label: '止损率', rowName: 'stopRatio' },
        { label: '止盈价格', rowName: 'profitPrice' },
        { label: '止损价格', rowName: 'stopPrice' },
        { label: '收益', rowName: 'revenue' },
        { label: '手续费', rowName: 'premiumNum' },
        { label: '是否强平', rowName: 'isClose' }
      ],
      option: {
        placeholder: ' 请输入金额'
      }

    }
  },
  created() {

  },
  methods: {
    // 获取结算列表客户
    getList() {
      this.listLoading = true
      custcheckoutlist(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
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
