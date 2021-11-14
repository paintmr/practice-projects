<template>
  <div id="app">
    <el-card class="box-card login-card">
      <el-form ref="loginForm" class="demo-ruleForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号码" v-model="loginForm.mobile" prop="mobile"></el-input>
        </el-form-item>        
        <el-form-item prop="password">
          <el-input type="password" autocomplete="off" placeholder="请输入密码" v-model="loginForm.password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width: 100%">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    const checkMobile =  (rule, value, callback) => {
      value.charAt(2) === '9' ? callback() : callback(new Error('手機號第3位必須是9'))
    }
    return {
      loginForm: {
        mobile: '',
        password: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '手機號不能為空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手機號格式不正確', trigger: 'blur' },
          { trigger: 'blur', validator: checkMobile } //手機號第3位必須是9
        ],
        password: [
          { required: true, message: '密碼不能為空', trigger: 'blur' },
          { min: 6, max: 16, trigger: 'blur', message: '密碼的長度為6-16位'}
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // 下面兩種校驗方法都可行
      // 方法1
      // this.$refs.loginForm.validate( isOK => {
      //   if (isOK) {
      //     console.log('校驗通過')
      //   }
      // })
      // 方法2，不傳參數，返回的是promise
      // then是校驗成功，catch是校驗失敗
      this.$refs.loginForm.validate().then(() => {
        console.log('通過校驗')
      }
      ).catch(() => {
        console.log('校驗失敗')
      })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 440px;
  height: 230px;
  padding-top: 30px;
}
</style>
