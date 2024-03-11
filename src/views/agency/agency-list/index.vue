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
              <span v-if="item.rowName ==='createTime'">{{ dayjs(row[item.rowName]).format('YYYY-MM-DD HH:mm:ss') }}</span>
              <span v-else> {{ row[item.rowName] }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="onEdit(scope.row,scope.$index)">编辑</el-button>
              <el-button size="small" type="danger" @click="onDel(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />

    </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改':'新增'">
      <el-form :model="agency" label-width="80px" :rules="rules" label-position="left">
        <el-form-item label="代理名称" prop="nickName">
          <el-input v-model="agency.nickName" placeholder="请输入代理名称" />
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="agency.userName" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="登录密码" prop="passWord">
          <el-input v-model="agency.passWord" placeholder="请输入登录密码" />
          <div style="color:red">*不填为原密码</div>
        </el-form-item>
        <el-form-item label="分佣比例" prop="shareRatio" style="display: flex;margin-left: 0;">
          <el-input v-model="agency.shareRatio" placeholder="请输入分佣比例" />
          <span>%</span>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="save">确定</el-button>
        <el-button type="primary" @click="confirmRole">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getumslist, updateums, deleteums } from '@/api/agency'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'CustList', // 代理列表
  components: { Pagination },
  data() {
    return {
      tableKey: 0, // 表格
      dialogVisible: false,
      dialogType: 'add',
      arr: [],
      agency: {
        shareRatio: '',
        nickName: '',
        oldPwd: '',
        passWord: '',
        userName: ''
      },
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
      rules: {
        shareRatio: [{ required: true, message: '分佣比例不能为空', trigger: 'change' }],
        nickName: [{ required: true, message: '代理名称不能为空', trigger: 'change' }],
        userName: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }]
      },
      searchFormRules: {
        OrgName: [{ required: true, message: '请选择机构', trigger: 'change' }]

      },
      processVisible: false,

      tableList: [
        // table配置
        { label: '代理名称', rowName: 'nickName' },
        { label: '登录账号', rowName: 'userName' },
        { label: '代理邀请码', rowName: 'inviteCode' },
        { label: '分佣比例', rowName: 'shareRatio' },
        { label: '创建日期', rowName: 'createTime' }
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
      console.log('获取信息', this.form)
      getumslist(this.form).then(response => {
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
    // 编辑
    onEdit(row, index) {
      console.log('通过审核')
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.agency = row
    },
    // 不删除
    onDel(row, index) {
      this.$alert('确定删除该代理吗', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          deleteums({ id: row.id }).then(response => {
            this.$message({
              type: 'success',
              message: `删除成功`
            })
          })
        }
      })
    },
    save() {
      console.log('queding', this.agency)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateums(this.agency).then(() => {
            console.log('======')
            this.dialogVisible = false
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    confirmRole() { this.dialogVisible = false },
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
