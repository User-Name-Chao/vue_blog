<template>
  <div id="homepage">
    <div class="w">
      <div class="left">
        <router-view></router-view>
      </div>
      <div class="r-content">
        <div class="allTag">
          <h4 class="readmore-header">标签分类</h4>
          <div class="ovh">
            <router-link
              v-for="(item,id) in  Labellist"
              :key="id"
              :to="{path:'/list',query:{Labelid:item.id}}"
              :class="'cor'+id%9"
         exact-active-class="Label"
            >{{item.label_name}}</router-link>
          </div>
        </div>
        <div class="readmore-content">
          <h4 class="readmore-header">专栏</h4>
          <div class="readmore-title">
            <div  v-for="(item,id) in  serieslist"
              :key="id"
              class="series">
              <router-link  class="series-a" exact-active-class="series" :to="{path:'/list',query:{seriesid:item.id}}"><i class="iconfont">&#xe644;</i>&ensp;{{item.kind_name}}</router-link>
              </div>
          </div>
        </div>
        <div class="readtime-content">
          <h4 class="readmore-header">归档</h4>
          <div class="readtime-items">
             <router-link
             exact-active-class="shijiantime"
             :to="{path:'/list',query:{releasetimes:item}}"
             v-for="(item,id) in  timelist"
              :key="id"
               class="time">
              <i class="iconfont"></i>{{item}}
           </router-link>
          </div>
        </div>
        <div class="readnotice-content">
          <h4 class="readmore-header">个人信息-{{ store_name }}</h4>
          <div class="xinxi"><img src="../assets/img/csdn.png" alt=""> <a href="#" target=“_blank”>&ensp;&ensp;***</a>
          </div>
          <div class="xinxi"><img src="../assets/img/qq.png" alt="">&ensp;&ensp;***</div>
          <div class="xinxi"><img src="../assets/img/mail.png" alt=""> &ensp;&ensp;***@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
export default {
  name: "homepage",
  data() {
    return {
      isCollapse: false,
      routerList: store.state.ments,
      Labellist: [],
      serieslist: [],
      timelist: [],
      store_name:""
    };
  },
  methods: {
    //获取标签的方法
    getlabel() {
      this.$axios({
        method: "get",
        url: "/vue_blog/get_label_list/",
        params: {}
      }).then(
        res => {
          this.Labellist= res.data.labels;
        },
        err => {
          console.log(err);
        }
      );
    },
     //获取专栏的方法
    getcolumn() {
      this.$axios({
        method: "get",
        url: "/vue_blog/get_column_list/",
        params: {}
      }).then(
        res => {
          this.serieslist = res.data.data;
        },
        err => {
          console.log(err);
        }
      );
    },
      //获取时间的方法
    gettime() {
      this.$axios({
        method: "get",
        url: "/vue_blog/get_time_list/",
        params: {}
      }).then(
        res => {
          this.timelist= res.data.data;
        },
        err => {
          console.log(err);
        }
      );
    },

  },
  mounted() {
    this.getlabel()
    this.getcolumn()
    this.gettime()
    this.$store.commit("setName","Test Vuex")
    console.log("*******************1****", this.$store.state.name)
    console.log("*******************2****", this.$store.getters.getName)
    this.store_name = this.$store.getters.getName
  }
};
</script>
<style scoped>
.xinxi{
  width: 80%;
  margin: 0 auto;
  padding: 8px;
}
.xinxi img{
  height: 20px;
  vertical-align: middle
}
.w {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 30px;
  min-height: 0px;
}
.readtime-content,
.allTag,
.readmore-content
.readmore-header{
  margin-top:  14px;
  margin-bottom: 0px;
}
.left {
  float: left;
  width: 770px;
  min-height: 900px
}
.series{
  width: 90%;
  height: 25px;
  margin: 0 auto;
  font-size: 14px;
  margin-top: 5px;
  overflow:hidden;  /* 超出的文本隐藏*/
  text-overflow:ellipsis;  /* 溢出用省略号显示*/
  white-space:nowrap;    /*   溢出不换行 */
}
.series :hover{
  color: #fda870;
}
.series-a{
  color: #AFAFAF;
}
.r-content {
  float: right;
  margin-top: -10px;
}
.router-link {
  margin-top: -1222px;
}
.series{
  color: #fda870;/*专栏和时间路由的样式*/
   padding-left: 10px;
}
.shijiantime{
  color: #fda870;/*专栏和时间路由的样式*/
}
.Label{
  background-color: #fda870/*标签路由的样式*/
}
@media screen and (max-width: 800px) {
  .w {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .r-content {
    float: left;
    margin-left: -5px;
    width: 100%;
    margin-top: 30px;
    display: none;/*在屏幕宽度小于800后隐藏-张超*/
  }
  .left {
    float: left;
    width: 100%;
  }
  .readtime-items {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
