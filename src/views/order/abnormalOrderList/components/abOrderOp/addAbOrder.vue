<template>
  <div>
    <Modal title="新增异常工单" :value="true" width="80" @on-cancel="close">
      <Form
        ref="abnormalOrderDetail"
        :model="abnormalOrderDetail"
        :rules="ruleInline"
        :label-width="100"
      >
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称" prop="companyName">
              <Input
                size="small"
                v-model="abnormalOrderDetail.companyName"
                @on-focus="open_company"
                readonly
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人" prop="linkname">
              <Input
                size="small"
                v-model="abnormalOrderDetail.linkname"
                @on-focus="open_company"
                readonly
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话" prop="linkTel">
              <Input
                size="small"
                v-model="abnormalOrderDetail.linkTel"
                @on-focus="open_company"
                readonly
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="异常类别" prop="type">
              <RadioGroup v-model="abnormalOrderDetail.type">
                <Radio label="LowPrice">优惠价格</Radio>
                <Radio label="Discount">产品折扣</Radio>
                <Radio label="Gift">赠送</Radio>
                <Radio label="Cancel">注销</Radio>
                <Radio label="Project">项目</Radio>
                <Radio label="Other">其他</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="产品内容">
              <Table border :columns="productListColumns" :data="productList"></Table>
              <Button
                @click="handleAddProduct"
                type="ghost"
                style="margin:10px auto;display:block"
                icon="add"
              >添加</Button>
            </FormItem>
          </Col>
        </Row>

        <!-- <Row :gutter="16">
          <Col>
            <FormItem label="产品内容" prop="productContent">
              <Input
                type="textarea"
                :rows="2"
                size="small"
                v-model="abnormalOrderDetail.productContent"
              />
            </FormItem>
          </Col>
        </Row>-->

        <Row :gutter="16">
          <Col>
            <FormItem label="审批事由" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="abnormalOrderDetail.reason" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="上传图片">
              <center>
                <Upload
                  Upload
                  multiple
                  type="drag"
                  ref="upload"
                  :before-upload="handleUpload"
                  action="/api/customer/addCustomerContentImg"
                >
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
                <div v-for="(item,index) in file" :key="index">
                  {{ item.name }}
                  <Button type="text" @click="fileRemove(item)">移除</Button>
                </div>
              </center>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="submit">创建</Button>
        <Button type="ghost" @click="close">关闭</Button>
      </div>
    </Modal>
    <prodect-select
      @close="prodectSelectModel=false"
      v-if="prodectSelectModel"
      @selectProduct="handleSelectProduct"
    ></prodect-select>
    <company-select @company-change="setting_company"></company-select>
  </div>
</template>

<script>
import companySelect from "../companySelect";
import prodectSelect from "./productSelect";

