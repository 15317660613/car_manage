<template>
  <div class="" >
    <el-dialog title="新增" width="750px" @close="clearFormData" v-if="dialogVisible" :visible.sync="dialogVisible">
        <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-dynamic">
                <el-form-item
                    prop="title"
                    label="标题">
                    <el-input v-model="form.title" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item
                    label="编辑">
                    <quill-editor
                        v-model="form.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
                <el-form-item 
                    prop="videoPath"
                    label="上传文件">
                    <el-upload
                        class="upload-demo"
                        :action="httpUrl"
                        name="files"
                        multiple
                        :limit="1"
                        accept=".txt,.XLS,.PPT,.XLSX,.PPTX,.doc,.pdf"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传文档文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="clearFormData">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
  </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor';
    import Quill from 'quill'; //引入编辑器
    import { questionnaireNewAdd } from '@/assets/api/questionnaire';
    import { fileDelete } from '@/assets/api/file';
    import config from "@/assets/js/config.js";
    const toolbarOptions = [
       ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
       ['blockquote', 'code-block'],     //引用，代码块
       [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
       [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
       [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
       [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
       [{ 'direction': 'rtl' }],             // 文本方向
       [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
       [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
       [{ 'font': [] }],     //字体
       [{ 'align': [] }],    //对齐方式
       ['clean'],    //清除字体样式
       ['image','video']    //上传图片、上传视频
    ];
    export default {
        name: "NewAddQuestionnaire",
        props:[],
        components: {quillEditor},
        data() {
            return {
                dialogVisible:false,
                form: {
                    title: '',
                    content:'',
                    videoPath:'',
                    videoFilePath:'',
                },
                editor: null,   // 富文本编辑器对象
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: {
                            container: toolbarOptions, // 工具栏
                        },
                    },
                    placeholder: '请输入内容...'
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题信息', trigger: 'blur' },
                    ],
                    videoPath: [
                        { required: true, message: '请上传文档文件', trigger: 'change' },
                    ],
                },
                fileList:[],
                httpUrl:config.API_CONFIG + "/upload/trainFile",
            };
        },
        mounted(){

        },
        beforeDestroy(){
            this.editor = null;
            delete this.editor;
        },
        methods:{
            // 默认执行的方法 设置dialog显示
            defaultfunc(){
                this.dialogVisible = true;
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        questionnaireNewAdd(this.form).then((res) => {
                            this.$emit("getTableData");
                            this.clearFormData();
                            return this.$message.success("操作成功");
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 关闭dialog弹窗
            clearFormData(){
                this.form.title = '';
                this.form.content = '';
                this.form.videoPath = '';
                this.form.videoFilePath = '';
                this.fileList = [];
                this.dialogVisible = false;
            },
            // 准备富文本编辑器
            onEditorReady (editor) {
    
            },
            // 富文本编辑器 失去焦点事件
            onEditorBlur (editor) {

            },
            // 富文本编辑器 获得焦点事件
            onEditorFocus (editor) {

            },
            // 富文本编辑器 内容改变事件
            onEditorChange (editor) {
                this.form.content = editor.html;
            },
            // 文件移除
            handleRemove(file, fileList) {
                let requestform = [];
                requestform.push(this.form.videoPath);
                fileDelete(requestform).then((res) => {
                    this.form.videoPath = '';
                    this.form.videoFilePath = '';
                    return this.$message.success("删除成功");
                });
            },
            // 上传成功
            handleSuccess(response, file, fileList){
                this.form.videoPath = response[0].videoPath;
                this.form.videoFilePath = response[0].videoFilePath;
            },
            // 上传时
            handleProgress(event, file, fileList){

            },
            // 文件移除之前
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 22px;
    }

</style>
