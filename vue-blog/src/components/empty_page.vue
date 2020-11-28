<template>
  <div id="empty_page">
    <el-container>
      <el-aside style="border-radius: 3px;width:200px;margin-left: 5%;overflow: hidden;margin-bottom: 10px">
        <el-row :gutter="24">
          <el-col :span="14" :offset="6">
            <router-link to="/mavon_editor" id="mavon_editor" class="target">
              <i class="el-icon-edit"></i>
              <span>MarkDown</span>
            </router-link>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="14" :offset="6">
            <router-link to="/form_example" id="form_example" class="target">
              <i class="el-icon-edit"></i>
              <span>表单</span>
            </router-link>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="14" :offset="6">
            <router-link to="/quill_editor" id="quill_editor" class="target">
              <i class="el-icon-edit"></i>
              <span>富文本</span>
            </router-link>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="14" :offset="6">
            <router-link to="/timer_example" id="timer_example" class="target">
              <i class="el-icon-edit"></i>
              <span>定时器</span>
            </router-link>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <el-row :gutter="24">
          <el-col :span="24">
            <router-view></router-view>
          </el-col>
        </el-row>
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

</style>
