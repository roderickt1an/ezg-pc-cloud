<template>
    <div>
        <Button name="marketingManagement_index_company_add" type="primary" shape="circle" icon="plus" @click="open_company_create">新增</Button>
        <Button name="marketingManagement_index_company_add" type="primary" shape="circle" icon="plus" @click="shift_company" v-permission="['company.shift']">转移</Button>
        <Button name="marketingManagement_index_company_add" type="primary" shape="circle" icon="plus" @click="open_company_merge" v-permission="['company.merge']">企业合并</Button>
        <Table
            :loading="loading"
                highlight-row
                @on-selection-change="select_row"
                border
                size="small"
                :columns="header"
                :data="data"
                style="margin-top: 15px"
        ></Table>
        <!-- <Page
            size="small"
            :total="total"
            show-total
            show-elevator
            @on-change="pageChange"
            v-if="total>10"
            style="margin-top: 10px"></Page> -->
        <create-company v-if="close" @update="get_data" :taxtype="taxtype" :companyarea="companyarea_Casr" :customer="customer" :importance="importance" :cluesources="cluesources" ></create-company>
        <update-company v-if="close" @update="get_data" :taxtype="taxtype" :companyarea="companyarea_Casr" :customer="customer" :importance="importance" :cluesources="cluesources"></update-company>
        <!-- <amend-company></amend-company> -->
        <change-log></change-log>
        <shift-company v-if="openShiftCompany" @close="close_shift_company" :company="selectCompany"></shift-company>
        <merge-company :data="data"></merge-company>
        <field-detail></field-detail>
        <amendCompany />
    </div>
</template>

<script>
import createCompany from "./create"
import updateCompany from "./update"
import amendCompany from "./amend"
import changeLog from "./changeLog"
import shiftCompany from './shift'
import mergeCompany from './merge'
import fieldDetail from './field'
export default {
    components: {
        createCompany,
        updateCompany,
        amendCompany,
        changeLog,
        shiftCompany,
        mergeCompany,
        fieldDetail
    },
    props: {
        customer:{
            type: [Array, Object, String]
        },
        importance: {
            type: Array
        },
        cluesources: {
            type: Array
        }
    },
    data(){
        return {
            selectRow:"",
            companyData:[],
            loading: false,
            close: false,
            header: [
                {
                    type:'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: "序号",
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '公司名称',
                    minWidth: 250,
                    render:(h, params) => {
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
                        title: '跟进销售',
                        key: 'followby',
                        minWidth:100
                    },
                    {
                        title: '交易状态',
                        key: 'enterprisestatusText',
                        minWidth:100                        
                    },
                    {
                        title: '法人',
                        key: 'legalrepresentative',
                        minWidth:100                        
                    },
                    {
                        title: '重要等级',
                        key: 'importlevelText',
                        minWidth:100                        
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        minWidth:100                        
                    },
                    {
                        title: '企业来源',
                        key: 'cluesourceText',
                        minWidth:150                                                    
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        minWidth: 300,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px' //,
                                        //display: (localStorage.getItem("id") == 10059 ) ? "inline-block" : "none"
                                    },
                                    on: {
                                        click: () => {
                                          console.log(params.row)
                                            this.$bus.emit("OPEN_COMPANY_UPDATE", params.row)
                                        }
                                    }
                                }, '编辑'),
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                          // console.log(params)
                                            // this.$bus.emit("OPEN_COMPANY_UPDATE", params.row)
                                            // this.open_company_merge()

                                            // this.edit(params);

                                //         }
                                //     }
                                // }, '工商信息'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.get_company_name_change_log(params.row.id)
                                        }
                                    }
                                }, '名称变更日志'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$bus.emit("OPEN_FIELD_DETAIL", params.row)
                                        }
                                    }
                                }, '外勤'),
                            ]);
                        }
                    }
            ],
            data: [],
            companyarea_Casr: [],
            taxtype: [],
            openShiftCompany: false,
            selectCompany: ""
        }
    },
    methods: {
        get_data(e){
            let _self = this
            _self.loading = true
            let url = 'api/customer/findCompanysByCustomerId/' + e
            let config = {}

            function success(res){
                console.log(res.data.data)
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config ,success)
        },
        select_row(e){
            console.log(e)
            this.selectCompany = []
            this.selectCompany = e
        },
        open_company_merge(){
            if (this.selectCompany.length==1) {
                this.$bus.emit("OPEN_COMPANY_MERGE",this.selectCompany[0].id)
            }
            if (this.selectCompany.length>1){
                this.$Message.warning("只能选择一家企业合并")
            }
            if (this.selectCompany.length==0) {
                this.$Message.warning("请选择要合并的企业")
            }

        },
        get_data_center(){
            let _self = this
            let params = "companyarea,taxtype"
            function success(res){
                _self.companyarea_Casr = _self.$changeCars(res.data.data.companyarea)
                _self.taxtype = res.data.data.taxtype
                // 延迟加载，防止报错
                _self.close = true
            }

            this.$GetDataCenter(params, success)
        },
        get_company_name_change_log(e){
            this.$bus.emit("OPEN_COMPANY_LOG", e)
        },
        open_company_create(){
            this.$bus.emit("OPEN_COMPANY_CREATE",true)
        },
        shift_company(){
            if(this.selectCompany.length!==0){
                this.openShiftCompany = true
            }else{
                this.$Message.warning("请选择需要变更的公司！")
            }
        },
        close_shift_company(){
            this.openShiftCompany = false
            this.selectCompany = ""
            this.get_data(this.customer.ID)
        }
    },
    created(){
        let _self = this
        this.get_data_center()
        this.get_data(this.customer.ID)

        //更新表格内容
        this.$bus.off("UPDATE_CUSTOMER", true)
        this.$bus.on("UPDATE_CUSTOMER", (e)=>{
            _self.get_data(this.customer.ID)
            _self.selectRow = ''
        })
        this.$bus.off("UPDATE_CUSTOMER_NEW", true)
        this.$bus.on("UPDATE_CUSTOMER_NEW", (e)=>{
            _self.get_data(this.customer.ID)
            _self.selectRow = ''
            _self.selectCompany = []
        })
    }
}
</script>

