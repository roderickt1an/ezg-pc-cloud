<template>
    <div>
            <Card>
                <Row style="margin-bottom:20px">
                    <Collapse v-model="search_model">
                        <Panel name="1" >
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                            <p slot="content">
                                <div  slot="content" @keydown.enter="search">
                                    <Form ref="searchData" :model="searchData" :label-width="100">
                                        <Row :gutter="16">
                                            
                                            <Col span="8">
                                                <FormItem prop="companyname" label="公司名称：">
                                                    <Input type="text" v-model="searchData.companyname" placeholder="" style="width:100%" size="small">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="servicename" label="创建人：">
                                                    <Input type="text" v-model="searchData.servicename" placeholder="" style="width:100%" size="small">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="followuptype" label="跟进类型：">
                                                    <Cascader :data="followUpType"  v-model="searchData.followuptype" trigger="hover" style="width:100%" size="small" ></Cascader >
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16">
                                            <Col span="8">
                                                <FormItem prop="departname" label="录入部门：">
                                                    <Input type="text" v-model="searchData.departname" placeholder="" style="width:100%" size="small">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="createdate" label="企业录入时间：">
                                                    <DatePicker transfer type="daterange" placement="bottom-start" v-model="searchData.createdate" style="width:100%" size="small"></DatePicker>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="updatedate" label="内容创建时间：">
                                                    <DatePicker transfer type="daterange" placement="bottom-end" v-model="searchData.updatedate" style="width:100%" size="small"></DatePicker>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <FormItem>
                                            <Button type="primary" @click="search">搜索</Button>
                                            <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </p>
                        </Panel>
                    </Collapse>
                </Row>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                    <!-- <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcelField">导出外勤Excel</Button>                     -->
                </ButtonGroup>
            </Row>

            <Row style="margin-top: 10px;">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"                     
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
import { DateFormat } from '../../../libs/utils.js';

