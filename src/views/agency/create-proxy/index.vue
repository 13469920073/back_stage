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
          :rules="rules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="代理名称" prop="nickName">
                <el-input ref="nickName" v-model="form.nickName" placeholder="代理名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录账号" prop="userName">
                <el-input ref="userName" v-model="form.userName" placeholder="登录账号" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="初始密码" prop="passWord">
                <el-input ref="passWord" v-model="form.passWord" placeholder="初始密码" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分佣比例%" prop="shareRatio">
                <el-input ref="shareRatio" v-model="form.shareRatio" placeholder="分佣比例" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-button type="primary" icon="el-icon-edit" @click="handle('det')">保存</el-button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { addums } from '@/api/agency'
export default {
  name: 'CreatedProxy', // 代理新增
  data() {
    return {
      tableKey: 0, // 表格
      arr: [],
      list: null, // 表格
      total: 0, // 分页
      form: {
        userName: '',
        passWord: '',
        oldPwd: '',
        nickName: '',
        shareRatio: ''
      },
      showEmpty: 'query',
      showMainPage: true,
      temp: {},

      rules: {
        shareRatio: [{ required: true, message: '分佣比例不能为空', trigger: 'blur' }],
        nickName: [{ required: true, message: '代理名称不能为空', trigger: 'blur' }],
        userName: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
        passWord: [{ required: true, message: '初始密码不能为空', trigger: 'blur' }]
      },
      processVisible: false,

      option: {
        placeholder: ' 请输入金额'
      }

    }
  },
  created() {

  },
  methods: {

    getList() {

    },
    clickTens(val) {

    },

    handleResole(res) {

    },
    onQuery() {

    },

    getBranchDialogValue(val) {

    },
    // 选中一行
    chooseItem(row) {

    },
    // 保存
    handle(flag) {
      console.log('查看新增', this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addums(this.form).then(() => {
            this.rest()
            this.$notify({
              title: '提示',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    rest() {
      this.form.userName = ''
      this.form.passWord = ''
      this.form.oldPwd = ''
      this.form.nickName = ''
      this.form.shareRatio = ''
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
