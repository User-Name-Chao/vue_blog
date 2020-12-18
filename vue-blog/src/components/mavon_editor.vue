<template>
  <el-row :gutter="24">
    <el-col :span="18" :offset="3">
      <div class="markdown">
        <div class="container">
          <el-card class="box-card">
            <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
              <el-container>
                <el-main width="70%">
                  <el-row :gutter="24">
                    <el-col :span="11">
                      <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="标题"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="文章类型">
                        <el-select @change="selectChanged" v-model="form.kind" placeholder="文章类型">
                            <el-option v-for="item in article_kinds" :key="item.id" :value="item.id" :label="item.kind_name" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="15">
                      <el-form-item label="封面">
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
                                     accept="image/png,image/gif,image/jpg,image/jpeg"
                                     :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </el-card>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <div class="demo-image__placeholder">
                        <div class="block">
                          <img class="picture" :src="src" />
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-main>
                <el-aside width="30%">
                  <el-row :gutter="24">
                    <el-col :span="24">
                      <el-form-item label="简介">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 9, maxRows: 9}"
                          placeholder="请输入内容"
                          v-model="form.desc">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-aside>
              </el-container>
            </el-form>
          </el-card>
          <mavon-editor id="mavon_markdown" :ishljs="true" :toolbars="markdownOption" v-model="content" ref="md" @imgAdd="imgAdd"
                        @change="change" @save="saveBlog" style="min-height: 750px;width: 100%;margin-bottom: 10px"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "mavon_editor",
    props: [],
    components: {
      mavonEditor,
    },
    data() {
      return {
        upload_img_url: this.$axios.defaults.baseURL + 'blog/upload_img/',
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        fileList: [],
        article_kinds:[],
        form: {
          title: '',
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
        console.log(file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSave(file) {
        console.log("*****", file);
        var formdata = new FormData()
        formdata.append('img_file', file.file)
        this.$axios({
          // 请求地址
          url: '/blog/upload_img/',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((data) => {
          console.log("---------------------", data);
          this.src = data.data["img_uri"]
          this.form.image = data.data["img_uri"]
        })
      },
      // 将图片上传到服务器，返回地址替换到md中
      imgAdd(pos, $file) {
        // $file 为文件
        // pos 为插入图片索引位置，这里把图片路径放在一个list中也就是img_file
        console.log($file)
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('img_file', $file)
        // this.img_file[pos] = $file
        this.$axios({
          // 请求地址
          url: '/blog/upload_img/',
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
            url: "/blog/save_blog/",
          }).then(
            res => {
              console.log("==========1====", res);
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
        console.log("------***------", value);
      },

      getarticlekind() {
        // get请求
        this.$axios({
          method: "get",
          url: "/blog/get_article_kind/",
          params: {}
        }).then(
          res => {
            console.log("获取文章分类++++", res.data)
            this.article_kinds = res.data.article_kinds //
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
          url: "/blog/get_article_detail/",
          params: {
            id: this.form.article_id,
          }
        }).then(
          res => {
            console.log("编辑操作获取文章++++", res)
            this.form.title = res.data.data.title //
            this.form.image = res.data.data.image //
            this.src = res.data.data.image //
            this.form.kind = res.data.data.type //
            this.form.desc = res.data.data.summary //
            this.content = res.data.data.htmlContents //
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    mounted() {
      if (this.$route.params.id) {
        // this.form.article_id = this.$route.query.id  //<router-link :to="{ path: '/mavon_editor', query: {id: 4}}">router2</router-link>
        this.form.article_id = this.$route.params.id  // <router-link :to="{ name: 'mavon_editor', params: {id: 4}}">router3</router-link>
        this.getarticle()
      }
      this.getarticlekind()
    },
  }
</script>

<style scoped>
  /*markdown工具栏吸顶*/
  .markdown-body>:first-child {
    width: 80%;
    height: 50px;
    position: fixed;
    top: 80px;
    left: 10%;
    align-content: center;
    border-radius: 4px;
    background: rgba(255, 255, 255, .5);
  }
  #mavon_markdown>:first-child(1) {
    background-color: #8c939d;
  }

  .demo-form-inline {
    padding-bottom: 0
  }

  .upload-demo {
    background-color: white
  }

  .container :nth-child(2) :nth-child(2) :nth-child(2) :nth-child(1) {
    border-bottom-right-radius: 4px;
  }

  .box-card {
    border-radius:0px;
    height: 270px;
  }

  #upload_img_card {
    height: 130px;
    line-height: 13px;
    overflow: auto;
  }

  .el-main {
    overflow: hidden;
    padding: 0;
  }

  .el-aside {
    overflow: hidden;
  }
</style>
