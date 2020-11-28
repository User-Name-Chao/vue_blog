<template>
  <div id="timer_example">
    <el-input id="inputSearch" placeholder="输入关键字搜索" suffix-icon="el-icon-search" size="mini"
              v-model="search"></el-input>
    {{show}}--{{count}}
  </div>
</template>

<script>
  export default {
    name: "timer_example",
    data() {
      return {
        count: 0,
        search: '',
        show: '',
        timeout_timer: null,
        interval_timer: null,
      }
    },
    methods: {
      testFunc() {
        this.count += 1
      }
    },
    mounted() {
      this.interval_timer = setInterval(() => {
        setTimeout(this.testFunc, 0)
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.interval_timer);
    },
    watch: {
      search: function (val, oldVal) {
        //当不断输入字符时，因为延时执行还没有开始，就被清除，然后重新生成新的延时器
        //虽然不停的清除，生成新的延时器，但在输入的时候延时器内部的方法都一直没有被执行
        clearTimeout(this.timeout_timer);  //清除延迟执行
        this.timeout_timer = setTimeout(() => {   //设置延迟执行
          console.log('search:' + val + ',' + oldVal);
          this.show = this.search;
        }, 500);
      }
    }
  }
</script>

<style scoped>
  #inputSearch{
    width: 200px;
    left: 20px
  }
</style>
