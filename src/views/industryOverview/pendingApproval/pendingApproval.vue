<template>
    <div class="page-container">
        <!-- 搜索区 -->
        <div class="search-area">
            <div style="display: flex;justify-content: space-between;">
                <div style="display: flex;justify-content: flex-start;">
                    <el-form :inline="true" :model="serachform" class="demo-form-inline">
                        <el-form-item label="条件一：">
                            <el-input v-model="serachform.user" placeholder="条件一"></el-input>
                        </el-form-item>
                        <el-form-item label="条件二：">
                            <el-select v-model="serachform.region" placeholder="条件二">
                                <el-option label="选项一" value="shanghai"></el-option>
                                <el-option label="选项二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="search-area-btn" style="display: flex;align-items: center;">
                    <el-button type="primary" @click="searchFunc">搜索</el-button>
                    <el-button  @click="clearFormData">重置</el-button>
                </div>
            </div>
        </div>
        <!-- 功能按钮区 -->
        <div class="funcbtn-area">
            <div>
                <el-button type="primary" icon="el-icon-plus" @click="newAddFunc">新增</el-button>
                <el-button type="danger" plain icon="el-icon-delete" @click="deleteFunc">删除</el-button>
                <el-button icon="el-icon-finished" @click="submitFunc">提交</el-button>
            </div>
            <div>
                <el-button icon="el-icon-upload" @click="uploadFunc">EXCEL上传</el-button>
                <el-button icon="el-icon-upload2" @click="exportFunc">导出</el-button>
                <el-button icon="el-icon-download" @click="downloadFunc">模板下载</el-button>
            </div>
        </div>
        <!-- 表格区 -->
        <div class="table-area">

            <el-table
                ref="elTable"
                :data="tableData.records"
                style="width: 100%"
                border
                stripe
                height="calc(100vh - 168px)"
                size="mini"
                header-row-class-name="tableHeaderStyle"
                :cell-style="{height:'35px',padding:'5px 0px'}"
                :header-cell-style="{background:'#f8f8f9'}"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column v-for="(item,index) in tableHead"
                    :prop="item.prop"
                    :label="item.label"
                    :align="item.align"
                    :min-width="item.minWidth"
                    >
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页区 -->
        <div class="sysPage">
            <pagination
                v-show="Number(tableData.total)>0"
                :total="Number(tableData.total)"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="getTableData()"
                />
        </div>
        <div class="component-container" >
            <newAddDialog ref="newAddDialog"></newAddDialog>
        </div>
    </div>
    
</template>
<script>
    import { getData } from '@/api/dataManager';
    import Pagination from '@/components/common/Pagination';
    // 新增dialog页面
    import newAddDialog from './dialogExample';
    export default {
        name: "IndexExample",
        components: { Pagination,newAddDialog },
        data() {
            return {
                serachform:{
                    user:'',
                    region:'',
                },
                tableData:{
                    total:100,
                    records:[
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                        {tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},{tit:'aaa',one:'bbb',two:'ccc',state:'ddd'},
                    ],
                },
                page: {
                    current: 1,
                    size: 20
                },
                // 表头配置
                tableHead:[
                    {prop:'tit',label:'标题',align:'center',minWidth:'100'},
                    {prop:'one',label:'类别一',align:'center',minWidth:'100'},
                    {prop:'two',label:'类别二',align:'center',minWidth:'250'},
                    {prop:'state',label:'当前状态',align:'center',minWidth:'100'}
                ],
                multipleSelection:[],
            }
        },
        mounted() {
            this.getTableData();
        },
        methods: {
            getTableData(){
                // getData(this.serachform).then((res) => {
                //     if (res.code === '200') {
                //         this.tableData = res.data
                //         this.tableData.total = parseInt(res.data.total)
                //         this.tableData.orders = [{ asc: false, column: 'ID' }]
                //         this.$nextTick(() => {
                //             this.$refs.elTable.doLayout()
                //         })
                //     } else {
                //         this.$message.error(data.msg)
                //     }
                // })
            },
            searchFunc(){
                this.$message({
                    message: '搜索',
                    type: 'success'
                });
            },
            // 新增
            newAddFunc(){
                this.$refs['newAddDialog'].defaultfunc();
            },
            // 删除
            deleteFunc(){
                this.$confirm('是否确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    // deleteComponent(ids).then(() => {
                    //     this.getLBJList();
                    //     return this.$message({
                    //         message: '删除成功',
                    //         type: 'success'
                    //     });
                    // })
                })
            },
            // 提交
            submitFunc(){

            },
            // 上传
            uploadFunc(){

            },
            // 导出
            exportFunc(){

            },
            // 下载
            downloadFunc(){

            },
            // 清空搜索条件
            clearFormData(){
                this.serachform.user = '';
                this.serachform.region = '';
            },
            // 表格勾选
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .sysPage .pagination-container{
        background:inherit; 
    }
</style>
