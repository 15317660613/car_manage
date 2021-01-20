<template>
  <div class="" >
    <el-dialog title="新增" width="700px" @close="clearFormData" :visible.sync="newAddDialogVisible">
        <div>
            <el-form :model="newAddForm" :rules="rules" ref="newAddForm" label-width="150px" class="demo-dynamic">
                <el-form-item
                    prop="email"
                    label="邮箱">
                    <el-input v-model="newAddForm.email" style="width:250px;"></el-input>
                </el-form-item>
                <el-form-item
                    prop="msg"
                    label="信息">
                    <el-input v-model="newAddForm.msg" style="width:250px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @focus="onEditorFocus($event)"
                        @blur="onEditorBlur($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('newAddForm')">提交</el-button>
                    <el-button @click="resetForm('newAddForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>

  </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
    import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式 
    import * as Quill from 'quill'; // 富文本基于quill
    export default {
        name: "NewAddDialog",
        props:[],
        components: {quillEditor},
        data() {
            return {
                newAddDialogVisible:false,
                newAddForm: {
                    email: '',
                    msg:'',
                },
                editor: null,   // 富文本编辑器对象
                content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: '#toolbar'
                    },
                    theme: 'snow',
                    placeholder: '请输入正文'
                },
                rules: {
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { pattern: this.$regexp.identity,message: this.$regexp.identityMessage,trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    msg: [
                        { required: true, message: '请输入信息', trigger: 'blur' },
                    ],
                  }
            };
        },
        mounted(){
            this.editor = this.$refs.myQuillEditor.quill;
        },
        beforeDestroy(){
            this.editor = null;
            delete this.editor;
        },
        methods:{
            defaultfunc(){
                this.newAddDialogVisible = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            clearFormData(){
                this.newAddDialogVisible = false;
            },
            // 准备富文本编辑器
            onEditorReady (editor) {
                console.log('1');
            },
            // 富文本编辑器 失去焦点事件
            onEditorBlur (editor) {
                console.log('2');
            },
            // 富文本编辑器 获得焦点事件
            onEditorFocus (editor) {
                console.log('3');
            },
            // 富文本编辑器 内容改变事件
            onEditorChange (editor) {
                console.log('4');
            },
        },
    }
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 22px;
    }
</style>
