<template>
  <div class="markdown">
    <div class="container">
      <el-card class="box-card">
        <el-form :inline="true" :model="form" class="demo-form-inline" style="padding-bottom: 0">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="form.kind" placeholder="活动区域">
              <el-option label="一" value="1"></el-option>
              <el-option label="二" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面">
            <el-card class="box-card">
              <el-upload style="background-color: white"
                         class="upload-demo"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-card>
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="请输入内容"
              v-model="form.desc">
            </el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <mavon-editor :ishljs="true" :toolbars="markdownOption" v-model="content" ref="md" @imgAdd="imgAdd"
                    @change="change" @save="save" style="min-height: 850px;width: 100%"/>
    </div>
  </div>
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
        fileList: [],
        form: {
          title: '',
          image: '',
          kind: '',
          desc: ''
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
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
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
      },
      save(value, render) {
        console.log("----", this.content);
        console.log("====", this.html);
        this.$message.success('提交成功，已打印至控制台！');
        //构造formData对象
        var formData = new FormData();
        formData.append("blog_content", this.html);
        this.saveBlog(formData)
      },
      saveBlog(formData) {
        try {
          //调用保存文章接口
          this.$axios({
            method: "post",
            data: formData,
            url: "/blog/save_blog/",
          }).then(
            res => {
              console.log("==========1====", res);
            },
            err => {
              console.log(err);
            }
          );
        } catch ({message: msg}) {
          // _this.$message.warning(msg);
        }
      },
    },
    mounted() {

    },
  }
</script>

<style scoped>
  .box-card {
    padding: -20px -20px -20px -20px;
    margin-bottom: 10px
  }
</style>
