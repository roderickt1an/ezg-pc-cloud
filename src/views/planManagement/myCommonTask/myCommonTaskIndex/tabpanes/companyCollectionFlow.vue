<template>
        <Modal
                v-model="openDeclareResult"
                title="企业流水状态"
                width="600"
                footer-hide

        >
           <Form v-if="!this.datas.length" ref="formItem"  :label-width="100" style="width:500px;margin:auto">
                <Row :gutter="12">
                    <FormItem prop="finish_status" label="企业收款期数">
                        <Row :gutter="12">
                            <Col span="18">
                                <InputNumber size="small" style="width: 250px"  :max="20" v-model="period" @on-change="changeDatas"/>
                            </Col>
                            <Col span="4">
                                <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem  label="总金额：">
                        <Row>
                            <Col span="18">
                                {{currentRow.predicet_receipt || '0'}}元
                            </Col>
                        </Row>
                    </FormItem>
                </Row>
                <Row>
                    <Table
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="otherHeader"
                    :data="otherdatas"
                    ></Table>
                </Row>
            </Form>

           <Form v-if="this.datas.length" ref="formItem1"   :label-width="100" style="width:500px;margin:auto">
               <Row>
                <FormItem  label="总金额：">
                        <Row>
                            <Col span="18">
                                {{currentRow.predicet_receipt || '0'}}元
                            </Col>
                        </Row>
                </FormItem>
                </Row>
                <Row>
                    <Table
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="datas"
                    ></Table>
                </Row>
            </Form>
        </Modal>

