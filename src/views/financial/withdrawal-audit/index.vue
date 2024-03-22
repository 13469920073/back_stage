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
          <!-- <el-button type="primary" icon="el-icon-edit" @click="onRecharge('det')">充值</el-button> -->
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
              <span v-else-if="item.rowName==='status'">{{ $dict(row[item.rowName],'StatusList') }}</span>
              <span v-else-if="item.rowName==='source'">{{ row[item.rowName] == '1'?'用户申请':'后台申请' }}</span>

              <span v-else-if="item.rowName ==='approvalTime'">{{ row[item.rowName]?dayjs(row[item.rowName]).format('YYYY-MM-DD HH:mm:ss'):'-' }}</span>
              <!--   <span v-if="item.rowName ==='BiTime'">{{ row[item.rowName].split('.')[0] }}</span>
              <span v-else-if="item.rowName==='BiChannel'">{{ row[item.rowName] | dict('BiChannelList') }}</span>
              <span v-else>{{ row[item.rowName] }}</span>-->
              <span v-else>{{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="onPass(scope.row,scope.$index)">通过</el-button>
              <el-button size="small" type="danger" @click="onNotPass(scope.row,scope.$index)">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.limit" @pagination="getList" />

    </div>
    <el-dialog :visible.sync="dialogVisible2" title="充值">
      <el-form :model="agency" label-width="80px" :rules="rules" label-position="left">
        <el-form-item label="充值币种" prop="type">
          <el-select ref="select" v-model="agency.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="充值数量" prop="incomeNum">
          <el-input v-model="agency.incomeNum" placeholder="请输入充值数量" />
        </el-form-item>
        <!-- <el-form-item label="登录密码" prop="passWord">
          <el-input v-model="agency.passWord" placeholder="请输入登录密码" />
          <div style="color:red">*不填为原密码</div>
        </el-form-item> -->
        <el-form-item label="用户编号" prop="nickName">
          <el-input v-model="agency.nickName" placeholder="请输入用户编号" />
        </el-form-item>
        <!-- <el-form-item label="申请来源" prop="phone">
          <el-select ref="select" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="save">确定</el-button>
        <el-button type="primary" @click="confirmRole">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <img :src="previewpic" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
import { custoutlayreviewinglist, updatecustoutlay, insertincomebyadmin } from '@/api/financial'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { turn } from 'mock/user'
export default {
  name: 'CustList', // 客户入金审核
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      dialogVisible: false,
      dialogVisible2: false,
      previewpic: '',
      arr: [],
      options: [],
      agency: {
        incomeNum: '',
        type: '',
        nickName: ''
      },
      list: [

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
      rules: {
        type: [{ required: true, message: '充值币种不能为空', trigger: 'change' }],
        incomeNum: [{ required: true, message: '充值数量不能为空', trigger: 'change' }],
        nickName: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }]
      },
      searchFormRules: {
        OrgName: [{ required: true, message: '请选择机构', trigger: 'change' }]

      },
      processVisible: false,

      tableList: [
        // table配置
        { label: '昵称', rowName: 'nickName' },
        { label: '真实姓名', rowName: 'realName' },
        { label: '提现类型', rowName: 'type' },
        { label: '提现数量', rowName: 'outlayNum' },
        { label: 'USTD数量', rowName: 'balance' },
        { label: '手续费', rowName: 'premiumNum' },
        { label: '审核时间', rowName: 'approvalTime' },
        { label: '订单号', rowName: 'orderId' },
        { label: '状态', rowName: 'status' }
        // { label: '操作', rowName: 'photo' }
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
      custoutlayreviewinglist(this.form).then(response => {
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
    // 充值
    onRecharge() {
      this.dialogVisible2 = true
    },
    // 确定充值
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          insertincomebyadmin(this.agency).then(() => {
            this.dialogVisible2 = false
            this.getList()
            this.$notify({
              title: '提示',
              message: '充值成功',
              type: 'success',
              duration: 2000
            })
          }).catch(error => {
            console.log(error)
            this.dialogVisible2 = false
          })
        }
      })
    },
    // 取消
    confirmRole() {
      this.dialogVisible2 = false
      this.agency.incomeNum = ''
      this.agency.type = ''
      this.agency.nickName = ''
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
    // 通过
    onPass(row, index) {
      console.log('通过审核', row)
      this.$confirm('确定审核通过吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          customerId: row.customerId,
          status: 3,
          id: row.id,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize
        }
        updatecustoutlay(param).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '审核成功'
          })
        })
      }).catch(() => {
      })
    },
    // 不通过
    onNotPass(row, index) {
      this.$confirm('确定审核不通过吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          customerId: row.customerId,
          status: 4,
          id: row.id,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize
        }
        updatecustoutlay(param).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '审核成功'
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
<style scoped lang="scss">

</style>
