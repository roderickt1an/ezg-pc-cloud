<template>
    <div>
        <Modal
            v-model="orderAddProduct"
            title="产品名称"
            width="1000">
            <Row style="margin-bottom:10px">
                <Col span="4">
                        <Input v-model="searchProduct" placeholder="输入产品搜索" @on-enter="search_product_1">
                            <Button slot="append" icon="ios-search" @click="search_product_1"></Button>
                        </Input>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <Card>
                    <Col span="16">
                        <p slot="title">产品列表</p>
                    </Col>
                    
                    <Table
                        :loading="loading"
                        highlight-row
                        :row-class-name="rowClassName"
                        @on-row-click="select_product"
                        :columns="productColumns"
                        :data="productData">
                    </Table>
                    <Page
                            size="small"
                            :total="total"
                            :current.sync="page"
                            show-total
                            show-elevator
                            @on-change="pageChange"
                            style="margin-top: 10px"
                            simple
                    ></Page>
                </Card>
                </Col>
                <Col span="15" offset="1">
                    <Spin size="large" fix v-if="sideLoading"></Spin>
                    <Card dis-hover v-if="selectProduct">
                        <p slot="title">产品详情</p>
                        <Row class="productDetail-title" style="margin-bottom:20px">
                            <p id="product_name">{{selectProduct.product}}</p>
                            <p class="productDetail-title-price">
                                <span>￥<strong id="product_price">{{productPrice}}</strong></span>
                            </p>
                            <div class="productDetail-title-content">
                            </div>
                        </Row>
                        <!-- 针对地址变更的暂时性处理 -->
                        <Row class="type-select" v-if="selectProduct.id == 100 && changeArea">
                            <!-- <Row v-for="(item, index.vue) in queryProperty" :key="index.vue" class="type-select"> -->
                                <p>{{queryProperty[0].name}}</p>
                                <RadioGroup v-model="selectProperty[0]" type="button" size="large" @on-change="property_change;selectProperty[1]='';productPrice=0;SKU=''" >
                                    <Radio v-for="(type, index2) in queryProperty[0].children" :label="type.pvId" :key="index2">{{type.propertyValue}}</Radio>
                                </RadioGroup>
                                <p v-if="selectProperty[0]==310">{{queryProperty[2].name}}</p>
                                <RadioGroup v-model="selectProperty[1]" type="button" size="large" v-if="selectProperty[0]==310" @on-change="property_change">
                                    <Radio v-for="(type, index) in queryProperty[2].children" :label="type.pvId" :key="index">{{type.propertyValue}}</Radio>
                                </RadioGroup>
                                <p v-if="selectProperty[0]!=310">{{queryProperty[1].name}}</p>
                                <RadioGroup v-model="selectProperty[1]" type="button" size="large" @on-change="property_change" v-if="selectProperty[0]!=310">
                                    <Radio v-for="(type, index) in queryProperty[1].children" :label="type.pvId" :key="index">{{type.propertyValue}}</Radio>
                                </RadioGroup>
                            <!-- </Row> -->
                        </Row>
                        <Row v-if="selectProduct.id != 100" v-for="(item, index) in queryProperty" :key="index" class="type-select">
                            <p>{{item.name}}</p>
                            <RadioGroup v-model="selectProperty[index]" type="button" size="large" @on-change="property_change" >
                                <Radio v-for="(type, index2) in item.children" :label="type.pvId" :key="index2">{{type.propertyValue}}</Radio>
                            </RadioGroup>
                        </Row>
                        <Row style="margin-top:20px">
                            <p style="font-size:16px;padding-bottom:16px">地区</p>
                            <Col span="10">
                                <al-cascader v-model="areaCode" data-type="code" level="2" @on-change="area_change"/>
                            </Col>
                        </Row>
                        <Row>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="add_product" :disabled="disabled">立即购买</Button>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="open_flow_img" :disabled="disabled" v-if="isAdmin">查看流程图</Button>
                        </Row>
                    </Card>
                    <!-- <Card dis-hover v-if="isProductDetail">
                        <p slot="title">产品详情</p>
                        <div class="productDetail-title">
                            <p id="product_name"></p>
                            <p class="productDetail-title-price">
                                <span>￥<strong id="product_price">加载中</strong></span>
                            </p>
                            <div class="productDetail-title-content">
                            </div>
                        </div>
                        <div class="productDetail-option" id="productDetail-option-id" @click="areaChange()">
                            <div class="_propertys_class_" v-for="(item, index.vue) in basePropertys" :key=index.vue>
                                <p :id="item.propertyId">{{ item.name }}</p>
                                <div class="productDetail-option-buttonList" :name="index.vue==0?'firstProperty':''">
                                    <button
                                            type="button"
                                            v-for="(item2, index2) in item.children"
                                            :key = index2
                                            :class="index2==0?'active':''"
                                            :id="item2.pvId"
                                            @click="chooseThisProperty(item2.pvId)">
                                        {{ item2.propertyValue }}
                                    </button>
                                </div>
                            </div>
                            <p id="areaId">地区</p>
                            <Row :gutter="16">
                                <Col span="10">
                                <al-cascader v-model="res1" data-type="code" level="2" @on-change="areaChange()"/>
                                </Col>
                            </Row>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="addProduct">立即购买</Button>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="open_flow_img" v-if="isAdmin">查看流程图</Button>
                        </div>
                    </Card> -->
                </Col>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            changeArea: false,
            companyId: "",
            loading: false,
            sideLoading: false,
            productPrice: 0,
            isCycle:"",
            isCycleOne:"",
            isCycleNum:0,
            defaultdepartalias:'',
            defaultdepartaliasOne:'',
            flag:0,
            fflag:0,
            defaultdepartaliasList:[],
            orderItem:[],
            cycleList:[],
            areaCode: ['440000', '440100', '440103'],
            SKU: "",
            orderAddProduct: false,
            //  产品检索
            searchProduct: '',
            productColumns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '产品名称',
                    key: 'product'
                },
                // {
                //     title: '状态',
                //     key: 'status'
                // },
                // {
                //     title: '产品编码',
                //     key: 'productCode'
                // },
            ],
            productData: [],
            total: 0,
            page: 1,
            pageSize: 10,
            selectProduct: "",
            //  产品的相关属性
            queryProperty: [],
            producSku: [],
            selectProperty: [],
        }
    },
    computed:{
        disabled(){
            // if((this.queryProperty.length == this.selectProperty.length) && this.queryProperty.length != 0 ){
            //     let flag = 1
            //     for(let i = 0; i<this.selectProperty.length; i++){
            //         if(this.selectProperty[i]==undefined){
            //             flag = 0
            //             return true
            //         }
            //     }
            //     if(flag){
            //         return false
            //     }
            // }else{
            //     if(this.selectProperty[0] && this.selectProperty[1] && this.changeArea){
            //         return false
            //     }else{
            //         return true
            //     }
            // }
            if(!this.SKU){
                return true
            }else{
                return false
            }

        },
        isAdmin(){
            if(localStorage.getItem("id") == "10059"){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        search_product_1(){
            this.page = 1
            this.search_product()
        },
        //  产品检索
        search_product(){
            let _self = this
            let url = `api/product/list`
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    product: _self.searchProduct,
                    isCycle:'Y'
                }
            }

            function success(res){
                _self.productData = res.data.data.rows
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.search_product()
        },
        //  生成产品详情
        select_product(e){
            if(e.id == "14"){
                this.$Message.error("对不起，该产品已经不允许操作！")
                return false;
            }
            this.SKU = ''
            this.sideLoading = true
            this.selectProduct = e
            this.productPrice = 0
            this.queryProperty = []
            this.selectProperty = []
            this.isCycle = e.iscycle
            this.defaultdepartalias = e.defaultdepartalias
            this.get_queryProperty(e.id)
            this.get_product_sku(e.id)
        },
        //  获取产品子属性
        get_queryProperty(e){
            let _self = this
            let url = `api/product/queryPropertyByProductId`
            let config = {
                params: {
                    productId: e
                }
            }

            function success(res){
                _self.queryProperty = res.data.data
                if(e == 100){

                    let temp = []
                    for(let i = 0; i< _self.queryProperty.length; i++){
                        if(_self.queryProperty[i].propertyId == 95){
                            temp[0] = _self.queryProperty[i]
                        }
                        if(_self.queryProperty[i].propertyId == 23){
                            temp[1] = _self.queryProperty[i]
                        }
                        if(_self.queryProperty[i].propertyId == 16){
                            temp[2] = _self.queryProperty[i]
                        }
                    }
                    _self.queryProperty = temp
                    _self.changeArea = true
                }else{
                    _self.changeArea = false
                }
            }

            this.$Get(url, config, success)
        },
        //  获取产品所有sku
        get_product_sku(e){
            let _self = this
            let url = `api/product/getSKUListByProductId`
            let config = {
                params:{
                    productId: e
                }
            }

            function success(res){

                _self.producSku = res.data.data
                let temp = _self.producSku[0].linkPropertys.split(",")
                if(temp.length == 1){
                    _self.selectProperty.push(parseInt(temp[0]))
                    _self.property_change()
                }

                // for(let i = 0; i<temp.length; i++){
                //     _self.selectProperty.push(parseInt(temp[i]))
                // }
                _self.property_change()
                setTimeout(()=>{
                    _self.sideLoading = false
                }, 200)
            }

            this.$Get(url, config, success)
        },
        //  通过属性值获取sku
        find_sku(){
            let _self = this
            return new Promise(function(resolve, reject){
                _self.SKU = ""
                let len = _self.producSku[0].linkPropertys.split(",").length
                if(_self.selectProperty.length == len){
                    let arr = []
                    let total = _self.selectProperty.join(",")
                    for(let i = 0; i< _self.producSku.length;i++){
                        arr = _self.producSku[i].linkPropertys.split(",")
                        let flag = _self.find_array(arr, total)
                        if(flag){
                            _self.SKU = _self.producSku[i].id

                            resolve()
                        }
                    }
                }else{

                }

            })
        },
        //  数组比较
        find_array(cur, params){
            params = params.split(",")
            if(cur.length == params.length){
                let len = cur.length
                let flag = 0
                cur = cur.sort()
                params = params.sort()
                for(let i = 0; i<len; i++){
                    if(cur[i] == params[i]){
                        flag ++;
                    }else{
                        return false
                    }
                }
                if(flag == len){
                    return true
                }
            }else{
                return false
            }
        },
        //  获取产品价格
        get_product_price_by_sku(){
            let url = `api/product/getPriceByAreaAndSKU`

            let _self = this

            let config = {
                params:{
                    skuId: _self.SKU,
                    areaId: _self.areaCode[2]
                }
            }

            function success(res){
				_self.$store.commit("orderList/getPskuId",res.data.data[0].pskuId)
                _self.productPrice = res.data.data[0].oaprice
            }

            this.$Get(url, config, success)
        },
        area_change(e){
            this.property_change()
        },
        property_change(e){
            let _self = this
            this.productPrice = 0
            if(this.selectProperty.length){
                this.find_sku().then(() => {
                    _self.get_product_price_by_sku()
                }).catch(function(err){
                    console.log(err)
                })
            }else{
            }
        },
        //  产品操作
        add_product(){
            for (let i=0;i<this.cycleList.length;i++){
                console.log(i)
                if (this.cycleList[i].iscycle=="Y"){
                    this.isCycleOne = "Y"
                }
            }
            for (let i=0;i<this.defaultdepartaliasList.length;i++){
                if (this.defaultdepartaliasList[i].defaultdepartalias=="PLAN"){
                    this.defaultdepartaliasOne = "PLAN"
                }
            }
            // console.log(this.isCycleOne)
            // if (this.isCycleOne == "Y" && this.isCycle=="Y"){
            //     this.$Message.warning(this.selectProduct.product+"产品请单独下一个订单")
            //     return
            // }
            if (this.isCycle=="Y"){
                this.isCycleNum = this.isCycleNum+1
            }
            if (this.defaultdepartalias=="PLAN"){
                this.flag = 1
            }
            if (this.defaultdepartalias!=="PLAN"){
                this.fflag = 1
            }
            if ( this.isCycleOne == "Y" && this.isCycle=="Y") {
                this.$Message.warning("订单中只能含有一个周期性产品的订单项")
                return
            }
            if (this.isCycle=="Y" && this.isCycleNum>1) {
                this.$Message.warning("订单中只能含有一个周期性产品的订单项")
                return
            }
            if (this.defaultdepartalias!=='PLAN' && this.flag==1) {
                // console.log("111")
                this.$Message.warning("企划产品只能单独下单")
                this.fflag=0
                return
            }
            if (this.defaultdepartalias=='PLAN' && this.fflag==1) {
                // console.log("222")
                this.$Message.warning("企划产品只能单独下单")
                this.flag = 0
                return
            }
            if (this.defaultdepartaliasOne=='PLAN' && this.defaultdepartalias!=='PLAN'){
                // console.log("333")
                this.$Message.warning("企划产品只能单独下单")
                this.fflag=0
                return
            }
            if (this.defaultdepartaliasOne!=='PLAN' && this.defaultdepartalias=='PLAN' && this.defaultdepartaliasList.length!==0){
                // console.log("444")
                this.$Message.warning("企划产品只能单独下单")
                this.flag = 0
                return
            }
            let _self = this
            let url = '/api/order/queryItemDetail'

            let config = {
                params:{
                    productSkuIds: _self.SKU,
                    areaId: _self.areaCode[2]
                }
            }

            function success(res){
                    for(let i = 0;i<res.data.data.length;i++){
                        _self.detail = res.data.data[i]
                        if(_self.detail.skuid =='1051' || _self.detail.skuid =='1052' ||_self.detail.skuid =='1053' ||_self.detail.skuid =='1054'){
                            _self.detail.productnumber = '12'
                            _self.detail.unitprice = parseInt(_self.detail.unitprice/12)
                        }

                        if(res.data.data[i].iscycle == "Y"){
                            let url2 = "api/order/cycle/service/record/budget/period"
                            let config2 = {
                                params: {
                                    productId: _self.selectProduct.id,
                                    companyId: _self.companyId
                                }
                            }

                            function success2(re){
                                _self.detail.servicestartdate = re.data.data
                                _self.$bus.emit("ADD_PRODUCT_DETAIL_LIST",_self.detail)
                                _self.productListShow = false

                            }

                            _self.$Get(url2, config2, success2)
                        }else{
                            _self.$bus.emit("ADD_PRODUCT_DETAIL_LIST",_self.detail)
                            _self.productListShow = false

                        }
                    }

								

            }

            this.$Get(url, config, success)
        },
        //  产品流程图
        open_flow_img(){
            window.open("/api/dataCenter/activiti/getInputStreamBySkuId?skuId=" + this.SKU)
        },
        //  限制某项产品
        rowClassName(row, index){
            if(row.id == "14"){
                return 'disabled-row';
            }
        }
    },
    watch: {
        // queryProperty: function(){
        //     let _self = this
        //     this.productPrice = 0
        //     if(this.queryProperty.length){
        //         this.find_sku().then(() => {
        //             _self.get_product_price_by_sku()
        //         }).catch(function(err){
        //             console.log(err)
        //         })
        //     }else{

        //     }
        // }
    },
    created(){
        let _self = this
        this.$bus.off("OPEN_ORDER_PRODUCT_LIST", true)
        this.$bus.on("OPEN_ORDER_PRODUCT_LIST", (e,p) => {
            _self.productPrice = 0
            _self.selectProduct = ""
            _self.searchProduct = ""
            _self.companyId = e
            _self.orderItem = p
            _self.cycleList = []
            _self.isCycleNum = 0
            _self.isCycle = ""
            _self.isCycleOne =""
            _self.defaultdepartaliasList = []
            _self.defaultdepartalias = ''
            _self.defaultdepartaliasOne = ''
            _self.flag = 0
            _self.fflag = 0
            for (let i=0;i<_self.orderItem.length;i++){
                _self.cycleList.push({iscycle:_self.orderItem[i].iscycle})
                _self.defaultdepartaliasList.push({defaultdepartalias:_self.orderItem[i].defaultdepartalias})
            }
            _self.search_product()
            _self.orderAddProduct = true
        })
        
    }
}
</script>


<style>
.type-select .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper{
    margin: 10px;
    border-radius: 8px;
    border-left: 1px solid #dddee1;
}
.type-select .ivu-radio-group-button .ivu-radio-wrapper:after, .ivu-radio-group-button .ivu-radio-wrapper:before{
    content: none;
    
}
.type-select .ivu-radio-group-button .ivu-radio-wrapper-checked{
    background: #2d8cf0;
    color: #fff;
    border-left: none!important;
}
.productDetail-title {
    border-bottom: 1px solid #d9d9d9;
    padding: 1rem;
    background: #fff;
    position: relative;
}
.productDetail-title > p {
    line-height: 2;
    color: #742323;
    font-size: 1.2rem;
}
.productDetail-title-price > span {
    color: #ed3f14;
    font-weight: 400;
}
.productDetail-title-price > span > strong {
    font-size: 1.5rem;
}
.disabled-row{
    color: #EAEAEA
}
</style>

