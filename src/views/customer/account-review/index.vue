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
              <!--   <span v-if="item.rowName ==='BiTime'">{{ row[item.rowName].split('.')[0] }}</span>
              <span v-else-if="item.rowName==='BiChannel'">{{ row[item.rowName] | dict('BiChannelList') }}</span>
              <span v-else>{{ row[item.rowName] }}</span>-->
              <span v-if="item.rowName==='BiChannel'">{{ row[item.rowName] | dict('BiChannelList') }}</span>
              <span v-else> {{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="onPass(scope.row,scope.$index)">通过</el-button>
              <el-button size="small" type="danger" @click="onNotPass(scope.row,scope.$index)">不通过</el-button>
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
import { accreviewinglist, updatecustomeracc } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'CustList', // 账户待审核
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      arr: [],
      list: [
        {
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          PartyName: '48980.5210',
          realName: '伊藤和成',
          ProdCategory: '张',
          BiStateName: '张'
        },
        {
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          PartyName: '48980.5210',
          realName: '伊藤和成',
          ProdCategory: '张',
          BiStateName: '张'
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
        { label: '用户帐号', rowName: 'loginAccount' },
        { label: '用户昵称', rowName: 'nickName' },
        { label: '账户类型', rowName: 'type' },
        { label: '账户名称', rowName: 'accountName' },
        { label: '账户地址', rowName: 'address' },
        { label: '申请时间', rowName: 'applicationTime' },
        { label: '状态', rowName: 'status' }
      ],
      option: {
        placeholder: ' 请输入金额'
      }

    }
  },
  created() {

  },
  methods: {

    getList() {
      this.listLoading = true
      console.log('获取信息', this.form)
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
    // 通过
    onPass(row, index) {
      console.log('通过审核')
      this.$alert('确定审核通过吗', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          const param = {
            accountReqVo: row.id,
            status: 3,
            pageNum: this.form.pageNum,
            pageSize: this.form.pageSize
          }
          updatecustomeracc(param).then(response => {
            this.$message({
              type: 'success',
              message: '审核成功'
            })
          })
        }
      })
    },
    // 不通过
    onNotPass(row, index) {
      console.log('通过审核', row)
      this.$alert('确定审核不通过吗', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          const param = {
            accountReqVo: row.id,
            status: 4,
            pageNum: this.form.pageNum,
            pageSize: this.form.pageSize
          }
          updatecustomeracc(param).then(response => {
            this.$message({
              type: 'success',
              message: '审核成功'
            })
          })
        }
      })
    },
    save() {

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
