<template>
  <div id="empty_page">
    <el-container class="container_header">
      <!--<el-header>
        <el-row :gutter="10">
          <el-col :span="6">
            <router-link to="/mavon_editor" id="mavon_editor" class="target">
              <i class="el-icon-edit"></i>
              <span>MarkDown</span>
            </router-link>
          </el-col>
          <el-col :span="6">
            <router-link to="/form_example" id="form_example" class="target">
              <i class="el-icon-edit"></i>
              <span>表单</span>
            </router-link>
          </el-col>
          <el-col :span="6">
            <router-link to="/quill_editor" id="quill_editor" class="target">
              <i class="el-icon-edit"></i>
              <span>富文本</span>
            </router-link>
          </el-col>
          <el-col :span="6">
            <router-link to="/timer_example" id="timer_example" class="target">
              <i class="el-icon-edit"></i>
              <span>定时器</span>
            </router-link>
          </el-col>
        </el-row>
      </el-header>-->
      <el-main style="margin-top: 5%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "empty_page",
    data() {
      return {

      };
    },
    methods:{

    },
    components:{
    }
  }
</script>

<style scoped>
  .container_header header {
    border-radius: 3px;
    width: 80%;
    left: 10%;
    align-content: center;
    margin: 135px 0px 0px 0px;
    font-weight: 200;
    max-height: 40px;
    background-color: white;
    /*background-color: transparent;*/ /*透明*/
  }
  .container_header header i {
    font-size: 15px;
    color: #13ce66;
    margin-top: 21px;
  }
  .container_header header span {
    font-size: 15px;
    color: #070707;
  }
</style>
