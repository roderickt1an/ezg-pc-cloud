<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                <Row :gutter="24">
                                    <Col span="6">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyName" size="small" style="width:158px"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="执行人：" prop="date">
                                            <Input v-model="formValidateSearch.creatorName"  size="small" style="width:158px"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="任务结果：" prop="customername">
                                            <Select v-model="formValidateSearch.mission" size="small" style="width:158px">
                                                <Option v-for="item in missionList" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                     <Col span="6">
                                        <FormItem label="执行时间期间：" prop="paytime">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:158px" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="24">
                                   
                                    <Col span="6">
                                        <FormItem label="完结时间期间：" prop="paytime">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.endDate" style="width:158px" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                      <FormItem>
                                        &nbsp;
                                      </FormItem>
                                    </Col>
                                    <Col span="6">
                                      <FormItem>
                                        &nbsp;
                                      </FormItem>
                                    </Col>
                                    <Col span="6">
                                    <FormItem>
                                        <Button type="primary" size="small" @click="Search">搜索</Button>
                                        <Button type="ghost" size="small" @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                    </Col>
                                </Row>
                                
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <finished-detail></finished-detail>
        <field-detail></field-detail>
    </div>
</template>

<script>
    import {DateFormat} from "../../../libs/utils";
    import {FULLDateFormat} from "../../../libs/utils";
    import finishedDetail from './finishedDetail'
    import fieldDetail from './fieldDetail'
    export default {
        name: "finished",
        components:{
            finishedDetail,
            fieldDetail
        },
        data(){
            return{
                loading:false,
                total:0,
                page:1,
                data:[],
                taskKind:[],
                missionList:[{"typecode":"Completed","typename":"成功"},{"typecode":"Failed","typename":"失败"}],
                taskKind_map:new Map(),
                taskStage:[],
                taskStage_map:new Map(),
                search_model: "1",
                formValidateSearch: {
                    ordercode: "",
                    companyName: "",
                    creatorName: "",
                    customertel: "",
                    payDir: "",
                    mission:"",
                    date: [],
                    endDate:[],
                    crealname: "",
                    frealname: "",
                    paytime: [],
                    endtime:[],
                    customerCreateTime: []
                },
                header:[
                    {
                        title: '公司名称',
                        key: 'companyName',
                        minWidth: 240,
                    },
                    {
                        title: '任务',
                        key: 'taskName',
                        minWidth: 140,
                    },
                    {
                        title: '服务内容',
                        minWidth: 295,
                        render: (h, params) => {
                            if(params.row.taskKindName==='会计外勤' || params.row.taskKindName==='会计到家') {
                                return h('div', [
                                    h('div', {},params.row.productName)
                                ])
                            } else {
                                return h('div', [
                                    h('div', {},params.row.legName)
                                ])
                            }
                        }
                    },
                    {
                        title: '任务结果',
                        key: 'mission_name',
                        minWidth: 140,
                    },
                    {
                        title: '执行人',
                        key: 'executorName',
                        minWidth: 140,
                    },
                    {
                        title: '计划执行时间',
                        key: 'planDate',
                        minWidth: 180,
                    },
                    {
                        title: '任务类型',
                        minWidth: 140,
                        render: (h, params) => {
                            if(params.row.taskKindName=='代账外勤') {
                                return h('div', [
                                    h('div', {},params.row.legType)
                                ])
                            } else {
                                return h('div', [
                                    h('div', {},params.row.taskKindName)
                                ])
                            }
                        }
                    },

                    {
                        title: '完结时间',
                        key: 'actualEndDate',
                        minWidth: 180,
                    },
                    {
                        title: '操作',
                        key: 'expect_date',
                        fixed: 'right',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params)
                                            this.show(params)
                                        }
                                    }
                                }, '[查看]'),
                            ]);
                        }
                    },
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            Search(){
                this.page = 1
                this.get_data()
            },
            handleReset(){
                this.$refs["formValidateSearch"].resetFields()
                this.formValidateSearch.date = []
                this.formValidateSearch.companyName=null
                this.formValidateSearch.creatorName=null
                this.formValidateSearch.customertel=null
                this.formValidateSearch.mission = null
                this.formValidateSearch.endDate=[]
                this.get_data()
            },
            show(p){
                this.$bus.emit("SHOW_FINISHED_DETAILS",p)
            },
            show_field_detail(p){
                this.$bus.emit("SHOW_FIELD_DETAIL",p)
            },
            get_data(){
                let _self = this
                let url =`api/task/getLegWorklist`
                _self.loading = true
                let config = {
                    params: {
                        task_stage:"tesFinished",
                        accountKind:"accountKind",
                        page:_self.page,
                        pageSize:_self.pageSize,
                        companyName:_self.formValidateSearch.companyName,
                        executor_name:_self.formValidateSearch.creatorName,
                        customerTel:_self.formValidateSearch.customertel,
                        mission:_self.formValidateSearch.mission,
                        bplan_date:DateFormat(_self.formValidateSearch.date[0]),
                        eplan_date:DateFormat(_self.formValidateSearch.date[1]),
                        bend_date:DateFormat(_self.formValidateSearch.endDate[0]),
                        eend_date:DateFormat(_self.formValidateSearch.endDate[1])
                    }
                }
                function success(res){
                    console.log(res.data.data.rows)
                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    for(let i = 0; i < _self.data.length; i++){
                        //     _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        _self.data[i].taskKind = _self.taskKind_map.get(_self.data[i].taskKind)
                        _self.data[i].taskStage = _self.taskStage_map.get(_self.data[i].taskStage)
                        if (_self.data[i].legType=='A'){
                            _self.data[i].legType = 'A类外勤'
                        }
                        if (_self.data[i].legType=='B'){
                            _self.data[i].legType = 'B类外勤'
                        }
                        //     _self.data[i].task_place = _self.taskPlace_map.get(_self.data[i].task_place)
                        //     if (_self.data[i].apply_status==="tesFinished") {
                        //         _self.data[i].apply_status="同意"
                        //     }
                        //     if (_self.data[i].apply_status==="tesReturned") {
                        //         _self.data[i].apply_status="驳回"
                        //     }
                        //     if (_self.data[i].apply_status==="tesReady") {
                        //         _self.data[i].apply_status="待审核"
                        //     }
                        //     _self.data[i].create_date = DateFormat(_self.data[i].create_date)
                        //     _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        //     _self.data[i].check_date = DateFormat(_self.data[i].check_date)
                        //     _self.data[i].plan_date =  DateFormat(_self.data[i].plan_date)
                    }
                    _self.loading = false
                }
                this.$Get(url, config, success)
            },
            get_data_center(){
                let _self = this
                return new Promise((resolve,reject) => {
                    let params ="taskKind,taskStage"

                    function success(res){
                        _self.taskKind = res.data.data.taskKind
                        _self.taskStage = res.data.data.taskStage
                        _self.taskKind_map = _self.$array2map(_self.taskKind)
                        _self.taskStage_map=_self.$array2map(_self.taskStage)
                        resolve()
                    }
                    this.$GetDataCenter(params, success)
                })
            }
        },
        created() {
            this.loading = true
            this.get_data_center()
            this.get_data()
            this.$bus.on("UPDATE_FINISHED_DATA",()=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>