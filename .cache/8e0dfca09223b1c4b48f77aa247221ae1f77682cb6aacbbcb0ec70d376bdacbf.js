{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{456:function(e,t,a){},457:function(e,t,a){},726:function(e,t,a){\"use strict\";var r=a(456);a.n(r).a},728:function(e,t,a){\"use strict\";var r=a(457);a.n(r).a},856:function(e,t,a){\"use strict\";a.r(t);function r(e){if(null==e||\"\"==e)return\"\";var t=new Date(e),a=\"\"+(t.getMonth()+1),r=\"\"+t.getDate(),n=t.getFullYear();return a.length<2&&(a=\"0\"+a),r.length<2&&(r=\"0\"+r),[n,a,r].join(\"-\")}var n={name:\"transactionRecord_index\",data:function(){var a=this;return{loading:!1,orderItem:[],openShowOrderDetail:!1,orderDetailListHeaderShow:[{title:\"序号\",type:\"index\",minWidth:60,align:\"center\"},{title:\"产品名\",key:\"product\",minWidth:150},{title:\"产品属性\",key:\"propertys\",minWidth:250,render:function(e,t){return e(\"div\",{domProps:{innerHTML:t.row.propertys}})}},{title:\"产品价格\",key:\"oaprice\",minWidth:100},{title:\"产品数量（个/月）\",key:\"productnumber\",minWidth:150},{title:\"销售价格\",key:\"paynumber\",minWidth:100},{title:\"赠送数量\",key:\"givethenumber\",minWidth:100},{title:\"服务开始税期\",key:\"servicestartdate\",minWidth:120},{title:\"服务部门\",key:\"departname\",minWidth:140},{title:\"单价/月\",key:\"unitprice\",minWidth:90},{title:\"备注\",key:\"memo\",minWidth:300,render:function(e,t){var a=new RegExp(\"</br>\",\"g\");return e(\"div\",[e(\"Input\",{props:{value:t.row.memo.replace(a,\"\\n\"),autosize:!0,type:\"textarea\",size:\"small\",readonly:!0},style:{width:\"100%\"}})])}}],search_model:\"\",ishandleSubmit:!1,SearchValidate:{customername:\"\",customertel:\"\",date:[]},isEidt:!1,modal1:!1,modal2:!1,issendValue:[],orderItemList3:[],formValidate:{companyname:\"\",name:\"\",realnumber:\"\",tel:\"\",updatedate:\"\",createby:\"\"},columns:[{type:\"index\",width:60,align:\"center\"},{title:\"订单号码\",key:\"ordercode\",minWidth:150},{title:\"公司名称\",key:\"companyname\",render:function(t,e){return\"\"==e.row.companyname||null==e.row.companyname?\"\":t(\"Poptip\",{props:{trigger:\"hover\",title:\"公司名称\",placement:\"bottom\"}},[t(\"span\",a.data[e.index].companyname[0].name+\"\"),t(\"Icon\",{props:{type:\"arrow-down-b\"}}),t(\"div\",{slot:\"content\"},[t(\"ul\",a.data[e.index].companyname.map(function(e){return[t(\"li\",{style:{padding:\"4px\"}},\"公司名：\"+e.name)]}))])])},ellipsis:!0,minWidth:300},{title:\"客户名称\",key:\"name\",minWidth:100},{title:\"客户电话\",key:\"tel\",minWidth:120},{title:\"已付款\",key:\"realnumber\",minWidth:120},{title:\"创建时间\",key:\"updatedate\",minWidth:150},{title:\"创建人\",key:\"crealname\",minWidth:120},{title:\"操作\",key:\"action\",fixed:\"right\",width:70,align:\"center\",render:function(e,t){return e(\"div\",[e(\"Button\",{props:{type:\"text\",size:\"small\",permission:\"['transactionR.cheek']\"},style:{marginRight:\"5px\"},on:{click:function(){a.detail(t.row)}}},\"详情\")])}}],columns1:[{title:\"产品名称\",key:\"product\"},{title:\"产品属性\",key:\"propertys\"},{title:\"产品数量\",key:\"productnumber\"},{title:\"销售价格\",key:\"paynumber\"}],data:[],pageTotal:0,page:1,pageSize:10,customerid:\"\",tableLoading:!1}},methods:{selectRow:function(){},handleReset:function(){this.SearchValidate.customername=\"\",this.SearchValidate.customertel=\"\",this.SearchValidate.date=\"\",this.getTableData()},Search:function(){0==this.ishandleSubmit&&(this.page=1),this.ishandleSubmit=!0,this.getTableData()},downloadExcel:function(){var e={page:\"1\",pageSize:\"1000000\",customername:this.SearchValidate.customername,customertel:this.SearchValidate.customertel,bcreatedate:r(this.SearchValidate.date[0]),bUpdatedate:r(this.SearchValidate.date[1]),export:\"Y\",exportField:encodeURI(JSON.stringify([{field:\"ordercode\",title:\"订单号码\"},{field:\"companyname\",title:\"公司名称\"},{field:\"name\",title:\"客户名称\"},{field:\"paynumber\",title:\"已付款\"},{field:\"base_createdate\",title:\"创建时间\"},{field:\"crealname\",title:\"创建人\"}]))},t=this.$MergeURL(\"api/order/queryListByChannel\",e);window.open(t)},getTableData:function(){var n=this;n.tableLoading=!0,n.data=[];var e={params:{sortField:\"id\",order:\"desc\",page:n.page,pageSize:n.pageSize,customername:n.SearchValidate.customername,customertel:n.SearchValidate.customertel,bcreatedate:r(n.SearchValidate.date[0]),bUpdatedate:r(n.SearchValidate.date[1])}};for(var t in n.SearchValidate)\"\"!=n.SearchValidate[t]&&null!=n.SearchValidate[t]||delete e.params[t],\"\"!=n.SearchValidate.date&&null!=n.SearchValidate.date||(delete e.params.eUpdatedate,delete e.params.eUpdatedate);n.$http.get(\"api/order/queryListByChannel\",e).then(function(e){n.$backToLogin(e),function(e){n.tableLoading=!1,n.pageTotal=e.data.data.total;for(var t=0;t<e.data.data.rows.length;t++){var a=[{name:e.data.data.rows[t].companyname}],r=\"\";null==e.data.data.rows[t].updatedate||\"\"==e.data.data.rows[t].updatedate||(r=e.data.data.rows[t].updatedate.substr(0,10)),n.data.push({ordercode:e.data.data.rows[t].ordercode,companyname:a,name:e.data.data.rows[t].name,tel:e.data.data.rows[t].tel,updatedate:r,crealname:e.data.data.rows[t].crealname,realnumber:e.data.data.rows[t].realnumber,id:e.data.data.rows[t].id})}}(e)})},pageChange:function(e){this.page=e,this.getTableData()},pageSizeChange:function(e){this.pageSize=e,this.getTableData()},detail:function(e){var a=this,t=\"api/order/detail/\"+e.id;a.loading=!0,a.modal2=!0,a.formValidate.companyname=e.companyname[0].name,a.formValidate.name=e.name,a.formValidate.tel=e.tel,a.formValidate.updatedate=e.updatedate,a.formValidate.createby=e.crealname,a.formValidate.realnumber=e.realnumber,this.$Get(t,{},function(e){var t=e.data.data;a.orderItem=t.items,a.loading=!1})}},mounted:function(){this.getTableData()}},l=(a(726),a(728),a(4)),i=Object(l.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",[a(\"Card\",[a(\"Row\",{staticStyle:{\"margin-bottom\":\"10px\"}},[a(\"Collapse\",{model:{value:t.search_model,callback:function(e){t.search_model=e},expression:\"search_model\"}},[a(\"Panel\",{attrs:{name:\"1\"}},[a(\"Icon\",{staticStyle:{\"margin-left\":\"20px\",\"margin-right\":\"5px\"},attrs:{type:\"search\"}}),t._v(\"\\n                            筛选\\n                            \"),a(\"div\",{attrs:{slot:\"content\"},on:{keydown:function(e){return\"button\"in e||!t._k(e.keyCode,\"enter\",13,e.key,\"Enter\")?t.Search(e):null}},slot:\"content\"},[a(\"Form\",{ref:\"SearchValidate\",attrs:{model:t.SearchValidate,\"label-width\":80}},[a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{label:\"客户名称：\",prop:\"customername\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:t.SearchValidate.customername,callback:function(e){t.$set(t.SearchValidate,\"customername\",e)},expression:\"SearchValidate.customername\"}})],1)],1),t._v(\" \"),a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{label:\"联系方式：\",prop:\"customertel\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:t.SearchValidate.customertel,callback:function(e){t.$set(t.SearchValidate,\"customertel\",e)},expression:\"SearchValidate.customertel\"}})],1)],1),t._v(\" \"),a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{label:\"创建时间：\",prop:\"date\"}},[a(\"DatePicker\",{staticStyle:{width:\"100%\"},attrs:{transfer:\"\",type:\"daterange\",size:\"small\",placement:\"bottom-end\"},model:{value:t.SearchValidate.date,callback:function(e){t.$set(t.SearchValidate,\"date\",e)},expression:\"SearchValidate.date\"}})],1)],1)],1),t._v(\" \"),a(\"center\",[a(\"FormItem\",[a(\"Button\",{attrs:{type:\"primary\"},on:{click:t.Search}},[t._v(\"搜索\")]),t._v(\" \"),a(\"Button\",{staticStyle:{\"margin-left\":\"8px\"},attrs:{type:\"ghost\"},on:{click:function(e){t.handleReset(\"SearchValidate\")}}},[t._v(\"\\n                                                重置\\n                                            \")])],1)],1)],1)],1)],1)],1)],1),t._v(\" \"),a(\"Row\",[a(\"ButtonGroup\",[a(\"Button\",{directives:[{name:\"permission\",rawName:\"v-permission\",value:[\"transactionR.export\"],expression:\"['transactionR.export']\"}],attrs:{type:\"primary\",icon:\"ios-color-wand-outline\"},on:{click:t.downloadExcel}},[t._v(\"导出Excel\")])],1)],1),t._v(\" \"),a(\"Row\",{staticStyle:{\"margin-top\":\"10px\"}},[a(\"Table\",{attrs:{loading:t.tableLoading,\"highlight-row\":\"\",size:\"small\",columns:t.columns,data:t.data},on:{\"on-row-dblclick\":t.detail}}),t._v(\" \"),a(\"Page\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{size:\"small\",total:t.pageTotal,\"show-total\":\"\",current:t.page,\"show-sizer\":\"\",\"show-elevator\":\"\"},on:{\"update:current\":function(e){t.page=e},\"on-change\":t.pageChange,\"on-page-size-change\":t.pageSizeChange}})],1)],1),t._v(\" \"),a(\"Modal\",{attrs:{title:\"详情\",width:1300,\"class-name\":\"vertical-center-modal\"},model:{value:t.modal2,callback:function(e){t.modal2=e},expression:\"modal2\"}},[a(\"Form\",{ref:\"formValidate\",attrs:{model:t.formValidate,\"label-width\":70}},[a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"公司名\",prop:\"companyname\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.formValidate.companyname,callback:function(e){t.$set(t.formValidate,\"companyname\",e)},expression:\"formValidate.companyname\"}})],1)],1),t._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"客户名\",prop:\"name\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.formValidate.name,callback:function(e){t.$set(t.formValidate,\"name\",e)},expression:\"formValidate.name\"}})],1)],1)],1),t._v(\" \"),a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"已付款\",prop:\"realnumber\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.formValidate.realnumber,callback:function(e){t.$set(t.formValidate,\"realnumber\",e)},expression:\"formValidate.realnumber\"}})],1)],1),t._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"电话\",prop:\"tel\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.formValidate.tel,callback:function(e){t.$set(t.formValidate,\"tel\",e)},expression:\"formValidate.tel\"}})],1)],1)],1),t._v(\" \"),a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"创建时间\",prop:\"updatedate\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.formValidate.updatedate,callback:function(e){t.$set(t.formValidate,\"updatedate\",e)},expression:\"formValidate.updatedate\"}})],1)],1),t._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"创建人\",prop:\"createby\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.formValidate.createby,callback:function(e){t.$set(t.formValidate,\"createby\",e)},expression:\"formValidate.createby\"}})],1)],1)],1)],1),t._v(\" \"),a(\"Row\",{staticStyle:{\"margin-top\":\"10px\"}},[a(\"Table\",{attrs:{columns:t.orderDetailListHeaderShow,data:t.orderItem,loading:t.loading,border:\"\",size:\"small\",id:\"show-order-item\"}})],1),t._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"})],1)],1)},[],!1,null,null,null);i.options.__file=\"transactionRecord.vue\";t.default=i.exports}}]);"}