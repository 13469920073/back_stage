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
              <span v-if="item.rowName ==='accountName' || item.rowName ==='approvalTime'">{{ dayjs(row[item.rowName]).format('YYYY-MM-DD HH:mm:ss') }}</span>
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

  </div>

</template>

<script>
import { accreviewinglist } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'CustList', // 账户已审核
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      arr: [],
      list: [
        {
          id: '561',
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          balance: '48980.5210',
          accountName: '伊藤和成',
          realName: '张',
          bindAccount: '张'
        },
        {
          id: '561',
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          balance: '48980.5210',
          accountName: '伊藤和成',
          realName: '张',
          bindAccount: '张'
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
        { label: '用户账号', rowName: 'loginAccount' },
        { label: '用户昵称', rowName: 'nickName' },
        { label: '账户类型', rowName: 'type' },
        { label: '账户地址', rowName: 'address' },
        { label: '申请时间', rowName: 'accountName' },
        { label: '审核时间', rowName: 'approvalTime' },
        { label: '状态', rowName: 'status' }
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
      accreviewinglist(this.form).then(response => {
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

    // 详情关闭
    closeApproval() {

    }
  }
}
</script>
<style scoped lang="scss">

</style>
