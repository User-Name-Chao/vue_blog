<template>
  <div class="markdown">
    <el-card class="box-card">
      <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="7">
            <el-button type="text" size="mini">标题-{{ test_store_name }}</el-button>
            <el-input v-model="form.title" placeholder="标题"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button type="text" size="mini">文章类型</el-button>
            <el-button type="primary" size="mini" @click="open_article_kind_box">创建类型</el-button>
            <el-select @change="selectChanged" v-model="form.kind" placeholder="文章类型" style="width: 100%">
              <el-option v-for="item in article_kinds" :key="item.id" :value="item.id" :label="item.kind_name"/>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" size="mini" @click="dialogVisible = true">选择标签</el-button>
            <el-input v-model="form.label_name" placeholder="标签"></el-input>
            <el-input type="hidden" v-model="form.labelid"></el-input>
          </el-col>

          <el-col :span="7">
            <el-button type="text" size="mini">封面</el-button>
              <el-card id="upload_img_card" class="box-card">
                <el-upload class="upload-demo"
                           action=""
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :before-remove="beforeRemove"
                           multiple
                           :limit="1"
                           :on-exceed="handleExceed"
                           :http-request="handleSave"
                           :before-upload="beforeImageUpload"
                           accept="image/png,image/gif,image/jpg,image/jpeg"
                           :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/jpeg文件，且不超过2M</div>
                </el-upload>
              </el-card>
          </el-col>
          <el-col :span="7">
              <el-button type="text" size="mini">封面预览</el-button>
              <div class="demo-image__placeholder">
                <div class="block">
                  <img class="image" :src="src"/>
                </div>
              </div>
          </el-col>

          <el-col :span="10">
            <el-button type="text" size="mini">简介</el-button>
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 9}"
                placeholder="请输入内容"
                v-model="form.desc">
              </el-input>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        title="选择标签"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="dialogClose">
        <el-checkbox-group :min="1" :max="3" v-model="checkedLabels" @change="handleCheckedLabelsChange">
          <el-checkbox v-for="label in labels" :label="label.id+','+label.label_name" :key="label.id">{{label.label_name}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible=false">确 定</el-button>-->
          <el-button type="text" @click="open_label_box">创建新标签</el-button>
        </span>
      </el-dialog>
      <mavon-editor id="mavon_markdown"
                    :ishljs="true" :toolbars="markdownOption"
                    v-model="content"
                    ref="md"
                    @imgAdd="imgAdd" @change="change" @save="saveBlog"/>
    </el-card>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import $ from "jquery" //在需要使用的页面中
  export default {
    name: "mavon_editor",
    props: [],
    components: {
      mavonEditor,
    },
    data() {
      return {
        test_store_name:"",
        dialogVisible: false,
        upload_img_url: this.$axios.defaults.baseURL + 'blog/upload_img/',
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        fileList: [],
        article_kinds: [],
        checkedLabels: [],  // 当前选中标签
        labels:[],  // 所有可选标签
        form: {
          title: '',
          labelid: '',
          label_name: '',
          image: '',
          kind: '',
          desc: '',
          article_id: 0,
        },
        content: '',
        html: '',
        configs: {},
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          imagelink: true, // 图片链接
          link: true, // 链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模
        },
      }
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handlePreview(file) {
        // console.log(file);
      },
      beforeImageUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSave(file) {
        // console.log("*****", file);
        var formdata = new FormData()
        formdata.append('img_file', file.file)
        this.$axios({
          // 请求地址
          url: '/vue_blog/upload_img/',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((data) => {
          // console.log("---------------------", data);
          this.src = data.data["img_uri"]
          this.form.image = data.data["img_uri"]
        })
      },
      // 将图片上传到服务器，返回地址替换到md中
      imgAdd(pos, $file) {
        // $file 为文件
        // pos 为插入图片索引位置，这里把图片路径放在一个list中也就是img_file
        // console.log($file)
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('img_file', $file)
        // this.img_file[pos] = $file
        this.$axios({
          // 请求地址
          url: '/vue_blog/upload_img/',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((data) => {
          // console.log(JSON.stringify(url))
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           * 3. 由于vue运行访问的路径只能在static下，so，我就把图片保存到它这里了
           */
          this.$refs.md.$img2Url(pos, data.data["img_uri"])
        })
      },
      // 所有操作都会被解析重新渲染
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render;
        this.content = value;
      },
      saveBlog(value, render) {
        //构造formData对象
        var formData = new FormData();
        formData.append("blog_content", value);
        formData.append("blog_args", JSON.stringify(this.form)); // JSON.parse(jsonString);
        try {
          //调用保存文章接口
          this.$axios({
            method: "post",
            data: formData,
            url: "/vue_blog/save_blog/",
          }).then(
            res => {
              // console.log("==========1====", res);
              if (res.data.code == 200) {
                this.$message.success('提交成功！');
              } else {
                this.$message.warning(res.data.message);
              }
            },
            err => {
              console.log(err);
            }
          );
        } catch ({message: msg}) {
          // _this.$message.warning(msg);
        }
      },

      selectChanged(value) {
        // console.log("------***------", value);
      },

      getarticlekind() {
        // get请求
        this.$axios({
          method: "get",
          url: "/vue_blog/get_article_kind/",
          params: {}
        }).then(
          res => {
            // console.log("获取文章分类++++", res.data)
            this.article_kinds = res.data.article_kinds //
          },
          err => {
            console.log(err);
          }
        );
      },

      getarticlelabels() {
        // get请求
        this.$axios({
          method: "get",
          url: "/vue_blog/get_label_list/",
          params: {}
        }).then(
          res => {
            // console.log("获取文章标签++++", res.data)
            this.labels = res.data.labels //
          },
          err => {
            console.log(err);
          }
        );
      },

      getarticle() {
        // get请求
        this.$axios({
          method: "get",
          url: "/vue_blog/get_article_detail/",
          params: {
            id: this.form.article_id,
          }
        }).then(
          res => {
            // console.log("编辑操作获取文章++++", res)
            this.form.title = res.data.data.title //
            this.form.image = res.data.data.image //
            this.src = res.data.data.image //
            this.form.kind = res.data.data.type //
            this.form.desc = res.data.data.summary //
            this.form.labelid = res.data.data.label //
            this.form.label_name = res.data.data.label_name //
            this.content = res.data.data.htmlContents //
            this.checkedLabels = res.data.data.checkedlabel
          },
          err => {
            console.log(err);
          }
        );
      },

      // 为了计算距离顶部的高度，当高度大于285使Markdown工具栏固定位置不随滚动显示，否则恢复正常显示
      scrollToTop() {
        let that = this;
        let scrollTop = window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        that.scrollTop = scrollTop;
        if (that.scrollTop > 285) {
          $('.markdown-body').children().eq(0).css({"position":"fixed","left":"0","top":"0"})
        } else {
          $('.markdown-body').children().eq(0).css({"position":"absolute","left":"0","top":"0"})
        }
      },

      dialogClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {//确认关闭弹窗时执行
            // console.log("*********1******")
            var labelidlist = new Array()
            var label_namelist = new Array()
            $.each(this.checkedLabels, function (i, n) {
              var labelinfo = n.split(",")
              labelidlist.push(parseInt(labelinfo[0]))
              label_namelist.push(labelinfo[1])
            })
            this.form.labelid=JSON.stringify(labelidlist)
            this.form.label_name=label_namelist.join(",")
            done()  //关闭弹窗
          })
          .catch(_ => {//取消关闭弹窗时执行
            // console.log("*********2******")
          });
      },
      handleCheckedLabelsChange(value) {
        // console.log(">>>>>>>>>>>>>>>>", value)
        this.checkedLabels = value;
      },

      create_label(value) {
        var formdata = new FormData()
        formdata.append('label', value)
        this.$axios({
          method: "post",
          url: "/vue_blog/create_label/",
          data:formdata,
          params: {}
        }).then(
          res => {
            // console.log("创建标签成功后再次加载当前所有标签===", res)
            this.getarticlelabels()
          },
          err => {
            console.log(err);
          }
        )
      },

      open_label_box() {
        this.$prompt('请输新标签', '创建标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          /*inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'*/
          inputPattern: /[\w]/,
          inputErrorMessage: ''
        }).then(({ value }) => {
          /*this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value,
          });*/
          this.create_label(value)  //输入内容校验通过后调用创建方法
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

      create_article_kind(value) {
        var formdata = new FormData()
        formdata.append('article_kind', value)
        this.$axios({
          method: "post",
          url: "/vue_blog/create_article_kind/",
          data:formdata,
          params: {}
        }).then(
          res => {
            // console.log("创建标签成功后再次加载当前所有标签===", res)
            this.getarticlekind()
          },
          err => {
            console.log(err);
          }
        )
      },

      open_article_kind_box() {
        this.$prompt('请输新类型', '创建类型', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w]/,
          inputErrorMessage: ''
        }).then(({ value }) => {
          this.create_article_kind(value)  //输入内容校验通过后调用创建方法
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
    },
    mounted() {
      console.log(">>>设置store_name>>1>", this.$store.state.name)
      console.log(">>>设置store_name>>2>", this.$store.getters.getName)
      this.test_store_name = this.$store.getters.getName
      $('.markdown-body').children().eq(0).css({"position":"absolute","left":"0","top":"0","margin-bottom": "-43px"})
      window.addEventListener("scroll", this.scrollToTop);  //监听滚动
      if (this.$route.params.id) {
        // this.form.article_id = this.$route.query.id  //<router-link :to="{ path: '/mavon_editor', query: {id: 4}}">router2</router-link>
        this.form.article_id = this.$route.params.id  // <router-link :to="{ name: 'mavon_editor', params: {id: 4}}">router3</router-link>
        this.getarticle()
      }
      this.getarticlekind()
      this.getarticlelabels()
    },

    destroyed() {
      window.removeEventListener("scroll", this.scrollToTop);  //监听滚动
    },
  }
</script>

<style lang="scss">
  .v-note-wrapper .v-note-panel {
    top: 43px;
  }

  #mavon_markdown {
    min-height: 1400px;
    width: 100%;
  }

  .demo-form-inline {
    padding-bottom: 0
  }

  .upload-demo {
    background-color: white
  }

  #upload_img_card {
    height: 130px;
    line-height: 13px;
    overflow: auto;
  }

  .image {
    max-height: 120px;
  }

  .el-card {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    width: 80%;
    margin-left: 10%;
  }
</style>
