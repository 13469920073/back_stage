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
          创建时间： {{ form.createTime }}
        </el-col>
        <el-col :span="8" style="margin-top: 20px;">
          邀请码： <span style="font-size: 18px;">{{ form.inviteCode }}</span>
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
    <!-- <div>
      <img :src="emptyGif" class="emptyGif">
    </div> -->
  </div>
</template>

<script>
import { getAdmininfo } from '@/api/user'
import { mapGetters } from 'vuex'
// import PanThumb from '@/components/PanThumb'
// import GithubCorner from '@/components/GithubCorner'
// import { from } from 'core-js/core/array'

export default {
  name: 'DashboardEditor',
  // components: { PanThumb, GithubCorner },
  data() {
    return {
      form: {
        phonenumber: '',
        nickName: '',
        createTime: '',
        inviteCode: '486307'
      }
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
    // this.getUserInfo()
  },
  methods: {

    getUserInfo() {
      console.log('获取用户信息')
      getAdmininfo().then((res) => {
        console.log('======', res)
        this.form = res
      })
    }
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
