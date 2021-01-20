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
                <el-button type="danger" plain icon="el-icon-delete" @click="deleteMore">删除</el-button>
                <el-button icon="el-icon-finished" @click="submitFunc">提交</el-button>
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
                height="calc(100vh - 188px)"
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
                <template v-for="(item,index) in tableHead" >
                    <el-table-column 
                        v-if="item.prop == 'status'"
                        :prop="item.prop"
                        :label="item.label"
                        :align="item.align"
                        :min-width="item.minWidth">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==0" style="color: #666666;">草稿</span>
                            <span v-if="scope.row.status==1" style="color: #409EFF;">审批中</span>
                            <span v-if="scope.row.status==2" style="color: #E6A23C;">待审批</span>
                            <span v-if="scope.row.status==3" style="color: #F56C6C;">拒绝</span>
                            <span v-if="scope.row.status==4" style="color: #67C23A;">发布</span>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="item.prop == 'handle'"
                        :prop="item.prop"
                        :label="item.label"
                        :align="item.align"
                        :min-width="item.minWidth">
                        <template slot-scope="scope">
                            <div>
                                <span style="color: #67C23A;padding: 0px 10px;cursor: pointer;" @click="submitData(scope.row)">提交</span>
                                <span style="color: #409EFF;padding: 0px 10px;cursor: pointer;" @click="editData(scope.row)">编辑</span>
                                <span style="color: #666666;padding: 0px 10px;cursor: pointer;" @click="checkData(scope.row)">查看</span>
                                <span style="color: #F56C6C;padding: 0px 10px;cursor: pointer;" @click="deleteData(scope.row)">删除</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else
                        show-overflow-tooltip
                        :prop="item.prop"
                        :label="item.label"
                        :align="item.align"
                        :min-width="item.minWidth"
                        >
                    </el-table-column>
                </template>
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
            <newAdd @getTableData="getTableData" ref="newAddDialog"></newAdd>
        </div>
        <div class="component-container" >
            <editPage @getTableData="getTableData" ref="editPageDialog"></editPage>
        </div>
        <div class="component-container" >
            <checkPage ref="checkPageDialog"></checkPage>
        </div>
    </div>
    
</template>
<script>
    import Pagination from '@/components/common/Pagination';
    import { approvalSubmitApproval } from '@/assets/api/approval';
    import { trainPage,trainDelete } from '@/assets/api/train';
    // 新增页面
    import newAdd from './newAdd';
    // 新增页面
    import editPage from './edit';
    // 新增页面
    import checkPage from './check';
    export default {
        name: "IndexTrain",
        components: { Pagination,newAdd,editPage,checkPage },
        data() {
            return {
                serachform:{
                    user:'',
                    region:'',
                },
                tableData:{
                    total:0,
                    records:[],
                },
                page: {
                    current: 1,
                    size: 20
                },
                // 表头配置
                tableHead:[
                    {prop:'title',label:'标题',align:'center',minWidth:'150'},
                    {prop:'content',label:'内容',align:'center',minWidth:'200'},
                    {prop:'status',label:'状态',align:'center',minWidth:'100'},
                    {prop:'handle',label:'操作',align:'center',minWidth:'200'}
                ],
                multipleSelection:[],
            }
        },
        mounted() {
            this.getTableData();
        },
        methods: {
            // 默认执行的请求表格方法
            getTableData(){
                // let requestform = JSON.parse(JSON.stringify(this.serachform));
                let requestform = {
                    current:this.page.current,
                    size:this.page.size,
                    orderByDesc:'created_time',
                    entity:{
                        delFlag:0
                    },
                };
                trainPage(requestform).then((res) => {
                    this.tableData.total = res.data.total;
                    this.tableData.records = res.data.records;
                })
            },
            // 搜索
            searchFunc(){
                this.getTableData();
            },
            
            // 批量删除
            deleteMore(){
                if (this.multipleSelection.length <= 0) {
                    return this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].status != '0') {
                        return this.$message({
                            message: '选中数据的包含非草稿状态，请重新选择',
                            type: 'warning'
                        });
                    }
                    ids.push(this.multipleSelection[i].id);
                }
                this.$confirm('是否确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    trainDelete(ids).then(() => {
                        this.getTableData();
                        return this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    })
                })
            },
            // 单独删除
            deleteData(row){
                if(row.status!='0'){
                    return this.$message({
                        message: '非草稿状态不能删除!',
                        type: 'warning'
                    });
                };
                let ids = [];
                ids.push(row.id);
                this.$confirm('是否确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    trainDelete(ids).then(() => {
                        this.getTableData();
                        return this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    })
                })
            },
            // 批量提交
            submitFunc(){
                if (this.multipleSelection.length <= 0) {
                    return this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].status === '3' || this.multipleSelection[i].status == '1') {
                        return this.$message({
                            message: '选中数据中包含已提交或审批通过的数据，请重新选择',
                            type: 'warning'
                        });
                    }
                    ids.push(this.multipleSelection[i].id);
                };
                let requestform = {
                    approvalModular:'TT_TRAIN',
                    ids:ids,
                };
                this.$confirm('确认提交审批？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    approvalSubmitApproval(requestform).then(() => {
                        this.getTableData();
                        return this.$message({
                            message: '提交审批成功！',
                            type: 'success'
                        });
                    })
                })
            },
            // 单独提交
            submitData(row){
                if(row.status=='1'){
                    return this.$message({
                        message: '审批中的数据不能删除,请重新选择!',
                        type: 'warning'
                    });
                };
                let ids = [];
                ids.push(row.id);
                let requestform = {
                    approvalModular:'TT_TRAIN',
                    ids:ids,
                };
                this.$confirm('确认提交审批？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    approvalSubmitApproval(requestform).then(() => {
                        this.getTableData();
                        return this.$message({
                            message: '提交审批成功！',
                            type: 'success'
                        });
                    })
                })
            },
            
            // 新增
            newAddFunc(){
                this.$refs['newAddDialog'].defaultfunc();
            },
            // 编辑
            editData(row){
                this.$refs['editPageDialog'].defaultfunc(row.id);
            },
            // 查看
            checkData(row){
                this.$refs['checkPageDialog'].defaultfunc(row.id);
            },
            // 清空搜索条件
            clearFormData(){
                this.serachform.user = '';
                this.serachform.region = '';
            },
            // 表格勾选
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .sysPage .pagination-container{
        background:inherit; 
    }
</style>
