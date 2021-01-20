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
        <!-- <div class="funcbtn-area">
            <div>
                <el-button icon="el-icon-finished" @click="submitFunc">提交</el-button>
            </div>
        </div> -->
        <!-- 表格区 -->
        <div class="table-area">

            <el-table
                ref="elTable"
                :data="tableData.records"
                style="width: 100%"
                border
                stripe
                height="calc(100vh - 148px)"
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
                                <span style="color: #67C23A;padding: 0px 10px;cursor: pointer;" @click="agreeData(scope.row)">同意</span>
                                <span style="color: #409EFF;padding: 0px 10px;cursor: pointer;" @click="rejectData(scope.row)">驳回</span>
                                <span style="color: #666666;padding: 0px 10px;cursor: pointer;" @click="checkData(scope.row)">查看</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else
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
    </div>
    
</template>
<script>
    // import { getData } from '@/api/approval';
    import Pagination from '@/components/common/Pagination';
    export default {
        name: "IndexExample",
        components: { Pagination },
        data() {
            return {
                serachform:{
                    user:'',
                    region:'',
                },
                tableData:{
                    total:100,
                    records:[
                        {title:'aaa',content:'bbb',status:'ccc'},{title:'aaa',content:'bbb',status:'ccc'},
                        {title:'aaa',content:'bbb',status:'ccc'},{title:'aaa',content:'bbb',status:'ccc'},
                        {title:'aaa',content:'bbb',status:'ccc'},{title:'aaa',content:'bbb',status:'ccc'},
                        {title:'aaa',content:'bbb',status:'ccc'},{title:'aaa',content:'bbb',status:'ccc'},
                    ],
                },
                page: {
                    current: 1,
                    size: 20
                },
                // 表头配置
                tableHead:[
                    {prop:'title',label:'标题',align:'center',minWidth:'100'},
                    {prop:'content',label:'内容',align:'center',minWidth:'200'},
                    {prop:'status',label:'状态',align:'center',minWidth:'100'},
                    {prop:'handle',label:'操作',align:'center',minWidth:'200'}
                ],
                multipleSelection:[],
            }
        },
        mounted() {
            // this.getTableData();
        },
        methods: {
            getTableData(){
                getData(this.serachform).then((res) => {

                })
            },
            searchFunc(){
                this.$message({
                    message: '搜索',
                    type: 'success'
                });
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
