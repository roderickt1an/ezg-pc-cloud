<!--
    编辑属性详情
-->

<template>
    <div>
        <Spin size="large" fix v-if="sideLoading"></Spin>
            <Card dis-hover>     
                <div slot="title">
                    <span style="padding-right:10px">属性详情</span><Tag color="yellow" type="border" >点击左侧属性即可查看详情！</Tag>
                </div>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col span="12"><span>分类：</span></Col><Col span="12"><Input v-model="property[0].typeName" size="small" readonly @on-focus="open_type_tree"/></Col>
                </Row>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col span="12"><span>属性名称：</span></Col><Col span="12"><Input v-model="property[0].name" size="small"/></Col>
                </Row>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col>
                        <Button type="primary" @click="update_attr_type" icon="edit">保存</Button>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col span="24">
                        <Table
                            id="orderItem"
                            :loading="loading"
                            highlight-row 
                            border
                            size="small"
                            :columns="header"
                            :data="propertyV">
                                <Button slot="footer" type="text" @click="create_property" icon="plus" long>新增属性值</Button>
                            </Table>
                    </Col>
                </Row>        
            </Card>
            <div v-if="openTypeTree">
                <Modal
                    v-model="open"
                    width="400"
                    title="产品类型"
                    @on-cancel="openTypeTree=false"
                >
                    <el-tree 
                        :props="defaultProps"
                        node-key="id"
                        :data="productType" 
                        show-checkbox 
                        ref="tree" 
                        :default-checked-keys="checkedId"></el-tree>
                    <div slot="footer">
                        <Button type="primary" @click="create_type">确认</Button>
                    </div>
                </Modal>
            </div>
            
    </div>
</template>

<script>
import { Tree } from 'element-ui';
export default {
    components: {
        elTree: Tree
    },
    props: {
        productAttr: {
            type: [Object, String]
        }
    },
    watch: {
        productAttr:{
            handler() {
                this.get_data()
            },
            deep: true
        }
    },
    data(){
        return {
            defaultProps: {
                children: 'children',
                label: 'typeName'
            },
            sideLoading: false,
            loading: false,
            property:[
                {
                    id: "",
                    typeId: "",
                    typeName:"",
                    name: ""
                }
            ],
            propertyV: [],
            header: [
                {
                    title: "序号",
                    type: "index",
                    minWidth: 80
                },
                {
                    title: "属性值",
                    key: "propertyValue",
                    minWidth: 120,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.propertyV[parmas.index].propertyValue,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.propertyV[parmas.index].propertyValue = event.target.value
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.propertyV[parmas.index].propertyValue = event.target.value
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "属性编码",
                    key: "propertyVCode",
                    minWidth: 120,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.propertyV[parmas.index].propertyVCode,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.propertyV[parmas.index].propertyVCode = event.target.value
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.propertyV[parmas.index].propertyVCode = event.target.value
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    width: 120,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            // h('Button', {
                            //     props: {
                            //         type: "primary",
                            //         size: "small"
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.edit_property(params.row)
                            //         }
                            //     }
                            // }, "编辑"),
                            h('Button', {
                                props: {
                                    type: "error",
                                    size: "small",
                                    icon: "trash-a",
                                },
                                style: {
                                    marginLeft: "5px"
                                },
                                on: {
                                    click: () => {
                                        _self.propertyV.splice(parmas.index, 1)
                                    }
                                }
                            }, "移除")
                        ])
                    }
                }
            ],
            productType: [],
            openTypeTree: false,
            open: true,
            checkedId: []
        }
    },
    methods: {
        get_data(){
            let _self = this
            _self.sideLoading = true
            _self.loading = true
            let url = `api/product/property/findPropertyById/` + _self.productAttr.id

            let config = {
                
            }

            function success(res){
                _self.property = res.data.data.property
                _self.propertyV = res.data.data.propertyV
                _self.sideLoading = false
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        deleted(e){

        },
        edit_property(e){

        },
        create_property(){
            this.propertyV.push({
                id: "",
                propertyId: "",
                propertyVCode: "",
                propertyValue: "",
                sortId: "",
                status: ""
            })
        },
        update_attr_type(){
            let _self = this
            let url = `api/product/property/updateProperty`

            let config = {
                id: _self.property[0].id,
                name: _self.property[0].name,
                typeId: _self.property[0].typeId,
                propertyValues: JSON.stringify(_self.propertyV)
            }

            function success(res){
                _self.$emit("update")
            }

            function fail(err){
                _self.$emit("update")
            }

            this.$Post(url, config, success, fail)
        },
        get_product_type_tree(){
            let _self = this
            let url = `api/product/type/tree`
            let config = {}

            function success(res){
                _self.productType = res.data.data
                // replace_text_title(_self.productType)
            }

            // function replace_text_title(tree){
            //     for(let i = 0; i<tree.length; i++){
            //         tree[i].title = tree[i].text
            //         if(tree[i].children){
            //             replace_text_title(tree[i].children)
            //         }
            //     }
            // }

            this.$Get(url, config, success)
        },
        create_type(){
            let temp = this.$refs.tree.getCheckedNodes()
            this.property[0].typeId = temp[0].id
            this.property[0].typeName = temp[0].typeName
            this.checkedId = []
            this.openTypeTree = false
        },
        open_type_tree(){
            this.get_product_type_tree()
            this.openTypeTree = true
            this.checkedId = [this.property[0].typeId]
        }
    },
    created() {
        let _self = this
        _self.$bus.on("RESET_DETAIL_DATA",(e)=>{
            _self.property = [
                {
                    id: "",
                    typeId: "",
                    typeName:"",
                    name: ""
                }
            ]
            _self.propertyV = []
        })

    }
}
</script>

<style>
#orderItem .ivu-input{
    border: 0px solid #dddee1
}
#orderItem .ivu-select-selection{
    border: 0px solid #dddee1
}
#orderItem .ivu-table-footer{
}
</style>