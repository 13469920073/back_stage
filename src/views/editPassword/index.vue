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
            <el-col :span="24">
              <el-form-item label="原始密码" prop="oldPwd">
                <el-input ref="oldPwd" v-model="form.oldPwd" type="password" placeholder="请输入原始密码" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新密码" prop="passWord">
                <el-input ref="passWord" v-model="form.passWord" type="password" placeholder="请输入新密码" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="重复新密码" prop="newPassWord">
                <el-input ref="newPassWord" v-model="form.newPassWord" type="password" placeholder="重复新密码" />
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
import { changepwd } from '@/api/editPassword'
export default {
  name: 'CreatedProxy', // 代理新增
  data() {
    const checkPwd = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.form.passWord) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
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
        shareRatio: '',
        newPassWord: ''
      },
      showEmpty: 'query',
      showMainPage: true,
      temp: {},

      rules: {
        oldPwd: [{ required: true, message: '原始密码不能为空', trigger: 'blur' }],
        // newPassWord: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        newPassWord: [
          {
            validator: checkPwd,
            required: true,
            trigger: 'blur'
          }
        ],
        passWord: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
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
      console.log('this.form', this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          changepwd(this.form).then(() => {
            console.log('======')
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
