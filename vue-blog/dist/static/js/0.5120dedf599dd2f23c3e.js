webpackJsonp([0],{"6/Ij":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"timer_example",data:function(){return{count:0,search:"",show:"",timeout_timer:null,interval_timer:null}},methods:{testFunc:function(){this.count+=1}},mounted:function(){var e=this;this.interval_timer=setInterval(function(){setTimeout(e.testFunc,0)},1e3)},beforeDestroy:function(){clearInterval(this.interval_timer)},watch:{search:function(e,t){var n=this;clearTimeout(this.timeout_timer),this.timeout_timer=setTimeout(function(){n.show=n.search},500)}}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"timer_example"}},[n("el-input",{attrs:{id:"inputSearch",placeholder:"输入关键字搜索","suffix-icon":"el-icon-search",size:"mini"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v("\n  "+e._s(e.show)+"--"+e._s(e.count)+"\n")],1)},staticRenderFns:[]};var s=n("VU/8")(i,r,!1,function(e){n("fqXf")},"data-v-1542a5dc",null);t.default=s.exports},fqXf:function(e,t){}});