export default {
  name: "abnormalWorkOrder_index",
  components: {
    companySelect,
    prodectSelect
  },
  data() {
    return {
      file: [],
      prodectSelectModel: false,
      productListColumns: [
        {
          title: "产品名称",
          key: "productName"
        },
        {
          title: "数量",
          key: "amount",
          render: (h, params) => {
            return h("div", [
              h(
                "Input",
                {
                  props: {
                    type: "danger",
                    size: "small",
                    value: params.row.amount
                  },
                  style: {
                    width: "200px",
                    marginRight: "5px"
                  },
                  on: {
                    "on-change": e => {
                      this.handleChangeNum(params, e);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "销售金额",
          key: "totalMoney"
        },
        {
          title: "优惠后金额",
          key: "finalMoney",
          render: (h, params) => {
            return h("div", [
              h(
                "Input",
                {
                  props: {
                    type: "danger",
                    size: "small",
                    value: params.row.finalMoney
                  },
                  style: {
                    width: "200px",
                    marginRight: "5px"
                  },
                  on: {
                    "on-change": e => {
                      this.handleChangeFinalMoneny(params, e);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "danger",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.productList.splice(params.index, 1);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      productList: [
        // { productType: "", amount: "", totalMoneny: "", finalMoneny: "" }
      ],
      openAddAbOrderDetail: false,
      abnormalOrderDetail: {
        companyId: "",
        companyName: "",
        linkname: "",
        linkTel: "",
        type: "",
        attIds: "",
        productContent: "",
        reason: ""
      },
      ruleInline: {
        companyName: [
          { required: true, message: "请选择！", trigger: "change" }
        ],
        linkname: [{ required: true, message: "请选择！", trigger: "change" }],
        linkTel: [{ required: true, message: "请选择！", trigger: "change" }],
        type: [{ required: true, message: "请选择！", trigger: "change" }],
        productContent: [
          { required: true, message: "不能为空！", trigger: "change" }
        ],
        reason: [{ required: true, message: "不能为空！", trigger: "change" }]
      }
    };
  },
  methods: {
    handleAddProduct() {
      this.prodectSelectModel = true;
    },
    handleChangeNum({ row, index }, { target: { value } }) {
      row.amount = value; //如果是select记得 要直接等于e  例如：params.row.attrName = e
      row.totalMoney = value * row.oPrice; //如果是select记得 要直接等于e  例如：params.row.attrName = e
      this.productList[index] = row;
    },

    handleChangeFinalMoneny({ row, index }, { target: { value } }) {
      row.finalMoney = value; //如果是select记得 要直接等于e  例如：params.row.attrName = e
      this.productList[index] = row;
    },
    handleSelectProduct(e) {
      this.productList.push({
        productName: e.product,
        productId: e.id,
        productSkuId: e.skuId,
        oPrice: e.productPrice,
        amount: 1,
        totalMoney: e.productPrice,
        finalMoney: e.productPrice,
        areaId: e.areaId
      });
      console.log("selectProduct", e);
      this.prodectSelectModel = false;
    },
    //选择公司
    open_company() {
      this.$bus.emit("AB_ORDER_OPEN_SELECT_COMPANY", true);
    },
    //选择公司后回调
    setting_company(e) {
      console.log(e);
      this.abnormalOrderDetail.companyId = e.id;
      this.abnormalOrderDetail.companyName = e.companyname;
      this.abnormalOrderDetail.linkname = e.customerName;
      this.abnormalOrderDetail.linkTel = e.customerTel;
    },
    //提交
    handleUpload(file) {
      this.file.push(file);
      return false;
    },
    uploadImg() {
      let _self = this;
      _self.loading = true;
      //   _self.$ButtonCollect("marketingManagement_index_followUp_submit");
      let url = "/api/customer/addCustomerContentImg";

      let formdata = new FormData();

      for (let i = 0; i < _self.file.length; i++) {
        // formdata.append('files', _self.fileArray[i],"file_"+Date.parse(new Date())+".jpg")
        formdata.append("files", _self.file[i]);
      }

      function success(res) {
        let imgCode = [];
        for (let j = 0; j < res.data.data.length; j++) {
          imgCode.push(res.data.data[j].id);
        }
        _self.abnormalOrderDetail.attIds = imgCode.toString();
        _self.create("abnormalOrderDetail");
      }

      function fail(err) {
        _self.loading = false;
      }

      this.$Post(url, formdata, success, fail);
    },
    fileRemove(e) {
      this.file.splice(this.file.indexOf(e), 1);
    },
    create(name) {
      let _self = this;
      if (!_self.productList.length) {
        _self.$Message.error("请先补全产品信息");
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          _self.add_ab_order();
          _self.close();
        } else {
          _self.$Message.error("请先补全相关信息!");
        }
      });
    },
    submit() {
      let _self = this;
      console.log("haha");
      this.$refs["abnormalOrderDetail"].validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.file.length) {
            this.uploadImg();
          } else {
            this.create("abnormalOrderDetail");
          }
        } else {
          _self.$Message.error("请先补全相关信息!");
        }
      });
    },
    //确定增加
    add_ab_order() {
      let _self = this;
      let url = `api/order/unusual/workorder/addWorkOrder`;
      let config = {
        companyId: _self.abnormalOrderDetail.companyId,
        unusualType: _self.abnormalOrderDetail.type,
        productContent: _self.abnormalOrderDetail.productContent,
        productItems: JSON.stringify(_self.productList),
        // productItems: _self.productList,
        applyMemo: _self.abnormalOrderDetail.reason,
        attIds: _self.abnormalOrderDetail.attIds
      };

      function success(res) {
        console.log(res);
        _self.$bus.emit("OPEN_AB_ORDER_LIST", true);
        _self.openAddAbOrderDetail = false;
      }

      function fail() {}

      this.$Post(url, config, success, fail);
    },
    //关闭新增弹窗
    close(e) {
      this.$emit("close", e);
    }
  },
  created() {}
};
</script>
