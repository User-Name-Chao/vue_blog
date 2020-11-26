<template>

</template>

<script>
  export default {
    name: "get_fodler_files",
    data() {
      return {
        search: "",
      };
    },
    methods: {
      getfiles() {
        const fs = require("fs");//引用文件系统模块----
        const files = fs.readdirSync('/')

        console.log(files);
      }
    },
    mounted() {
      this.getfiles()
    },
  }
</script>

<style scoped>

</style>
