<template>
  <div id="article">
    <el-row :gutter="24">
      <el-col :span="18" :offset="1">
        <div class="xiangqing">
          <router-link tag="div" :to="'/list/'+this_page" :key="article_id" class="post-content">
            <i class="iconfont">返回</i>
          </router-link>
          <div class="wenzhang" v-html="article" @click='photo($event)'/>
          <div class="foot">
            &ensp;如有疑问请联系作者，QQ：8888888888
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.7);" @click="close" class="photo" v-if="src">
          <img :src="src" alt="图片请求失败">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import marked from "marked";

  export default {
    // Cmd markdown解析所用的文件
    name: "articles",
    data() {
      return {
        article: "",
        big: false,
        src: '',
        article_id:0,
        this_page: 1,
      };
    },
    methods: {
      quanping() {
        this.big = !this.big;
      },
      photo(e) {
        if (e.target.nodeName === 'IMG') {
          this.src = e.target.src
        }
      },
      close() {
        this.src = "";
      },
      getarticle() {
        // get请求
        this.$axios({
          method: "get",
          url: "/blog/get_article_detail/",
          params: {
            id: this.article_id,
          }
        }).then(
          res => {
            console.log(":++++++++++", res)
            this.article = marked(res.data.data.htmlContents) // 通过marked()将存在数据库的md字符串转译成HTML字符串
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    created() {
      this.article_id = this.$route.params.id
      this.this_page = this.$route.params.page
      this.getarticle();
    },
  };
</script>
<style scoped>
  .photo {
    position: fixed;
    background-color: rgb(7, 7, 7);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99999;
  }

  .photo img {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .wenzhang {
    min-height: 1100px;
  }

  .foot {
    border-top: 2px solid #000;
    width: 100%;
  }

  .backTo {
    width: 100%;
  }

  .xiangqing {
    width: 90%;
    margin: 0 auto;
    background-color: #F9F9F5;
    margin-bottom: 30px;
    border-radius: 20px;
    padding: 5%;
    padding-top: 2%;
  }

  /*.quanping {*/
  /*  border-radius: 0px;*/
  /*  position: absolute;*/
  /*  top: -100px;*/
  /*  width: 60%;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  z-index: 999;*/
  /*  padding-left: 20%;*/
  /*  padding-right: 20%;*/
  /*  opacity: 1;*/
  /*}*/

  .iconfont {
    font-size: 25px;
    position: relative;
    left: 93%;
  }

  .iconfont:hover {
    color: #ff6600;
    cursor: pointer;
  }

  /*@media screen and (max-width: 800px) {*/
  /*  .quanping {*/
  /*    width: 96%;*/
  /*    padding-left: 2%;*/
  /*    padding-right: 2%*/
  /*  }*/

  /*  .iconfont {*/
  /*    left: 88%;*/
  /*  }*/
  /*}*/
</style>
