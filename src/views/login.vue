<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
      <el-row>
        <el-col :span="2"><i class="fa fa-user"></i></el-col>
        <el-col :span="22">
          <InputGroup placeholder="请输入账号" v-model="usernameOrEmailAddress"></InputGroup>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"> <i class="fa fa-lock"></i></el-col>
        <el-col :span="22">
          <InputGroup placeholder="请输入密码" v-model="password" type="password"></InputGroup>
        </el-col>
      </el-row>
      <div class="btn_wrap">
        <YButton @click="loginClick">登录</YButton>
      </div>
    </div>
  </div>
</template>
<script>
  import { validUsername } from "@/utils/validate";
  import Cookies from "js-cookie";
  import { login } from "@/api/login";
  import axios from "axios";
  import InputGroup from "../components/InputGroup";
  import YButton from "../components/YButton";

  let self;
  export default {
    name: "login",
    components: {
      InputGroup,
      YButton
    },
    data() {
      return {
        usernameOrEmailAddress: "",
        password: "",
      };
    },
    computed: {
      isDisabled() {
        if (this.usernameOrEmailAddress && this.password) return false;
        else return true;
      }
    },
    methods: {
      loginClick() {
        // let millisecond = new Date().getTime();
        // let expiresTime = new Date(millisecond + 864000);
        login({ usernameOrEmailAddress: this.usernameOrEmailAddress, password: this.password, }).then(response => {
          Cookies.set('Token', response.result.accessToken);
          // Cookies.set('Token', response.result.accessToken, {
          //   expires: expiresTime,
          // });
          this.$router.push({ path: '/chinese' })
        }).catch(err => {
          alert("用户名或密码无效，请重新输入")
        })
      },
    }
  };
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 2.1vw;
    box-sizing: border-box;
    background-image: url(../assets/images/denglu.jpg);

  }

  .title {
    margin-top: 20vw;
    font-size: 5.1vw;
    text-align: center;
    color: #ffffff;
  }

  .content,
  .btn_wrap {
    margin-top: 6vw;
  }

  .fa {
    color: #ffffff;
    font-size: 6vw;
  }

  .el-col-2 {
    margin-top: 15%;
  }

  .el-col-22 {
    margin-top: 12%;
  }

  .el-row {
    width: 90%;
    padding-left: 5%;
  }

  input {
    background: none;
    border: none;
  }
</style>