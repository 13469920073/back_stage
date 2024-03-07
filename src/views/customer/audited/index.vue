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
              <div v-if="item.rowName ==='photoFront'" class="vicp-preview-item" @click="onView(row)">
                <img :src="row[item.rowName]" style="width: 40px; height: 40px;">
              </div>
              <!--   <span v-if="item.rowName ==='BiTime'">{{ row[item.rowName].split('.')[0] }}</span>
              <span v-else-if="item.rowName==='BiChannel'">{{ row[item.rowName] | dict('BiChannelList') }}</span>
              <span v-else>{{ row[item.rowName] }}</span>-->
              <span v-else>{{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="onReset(scope.row,scope.$index)">重置</el-button>
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
import { cusreviewedlist, updatecustomer } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { turn } from 'mock/user'
export default {
  name: 'CustList',
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
          photoFront: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        },
        {
          nickName: 'NO.73401',
          loginAccount: '61-432012117',
          superior: '张',
          PartyName: '48980.5210',
          realName: '伊藤和成',
          ProdCategory: '张',
          BiStateName: '张',
          photoFront: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
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
        { label: '昵称', rowName: 'nickName' },
        { label: '登录账号', rowName: 'loginAccount' },
        { label: '上级', rowName: 'superior' },
        { label: '真实姓名', rowName: 'realName' },
        { label: '身份证号', rowName: 'idCard' },
        { label: '身份证正面', rowName: 'photoFront' },
        { label: '身份证反面', rowName: 'photoBack' },
        { label: '创建时间', rowName: 'createTime' }
      ],
      option: {
        placeholder: ' 请输入金额'
      }

    }
  },
  created() {

  },
  methods: {
    // 获取已审核客户
    getList() {
      this.listLoading = true
      cusreviewedlist(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 图片预览
    onView(row) {
      this.dialogVisible = true
      this.previewpic = row.photoFront
    },
    clickTens(val) {

    },
    // 重置
    onReset(row, index) {
      console.log('重置')
      this.$alert('确定重置吗？', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          const param = {
            customerId: row.customerId,
            status: row.customerId
          }
          updatecustomer(param).then(response => {
            console.log('chonzhi')
          })
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // })
        }
      })
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
