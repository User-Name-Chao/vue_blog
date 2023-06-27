<template>
  <div id="tou">
    <header>
      <div class="nav">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item v-for="item in routerList" :key="item.id" v-show="item.meta.display" :index="item.path" v-if="item.meta.only_one_path==true">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>

          <el-menu-item v-for="item in routerList" :key="item.id" :index="item.path" v-if="item.children && item.children.length > 0 && item.meta.display==false">
            <i :class="item.meta.icon"></i>
            <span>{{item.label}}</span>
          </el-menu-item>

          <el-submenu v-for="item in routerList" :key="item.id" :index="item.id.toString()" v-if="item.children && item.children.length > 0 && item.meta.display==true">
            <template slot="title">{{item.label}}</template>
            <el-menu-item v-show="items.meta.display" v-for="(items,indexs) in item.children" :key="indexs" :index="items.path">
              <i :class="items.meta.icon"></i>
              {{items.label}}
            </el-menu-item>
          </el-submenu>

          <form class="search-form" autocomplete="off" @submit.prevent="onSubmit">
            <input
              type="text"
              v-model="search"
              placeholder="请输入搜索的关键字"
              class="searchW"
              @keyup.enter="seek"
            />
            <input class="searchB" type="submit" value="..  .." />
            <div class="search_cat" @click="seek">
              <div class="mao_box">
                <div class="mao">
                  <div class="erduo">
                    <div></div>
                    <div></div>
                  </div>
                  <div class="yanjing">
                    <div>
                      <div class="yanquan">
                        <div></div>
                      </div>
                      <div class="yanquan_hedding"></div>
                      <div class="hong"></div>
                    </div>
                    <div class="yan_right">
                      <div class="yanquan">
                        <div></div>
                      </div>
                      <div class="yanquan_hedding"></div>
                      <div class="hong"></div>
                    </div>
                    <div style="clear:both"></div>
                  </div>
                  <div class="bizi">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="zuiba_box">
                    <div class="zuiba">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </el-menu>

      </div>
    </header>
  </div>
</template>
<script>
import store from "../store/store";

export default {
  name: "tou",
  data() {
    return {
      activeIndex: '1',
      isCollapse: false,
      routerList: store.state.ments,
      search: "",
    };
  },
  methods: {
    onSubmit() {
      return false;
    },
    seek() {
      if(this.search)
      {
          this.$router.push({ path: "/list", query: { search: this.search } });
          this.search=""
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 3){
        console.log('********', key, keyPath);
        this.$router.push({ path: "/mavoneditor_menu"});
      }
    }
  },
};
</script>
<style scoped>
a {
  color: #000;
}
.search-form {
  width: 33%;
}
@media screen and (max-width: 800px) {
  .man {
    display: none;
  }
  header .target {
    margin-left: 5px;
  }
  .searchW {
    margin-left: 0px;
  }
  .search-form {
    width: 250px;
  }
  .search_cat {
    left: 157px;
  }
}

@media (min-width: 800px) and (max-width: 880px) {
  .man {
    display: none;
  }
  header .target {
    margin-left: 5px;
  }
  .searchW {
    margin-left: 0px;
  }
  .search-form {
    width: 250px;
  }
  .search_cat {
    left: 157px;
  }
}

header form {
  float: right;
  width: 450px;
  margin: 18px 1px 1px 1px;
}
.el-menu {
  list-style: none;
  position: relative;
  padding-left: 0;
  /*background-color: #2e2e2e;*/
  margin: -20px 0px 0px 0px;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
header {
  z-index: 999;
  width: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  /* height: 60px; */
  height: 70px;
  opacity: .7;
   min-width: 600px;
}
</style>
