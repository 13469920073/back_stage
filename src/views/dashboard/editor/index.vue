<template>
  <div class="dashboard-editor-container" style="background: #fff;">
    <div class=" clearfix">
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple" />
          代理名： {{ form.nickName }}
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light" />
          联系方式： {{ form.phonenumber }}
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple" />
          创建时间： {{ dayjs(form.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </el-col>
        <el-col :span="8" style="margin-top: 20px;">
          邀请码： <span style="font-size: 28px;">{{ form.inviteCode }}</span>
        </el-col>
        <el-col v-if="form.userName==='admin'" :span="8" style="margin-top: 20px;">
          TON涨跌：
          <span style="font-size: 28px;">
            <el-button type="primary" @click="onSet">设置</el-button>
            <!-- <el-switch
              v-model="switchValue"
              active-value="open"
              inactive-value="close"
              @change="handleSwitchChange"
            /> -->
          </span>
        </el-col>
      </el-row>
      <!-- <pan-thumb :image="avatar" style="float: left">
        Your roles:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
      </div> -->
    </div>
    <el-dialog :visible.sync="dialogVisible" title="设置">
      <el-form ref="form" :model="setForm" label-width="80px" :rules="rules" label-position="left">
        <el-form-item label="" prop="openStatus">
          <el-radio-group v-model="setForm.openStatus">
            <el-radio :label="`1`">买涨</el-radio>
            <el-radio :label="`2`">买跌</el-radio>
            <el-radio :label="`3`">关闭(原价)</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="间隔时间" prop="range">
          <el-select ref="select" v-model="setForm.time" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item> -->
        <el-form-item v-if="setForm.openStatus !== '3'" label="涨跌幅度" prop="middleParam">
          <el-input
            v-model="setForm.middleParam"
            type="number"
            min="0.0001"
            max="0.1"
            step="0.0001"
            maxlength="6"
            placeholder="0.0001-0.1之间的数值"
            @input="validateInput"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="save">确定</el-button>
        <el-button type="primary" @click="confirmRole">取消</el-button>
      </div>
    </el-dialog>
    <!-- <div>
      <img :src="emptyGif" class="emptyGif">
    </div> -->
  </div>
</template>

<script>
import { getAdmininfo, ratechange, redisache, setRatechange } from '@/api/user'
import { mapGetters } from 'vuex'
// import PanThumb from '@/components/PanThumb'
// import GithubCorner from '@/components/GithubCorner'
// import { from } from 'core-js/core/array'

export default {
  name: 'DashboardEditor',
  // components: { PanThumb, GithubCorner },
  data() {
    return {
      dialogVisible: false,
      options: [{
        label: '10秒钟',
        value: '10'
      }],
      setForm: {
        openStatus: 1,
        middleParam: ''
      },
      form: {
        phonenumber: '',
        nickName: '',
        createTime: '',
        inviteCode: '486307'

      },
      rules: {
        openStatus: [{ required: true, message: '不能为空', trigger: 'blur' }],
        middleParam: [{ required: true, message: '幅度不能为空', trigger: 'blur' }]
      },
      switchValue: null
      // emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUserInfo()
    // this.getdata()
  },
  methods: {
    getUserInfo() {
      getAdmininfo().then((res) => {
        this.form = res.data
        this.setForm.openStatus = res.data.openStatus
        this.setForm.middleParam = res.data.middleParam
      })
    },
    // 开启涨跌
    handleSwitchChange(value) {
      if (value === 'open') {
        ratechange({}).then((res) => {
          this.getUserInfo()
          this.$notify({
            title: '提示',
            message: '已打开',
            type: 'success',
            duration: 2000
          })
        }).catch(error => {
          console.log(error)
        })
      } else {
        // 停止
        redisache({}).then((res) => {
          this.getUserInfo()
          this.$notify({
            title: '提示',
            message: '已关闭',
            type: 'success',
            duration: 2000
          })
        }).catch(error => {
          console.log(error)
        })
      }

    // 这里可以执行你的逻辑代码
    },
    onSet() {
      this.getUserInfo()
      this.dialogVisible = true
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          setRatechange(this.setForm).then((res) => {
            this.confirmRole()
            this.$notify({
              title: '提示',
              message: '设置成功',
              type: 'success',
              duration: 2000
            })
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    confirmRole() {
      this.dialogVisible = false
      this.setForm.openStatus = 1
      this.setForm.middleParam = ''
    },
    validateInput(event) {
      // var reg = /^(?:0\.[0-1][0-9]{0,2}|0?\.1?0{0,2})$/
      // if (reg.test(event)) {
      //   console.log('vvvv2222', event)
      //   this.setForm.range = event
      // } else {
      //   console.log('vvvv3333', event)
      //   if (event !== '0.') {
      //     this.setForm.range = ''
      //   }
      // }
      // var regex = /^(\d+)?(\.\d{0,2})?$/
      if (event < 0.0001) {
        console.log('vvvv3333', event)
        if (event === '0' || event === '0.0' || event === '0.00' || event === '0.000') {
          this.setForm.middleParam = event
        } else {
          this.setForm.middleParam = ''
        }
      } else if (event > 0.1) {
        console.log('vvvv444', event)
        this.setForm.middleParam = ''
      }

      // const regex = /^(?:0\.[0-1][0-9]{0,2}|0?\.1?0{0,2})$/
      // // 如果输入值不符合规定的数值范围，则将其设置为上次有效的值
      // if (!regex.test(value)) {
      //   console.log('vvvv2222', value)
      //   this.setForm.range = this.setForm.range.replace(/[^0-9.]/g, '') // 清除无效字符
      // }
      console.log('this.setForm.range', this.setForm.middleParam)
    }
    // getdata() {
    //   getratebody({}).then((res) => {
    //     console.log('rrrrrrrrr', res)
    //   })
    // }
  }

}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