</template>
<script>
export default {
  data() {
    return {
      currentRow: {
        predicet_receipt: 0,
        receipt_proportion: 0
      },
      loading: false,
      //  新增数据
      openDeclareResult: false,
      otherdatas: [],
      period: '',
      datas: [{}],
      header: [
        {
          title: '期限',
          key: 'time',
          minWidth: 100,
          render: (h, params) => {
            return h('div', params.index + 1);
          }
        },
        {
          title: '时间',
          key: 'receipt_period',
          minWidth: 200,
          render: (h, params) => {
            if (!params.row.receipt_period) {
              return h('DatePicker', {
                props: {
                  type: 'date'
                },
                on: {
                  'on-change': e => {
                    this.datas[params.index].receipt_periods = e;
                    console.log(this.datas[params.index]);
                  }
                }
              });
            } else {
              return h('div', params.row.receipt_period);
            }
          }
        },
        {
          title: '金额',
          key: 'amount',
          minWidth: 100,
          render: (h, params) => {
            if (!params.row.amount) {
              return h(
                'Input',
                {
                  style: {
                    width: '80px'
                  },
                  on: {
                    'on-change': e => {
                      this.datas[params.index].amounts = e.target.value;
                    }
                  }
                },
                h('strong', params.row.tem)
              );
            }
            return h('div', ((params.row.amount / this.currentRow.receipt_proportion) * 100).toFixed(2));
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    display: !params.row.amount && !params.row.receipt_period ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      this.handleOneSubmit(params);
                    }
                  }
                },
                '保存'
              )
            ]);
          }
        }
      ],
      otherHeader: [
        {
          title: '期限',
          key: 'time',
          minWidth: 60
        },
        {
          title: '时间',
          key: 'receipt_period',
          minWidth: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                type: 'date',
                value: this.otherdatas[params.index].receipt_period
              },
              on: {
                'on-change': e => {
                  this.otherdatas[params.index].receipt_period = e;
                  console.log(this.otherdatas[params.index]);
                }
              }
            });
          }
        },
        {
          title: '金额',
          key: 'amount',
          minWidth: 100,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.amount
              },
              style: {
                width: '100px'
              },
              on: {
                'on-blur': e => {
                  this.otherdatas[params.index].amount = Number(e.target.value);
                }
              }
            });
          }
        }
      ]
    };
  },
  methods: {
    handleOneSubmit(params) {
      let totalPrice = this.currentRow.predicet_receipt;
      let url = 'api/order/work/order/plan/receipt/item/update';
      let data = {
        id: this.datas[params.index].id,
        amount: (this.datas[params.index].amounts * this.currentRow.receipt_proportion) / 100,
        receiptPeriod: this.datas[params.index].receipt_periods
      };
      let length = this.datas.filter((v, i) => {
        return !v.amount && !v.amounts;
      }).length;

      if (length == 0) {
        if (
          Number(totalPrice) !==
          this.datas.reduce((a, v) => {
            if (!!v.amount) {
              return (a = a + (Number(v.amount) / this.currentRow.receipt_proportion) * 100);
            }
            if (!!v.amounts) {
              return (a = a + Number(v.amounts));
            }
            return a;
          }, 0)
        ) {
          return this.$Message.warning('所填写的金额须与全部金额一致');
        }
      }
      let doSuccess = res => {
        this.datas[params.index].receipt_period = this.datas[params.index].receipt_periods;
        this.datas[params.index].amount = (this.datas[params.index].amounts * this.currentRow.receipt_proportion) / 100;
      };

      function fail(err) {}
      this.$Post(url, data, doSuccess, fail);
    },
    handleSubmit() {
      let totalPrice = this.currentRow.predicet_receipt;
      // 同时为空或同时为有值得数组
      let tempArray = this.otherdatas.filter(v => {
        if ((v.amount && v.receipt_period) || (!v.amount && !v.receipt_period)) {
          return true;
        }
      });
      // 同时有值得数组
      let tempArray2 = this.otherdatas.filter(v => {
        if (v.amount && v.receipt_period) {
          return true;
        }
      });

      if (this.otherdatas.length > tempArray.length) {
        return this.$Message.warning('金额和日期必须同时填写');
      }

      if (
        this.otherdatas.length == tempArray2.length &&
        tempArray2.reduce((a, v) => {
          return a + Number(v.amount);
        }, 0) !== Number(totalPrice)
      ) {
        console.log(
          tempArray2.reduce((a, v) => {
            return a + Number(v.amount);
          }, 0)
        );
        console.log(Number(totalPrice));

        return this.$Message.warning('金额要和收款金额一致');
      }

      if (
        this.otherdatas.length > tempArray2.length &&
        tempArray2.reduce((a, v) => {
          a = a + Number(v.amount);
        }, 0) > totalPrice
      ) {
        return this.$Message.warning('金额已大于收款金额');
      }
      console.log('tempArray2', tempArray2);
      let url = 'api/order/work/order/plan/receipt/item/create';
      let data = {
        workOrderId: this.currentRow.work_order_id,
        receiptItemJson: JSON.stringify(
          this.otherdatas.map(v => {
            if (!v.amount) {
              return {
                index: 1
              };
            } else {
              return {
                amount: (v.amount * this.currentRow.receipt_proportion) / 100 || null,
                receiptPeriod: v.receipt_period || null
              };
            }
          })
        )
      };
      let doSuccess = res => {
        console.log(res);
        this.openDeclareResult = false;
      };

      function fail(err) {}

      this.$Post(url, data, doSuccess, fail);
    },
    handleDeclareResult() {
      let url = 'api/order/work/order/plan/declare/result';
      let data = {};
      if (this.formItem.finish_status == 'Y') {
        data = {
          workOrderId: this.currentRow.work_order_id,
          finish_status: 'Y',
          predictReceipt: this.formItem.predictReceipt
        };
      } else {
        data = {
          workOrderId: this.currentRow.work_order_id,
          finish_status: 'N',
          memo: this.formItem.memo
        };
      }

      let doSuccess = res => {
        console.log(res);
        this.formItem = Object.assign({}, this.formItem, { predictReceipt: 0 });
      };

      function fail(err) {}

      this.$Post(url, data, doSuccess, fail);
    },
    handleCheck(e) {
      let url = 'api/order/work/order/plan/receipt/detail/list';
      let data = {
        params: {
          workOrderId: e
        }
      };
      let doSuccess = res => {
        this.datas = res.data.data;
      };

      function fail(err) {}

      this.$Get(url, data, doSuccess, fail);
    },
    changeDatas(e) {
      let value = this.period;
      if (value > 0) {
        this.otherdatas = [];
        for (let i = 0; i < value; i++) {
          this.otherdatas.push({
            receipt_period: '',
            time: i + 1,
            amount: ''
          });
        }
      }
      console.log(e);
    }
  },
  created() {
    this.$bus.on('open_company_Collection_flow', e => {
      console.log(e);
      if (e.receipt_type !== 'proportion' || e.finish_status == 'N') {
        return this.$Message.warning('该企业不能分期收款');
      }
      this.openDeclareResult = true;
      if (e.receipt_period) {
        e.receipt_period = e.receipt_period.slice(0, 10);
      }
      this.currentRow = e;
      this.datas = [];
      this.otherdatas = [];
      this.period = '';
      this.handleCheck(e.work_order_id);
    });
  }
};
</script>