export default {
    name:'customerFollowUp_index',
    data(){
        return{
            search_model:"",
            header:[
                {
                    title:'客户名称',
                    key:'name',
                    minWidth:100
                },
                {
                    title:'联系方式',
                    key: 'tel',
                    minWidth: 120
                },
                {
                    title:'公司名称',
                    key:'companyname',
                    width: 250,
                    render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>15){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,15)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyname)
                            }
                        }
                },
                {
                    title:'跟进类型',
                    key:'followuptype',
                    minWidth: 100,
                    render:(h,params)=>{
                        if (params.row.account_type) {
                            return h("div",{},this.followUpType_Map.get(params.row.followuptype)+'/'+this.accountType_Map.get(params.row.account_type))
                        } else {
                            return h("div",{},this.followUpType_Map.get(params.row.followuptype))
                        }
                    }
                },
                {
                    title:'完成状态',
                    key:'finish_flag',
                    minWidth: 100
                },
                {
                    title:'跟进内容',
                    key:'servicecontent',
                    width:200,
                    render:(h, params) => {
                            // console.log(params)
                            if(params.row.servicecontent == ''||params.row.servicecontent == null){
                                return ''
                            }else if(params.row.servicecontent.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.servicecontent.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.servicecontent)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.servicecontent)
                            }
                        }
                },
                // {
                //     title:'图片',
                //     key:'content',
                //     width:200
                // },
                {
                    title:'录入人',
                    key:'servicename',
                    minWidth:100
                },
                {
                    title:'录入部门',
                    key:'departname',
                    minWidth:120
                },
                {
                    title:'创建时间',
                    key:'createdate',
                    minWidth:180
                },
                {
                    title:'跟进人',
                    key:'followname',
                    minWidth:100
                },
                {
                    title:'更新时间',
                    key:'contentcreatedate',
                    minWidth:180
                }

            ],
            data:[],
            loading:false,
            searchData:{
                createdate:[],
                companyname:"",
                followuptype:"",
                servicename:"",
                updatedate:[],
                departname:""
            },
            page:1,
            pageSize:10,
            pageTotal:new Number(),
            followUpType:"",
            accountType:[],
            accountType_Map:"",
            followUpType_Map:""            
        }
    },
    methods: {
        search(){
            this.page = 1
            this.getData()
        },
        reset(){
            this.page = 1
            this.searchData.createdate = []
            this.searchData.companyname = ""
            this.searchData.followuptype = ""
            this.searchData.servicename = ""
            this.searchData.updatedate = []
            this.searchData.departname = ""
            // this.searchData.updatedate = []
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getData()
        },
        downloadExcel(){
            let field = [
                {field:'name',title:'客户名称'},
                {field:'companyname',title:'公司名称'},           
                {field:'followuptype',title:'跟进类型',format:'follow_up_type'},
                {field:'account_type',title:'跟进类型',format:'account_followup_type'},
                {field:'servicecontent',title:'跟进内容'},
                {field:'servicename',title:'录入人'},
                {field:'followname',title:'跟进人'},
                {field:'departname',title:'录入部门'},
                {field:'createdate',title:'创建时间'},
                {field:'contentcreatedate',title:'更新时间'},
                {field:'customertype',title:'客户状态',format:'customerTypes'},
                {field:'customersource',title:'客户来源',format:'cluesources'},
                {field:'area',title:'区域',format:'area'},
            ]
            let _self = this
            let url = `api/customer/customerFollowMsgList`
            let config = {
                page: '1',
                pageSize: '1000000',
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field)),      
                bcreatedate:DateFormat(_self.searchData.createdate[0]),
                ecreatedate:DateFormat(_self.searchData.createdate[1]),
                companyname:_self.searchData.companyname,
                followuptype:_self.searchData.followuptype[0],
                accountType:_self.searchData.followuptype[1]?_self.searchData.followuptype[1]:"",
                servicename:_self.searchData.servicename,
                departname:_self.searchData.departname,
                bupdatedate:DateFormat(_self.searchData.updatedate[0]),
                eupdatedate:DateFormat(_self.searchData.updatedate[1])    
                // sortField:"contentcreatedate",
                // order:"asc"
                }
            let toExcel = this.$MergeURL(url, config)
            // console.log(toExcel)
            window.open(toExcel)
        },
        downloadExcelField(){},
        getData(){
            let _self = this
            _self.loading = true
            let url = `api/customer/customerFollowMsgList`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    bcreatedate: DateFormat(_self.searchData.createdate[0]),
                    ecreatedate: DateFormat(_self.searchData.createdate[1]),
                    companyname:_self.searchData.companyname,
                    followuptype:_self.searchData.followuptype[0],
                    accountType:_self.searchData.followuptype[1]?_self.searchData.followuptype[1]:"",
                    servicename:_self.searchData.servicename,
                    departname:_self.searchData.departname,
                    bupdatedate:DateFormat(_self.searchData.updatedate[0]),
                    eupdatedate:DateFormat(_self.searchData.updatedate[1])                    
                    // sortField:"contentcreatedate",
                    // order:"asc"                    
                }
            }
            
            function success(res){
                // console.log(res.data.data.rows)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                _self.loading = false
                
                for(let i = 0;i<_self.data.length;i++){
                    if(_self.data[i].finish_flag == 'Y'){
                        _self.data[i].finish_flag = "完成"
                    }else if(_self.data[i].finish_flag == 'N'){
                        _self.data[i].finish_flag = "未完成"
                    }else{

                    }
                }
            }

            function fail(err){
                console.log(err)
            }

            this.$Get(url, config, success, fail)

            // this.$http.get(url, config).then(function(res){
            //     _self.$backToLogin(res)
            //     if(res.data.msgCode == "40000"){
            //         _self.data = res.data.data.rows
            //         _self.pageTotal = res.data.data.total
            //     }else{
            //         _self.$Message.error(res.data.msg)
            //     }
            // }).catch(function(res){
            //     _self.$Message.error("网络异常！")                
            // })
        },
        getDataCenter(){
            let _self = this
            _self.followUpType=[]
            function finish(res){
                // console.log(res.data.data.follow_up_type)
                _self.followUpType = res.data.data.follow_up_type.map(v=>{
                    if (v.children) {
                        return {
                            id:v.id,
                            value:v.typecode,
                            label:v.typename,
                            children:v.children.map(i=>{
                                return{
                                    bom:i.bom,
                                    id:i.id,
                                    pid:i.pid,
                                    sort:i.sort,
                                    value:i.typecode,
                                    typegroupcode:i.typegroupcode,
                                    typegroupname:i.typegroupname,
                                    label:i.typename
                                }
                            })
                        }
                    } else {
                        return{
                            id:v.id,
                            value:v.typecode,
                            label:v.typename
                        }
                    }
                })
                console.log(_self.followUpType)
                _self.followUpType.map(v=>{
                    if (v.children){
                        _self.accountType.push(...v.children)
                    }
                })
                _self.accountType_Map = _self.$array3map(_self.accountType)
                _self.followUpType_Map = _self.$array3map(_self.followUpType)
                // console.log(_self.followUpType_Map)
            }
            this.$GetDataCenter("follow_up_type", finish)
        }
    },
    created () {
        this.getDataCenter()
        this.getData()
    }
}
</script>

