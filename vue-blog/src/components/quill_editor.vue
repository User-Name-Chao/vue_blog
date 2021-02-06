<template>
  <div>
<!--    <el-card style="height: 610px;">-->
      <quill-editor style="background-color: white;min-height: 900px"
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)">
        <!-- 自定义toolar -->
        <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold"
                  title="加粗">Bold
          </button>
          <button class="ql-italic"
                  title="斜体">Italic
          </button>
          <button class="ql-underline"
                  title="下划线">underline
          </button>
          <button class="ql-strike"
                  title="删除线">strike
          </button>
          <button class="ql-blockquote"
                  title="引用"></button>
          <button class="ql-code-block"
                  title="代码"></button>
          <button class="ql-header"
                  value="1"
                  title="标题1"></button>
          <button class="ql-header"
                  value="2"
                  title="标题2"></button>
          <!--Add list -->
          <button class="ql-list"
                  value="ordered"
                  title="有序列表"></button>
          <button class="ql-list"
                  value="bullet"
                  title="无序列表"></button>
          <!-- Add font size dropdown -->
          <select class="ql-header"
                  title="段落格式">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
          <select class="ql-size"
                  title="字体大小">
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px"
                    selected>16px
            </option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select class="ql-font"
                  title="字体">
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="Microsoft-YaHei">微软雅黑</option>
            <option value="KaiTi">楷体</option>
            <option value="FangSong">仿宋</option>
            <option value="Arial">Arial</option>

          </select>
          <!-- Add subscript and superscript buttons -->
          <select class="ql-color"
                  value="color"
                  title="字体颜色"></select>
          <select class="ql-background"
                  value="background"
                  title="背景颜色"></select>
          <select class="ql-align"
                  value="align"
                  title="对齐"></select>
          <button class="ql-clean"
                  title="还原"></button>
          <button class="ql-image"
                  title="图片"></button>
          <button class="ql-video"
                  title="视频链接"></button>
           <!--<button class="ql-video"
                  title="视频链接"
                  @click="spClick"></button> 可以直接添加一个点击事件重写原有操作-->
          <!-- 也可以新添加自己定义的新功能按钮 -->
          <button id="custom-button"
                  @click.prevent="fnOpenUploadVideo('video','添加视频')"
                  title="视频">
            <i class="el-icon-film"></i>
          </button>
          <!--<button id="custom-button"
                  @click.prevent="fnOpenUploadVideo('audio','添加音频')"
                  title="音频">
            <i class="el-icon-headset"></i>
          </button>-->
        </div>
      </quill-editor>
<!--    </el-card>-->
    <el-dialog append-to-body
               :title="title"
               width="50%"
               :visible.sync="dialogFnOpenUpload"
               :close-on-click-modal="false">
      <el-upload
        class="upload-demo"
        drag
        name="video_file"
        action="http://39.98.139.205:81/blog/upload_video/"
        :on-success="fnUploadSucess"
        :before-upload="beforeVideoUpload"
        accept="mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传.mp4文件，且不超过10M</div>
      </el-upload>
      <!--<el-upload
        class="upload-demo"
        drag
        name="video_file"
        action="http://127.0.0.1:8081/blog/upload_video/"
        :on-success="fnUploadSucess"
        :before-upload="beforeVideoUpload"
        accept="mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传.mp4文件，且不超过10M</div>
      </el-upload>-->
    </el-dialog>
  </div>
</template>

<script>
  import BMF from 'browser-md5-file'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {Quill, quillEditor} from 'vue-quill-editor'
  // 图片可收缩
  import {ImageDrop} from 'quill-image-drop-module'
  import ImageResize from 'quill-image-resize-module'

  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/imageResize', ImageResize)
  import quillConfig from '../assets/js/quill-config.js'

  const bmf = new BMF()

  const uploadConfig = {
    fileRead: '', // 图片读取地址
    action: '',  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'video_file',  // 必填参数 文件的参数名
    size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
  }

  function handle (file, callback) {
    bmf.md5(
      file,
      (err, md5) => {
        callback(md5)
      }
    )
  }

  // 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
  Quill.register(Size, true)

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)

  export default {
    name: "quill_editor",
    components: {
      quillEditor
    },
    data() {
      return {
        content: '',
        editorOption: quillConfig,
        uploadType: '',
        title: '',
        dialogFnOpenUpload: false
      }
    },
    methods: {
      onEditorBlur(quill) {//失去焦点事件
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {//获得焦点事件
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({quill, html, text}) {//内容改变事件
        console.log('editor change!', html, text)
        this.content = html
      },

      beforeVideoUpload(file) {
        if (this.uploadType === 'video') {
          this.type = file.type
          const isJPG = file.type === 'video/mp4'
          if (!isJPG) {
            this.$message.error('上传视频只能是 mp4 格式!')
          }
          return isJPG
        } else {
          this.type = file.type
          const isJPG = file.type === 'audio/mp3'
          if (!isJPG) {
            this.$message.error('上传音频只能是 mp3 格式!')
          }
          return isJPG
        }
      },

      spClick () {
        setTimeout(() => {
          let qlEditing = document.getElementsByClassName('ql-editing')
          if (qlEditing) {
            qlEditing[0].style.left = null
            qlEditing[0].style.right = '4px'
            qlEditing[0].style.top = '-6px'
          }
        }, 10)
      },

      fnOpenUploadVideo(type, title) {
        this.uploadType = type
        // this.accept = config.accept.video
        this.title = title
        this.dialogFnOpenUpload = true
      },
      fnUploadSucess(res) {
        console.log("????????", res)
        this.editor.focus()
        // let url = uploadConfig.fileRead + res.model.data.id
        let url = res.video_uri
        let length = this.editor.getSelection().index
        this.editor.insertEmbed(length, this.uploadType, url)
        this.editor.setSelection(length + 1)
        this.dialogFnOpenUpload = false
      }
    },

    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style lang="scss">
  /*.quill-editor{*/
  /*  width: 800px;*/
  /*}*/
  /*.ql-editor {*/
  /*  height: 400px;*/
  /*}*/
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }
</style>
