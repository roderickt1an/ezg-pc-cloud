{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{876:function(e,t,a){\"use strict\";a.r(t);var s={name:\"serviceTemplate_index\",data:function(){var a=this;return{search_model:\"\",serviceitemname:\"\",isCheek:!0,typename:\"\",loading:!0,serviceitemid:\"\",currentPage:1,page:1,pageSize:10,page2:1,pageSize2:10,pageTotal:\"\",pageTotal2:\"\",add:!1,xuanz:!1,title:\"\",task_message:{id:\"\",serviceContractItemId:\"\",remark:\"\",workreport:\"\"},ruleValidate:{serviceContractItemId:[{required:!0,message:\"请选择服务项\"}],workreport:[{required:!0,message:\"请选择工作汇报\"}]},data:[],data2:[],header:[{title:\"服务项\",key:\"serviceitemname\",width:250},{title:\"工作汇报\",key:\"workreport\",ellipsis:!0,width:300},{title:\"创建人\",key:\"createbyrealname\",width:120},{title:\"创建时间\",key:\"createdate\",width:120},{title:\"修改人\",key:\"updatebyrealname\",width:120},{title:\"修改时间\",key:\"updatedate\",width:120},{title:\"操作\",key:\"action\",fixed:\"right\",width:100,align:\"center\",render:function(e,t){return e(\"div\",[e(\"Button\",{props:{type:\"text\",size:\"small\"},on:{click:function(){a.delete(t.row.id)}}},\"[删除]\")])}}],header2:[{title:\"服务项名称\",key:\"serviceitemname\"},{title:\"创建人\",key:\"updateby\"},{title:\"创建时间\",key:\"updatedate\"}]}},methods:{show:function(e){\"Enter\"==e.key&&this.search()},search:function(){this.getData()},reset:function(){this.serviceitemname=\"\",this.getData()},getData:function(){var s=this,e=\"/order/cycle/service/kjdj/summary/template/list?page=\"+s.page+\"&pageSize=\"+s.pageSize+\"&serviceitemname=\"+s.serviceitemname;this.GetData(e,function(e){var t=e.data.data;s.pageTotal=t.total,s.data=[];for(var a=0;a<t.rows.length;a++)s.data.push({id:t.rows[a].id,createbyrealname:t.rows[a].createbyrealname,updatebyrealname:t.rows[a].updatebyrealname,createdate:null!=t.rows[a].createdate?t.rows[a].createdate.substr(0,10):\"\",serviceitemname:t.rows[a].serviceitemname,updatedate:null!=t.rows[a].updatedate?t.rows[a].updatedate.substr(0,10):\"\",workreport:t.rows[a].workreport})})},getData2:function(){var s=this,e=\"/system/serviceContract/item/list?page=\"+s.page2+\"&pageSize=\"+s.pageSize2+\"&templatecode=kjdafwxy\";this.GetData(e,function(e){var t=e.data.data;s.pageTotal2=t.total,s.data2=[];for(var a=0;a<t.rows.length;a++)s.data2.push({updateby:t.rows[a].updateby,id:t.rows[a].id,updatedate:t.rows[a].updatedate,serviceitemname:t.rows[a].serviceitemname})})},pageChange:function(e){this.page=e,this.getData()},pageChange2:function(e){this.page2=e,this.getData2()},pageSizeChange:function(e){this.pageSize=e,this.getData()},pageSizeChange2:function(e){this.pageSize2=e,this.getData2()},luru:function(){this.add=!0,this.title=\"录入\",this.typename=\"add\"},bianji:function(){var s=this,e=\"/order/cycle/service/kjdj/summary/template/detail?id=\"+s.serviceitemid;if(\"\"==s.serviceitemid)this.$Message.warning(\"请选择查看的模板\");else{s.add=!0,s.title=\"编辑\",s.typename=\"edit\",s.GetData(e,function(e){var t=e.data.data;s.task_message.remark=t.remark,s.task_message.id=t.serviceContractItemId,s.task_message.workreport=t.workreport}),s.GetData(\"/system/serviceContract/item/list?page=1&pageSize=10000&templatecode=kjdafwxy\",function(e){for(var t=e.data.data.rows,a=0;a<t.length;a++)s.task_message.id==t[a].id&&(s.task_message.serviceContractItemId=t[a].serviceitemname)})}},chakan:function(){var s=this,e=\"/order/cycle/service/kjdj/summary/template/detail?id=\"+s.serviceitemid;if(s.isCheek=!1,\"\"==s.serviceitemid)this.$Message.warning(\"请选择查看的模板\");else{s.add=!0,s.title=\"查看\",s.typename=\"check\",s.GetData(e,function(e){var t=e.data.data;s.task_message.remark=t.remark,s.task_message.id=t.serviceContractItemId,s.task_message.workreport=t.workreport}),s.GetData(\"/system/serviceContract/item/list?page=1&pageSize=10000&templatecode=kjdafwxy\",function(e){for(var t=e.data.data.rows,a=0;a<t.length;a++)s.task_message.id==t[a].id&&(s.task_message.serviceContractItemId=t[a].serviceitemname)})}},cancel:function(e){this.add=!1,this.isCheek=!0,this.$refs[e].resetFields()},selectRow:function(e){this.serviceitemid=e.id},selectRow2:function(e){this.task_message.id=e.id,this.task_message.serviceContractItemId=e.serviceitemname,this.xuanz=!1},submit:function(e){var i=this,r=this;setTimeout(function(){i.loading=!1,i.$refs[e].validate(function(e){if(e){var t=\"\",a=\"\",s={workreport:r.task_message.workreport,servicecontractitemid:r.task_message.id,remark:r.task_message.remark};\"add\"==r.typename?(t=\"/order/cycle/service/kjdj/summary/template/create\",a=\"录入成功\"):\"edit\"==r.typename&&(t=\"/order/cycle/service/kjdj/summary/template/update\",a=\"编辑成功\",s.id=r.serviceitemid),r.PostData(t,s,function(e){r.cancel(\"task_message\"),r.$Message.success(a),r.currentPage=1,r.page=1,r.getData()},function(e){r.$nextTick(function(){r.loading=!0}),r.$Message.error(e.data.msg)})}else i.$nextTick(function(){i.loading=!0})})},2e3)},delete:function(t){var a=this;this.$Modal.confirm({title:\"删除确认\",content:\"<p>确认删除该记录吗</p>\",onOk:function(){var e={id:t};a.PostData(\"/order/cycle/service/kjdj/summary/template/del\",e,function(){a.currentPage=1,a.page=1,a.getData()})}})}},mounted:function(){this.getData()}},i=a(4),r=Object(i.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",[a(\"Card\",[a(\"Row\",{staticStyle:{\"margin-bottom\":\"20px\"}},[a(\"Collapse\",{model:{value:t.search_model,callback:function(e){t.search_model=e},expression:\"search_model\"}},[a(\"Panel\",{attrs:{name:\"1\"}},[a(\"Icon\",{staticStyle:{\"margin-left\":\"20px\",\"margin-right\":\"5px\"},attrs:{type:\"search\"}}),t._v(\"\\n                    筛选\\n                    \"),a(\"div\",{attrs:{slot:\"content\"},on:{keydown:t.show},slot:\"content\"},[a(\"Form\",{ref:\"formInline\",attrs:{model:t.formInline,\"label-width\":100}},[a(\"Row\",{attrs:{gutter:12}},[a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"serviceitemname\",label:\"服务项名称：\"}},[a(\"Input\",{attrs:{size:\"small\",type:\"text\",placeholder:\"\"},model:{value:t.serviceitemname,callback:function(e){t.serviceitemname=e},expression:\"serviceitemname\"}})],1)],1)],1),t._v(\" \"),a(\"FormItem\",[a(\"Button\",{attrs:{type:\"primary\"},on:{click:t.search}},[t._v(\"搜索\")]),t._v(\" \"),a(\"Button\",{staticStyle:{\"margin-left\":\"20px\"},attrs:{type:\"ghost\"},on:{click:t.reset}},[t._v(\"重置\")])],1)],1)],1)],1)],1)],1),t._v(\" \"),a(\"Row\",[a(\"ButtonGroup\",[a(\"Button\",{attrs:{type:\"primary\",icon:\"ios-color-wand-outline\"},on:{click:t.luru}},[t._v(\"录入\")]),t._v(\" \"),a(\"Button\",{attrs:{type:\"primary\",icon:\"ios-color-wand-outline\"},on:{click:t.bianji}},[t._v(\"编辑\")]),t._v(\" \"),a(\"Button\",{attrs:{type:\"primary\",icon:\"ios-color-wand-outline\"},on:{click:t.chakan}},[t._v(\"查看\")])],1)],1),t._v(\" \"),a(\"Row\",{staticStyle:{\"margin-top\":\"10px\"}},[a(\"Table\",{ref:\"selection\",attrs:{\"highlight-row\":\"\",size:\"small\",columns:t.header,data:t.data},on:{\"on-row-click\":t.selectRow}}),t._v(\" \"),a(\"Page\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{size:\"small\",total:t.pageTotal,current:t.currentPage,\"show-total\":\"\",\"show-sizer\":\"\",\"show-elevator\":\"\"},on:{\"update:current\":function(e){t.currentPage=e},\"on-change\":t.pageChange,\"on-page-size-change\":t.pageSizeChange}})],1)],1),t._v(\" \"),a(\"Modal\",{attrs:{title:t.title,loading:t.loading,width:\"800\"},on:{\"on-ok\":function(e){t.submit(\"task_message\")},\"on-cancel\":function(e){t.cancel(\"task_message\")}},model:{value:t.add,callback:function(e){t.add=e},expression:\"add\"}},[a(\"Form\",{ref:\"task_message\",attrs:{rules:t.ruleValidate,model:t.task_message,\"label-width\":120}},[a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[t._v(\"1\")]),t._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{prop:\"serviceContractItemId\",label:\"服务项：\"}},[a(\"Input\",{attrs:{size:\"small\",type:\"text\",placeholder:\"\",disabled:!t.isCheek},model:{value:t.task_message.serviceContractItemId,callback:function(e){t.$set(t.task_message,\"serviceContractItemId\",e)},expression:\"task_message.serviceContractItemId\"}})],1)],1),t._v(\" \"),a(\"Col\",{attrs:{span:\"2\"}},[a(\"Button\",{directives:[{name:\"show\",rawName:\"v-show\",value:t.isCheek,expression:\"isCheek\"}],attrs:{type:\"primary\"},on:{click:function(e){t.getData2(),t.xuanz=!0}}},[t._v(\"选择\")])],1)],1),t._v(\" \"),a(\"Row\",{attrs:{gutter:24}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[t._v(\"1\")]),t._v(\" \"),a(\"Col\",{attrs:{span:\"20\"}},[a(\"FormItem\",{attrs:{prop:\"workreport\",label:\"工作汇报：\"}},[a(\"Input\",{attrs:{type:\"textarea\",rows:4,disabled:!t.isCheek},model:{value:t.task_message.workreport,callback:function(e){t.$set(t.task_message,\"workreport\",e)},expression:\"task_message.workreport\"}})],1)],1)],1),t._v(\" \"),a(\"Row\",{attrs:{gutter:24}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[t._v(\"1\")]),t._v(\" \"),a(\"Col\",{attrs:{span:\"20\"}},[a(\"FormItem\",{attrs:{prop:\"remark\",label:\"备注：\"}},[a(\"Input\",{attrs:{type:\"textarea\",rows:4,disabled:!t.isCheek},model:{value:t.task_message.remark,callback:function(e){t.$set(t.task_message,\"remark\",e)},expression:\"task_message.remark\"}})],1)],1)],1)],1),t._v(\" \"),t.isCheek?t._e():a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"})],1),t._v(\" \"),a(\"Modal\",{attrs:{title:\"服务项列表\",width:\"800\"},model:{value:t.xuanz,callback:function(e){t.xuanz=e},expression:\"xuanz\"}},[a(\"Table\",{ref:\"selection\",attrs:{\"highlight-row\":\"\",size:\"small\",columns:t.header2,data:t.data2},on:{\"on-row-dblclick\":t.selectRow2}}),t._v(\" \"),a(\"Page\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{size:\"small\",total:t.pageTotal2,\"show-total\":\"\",\"show-sizer\":\"\",\"show-elevator\":\"\"},on:{\"on-change\":t.pageChange2,\"on-page-size-change\":t.pageSizeChange2}})],1)],1)},[],!1,null,null,null);r.options.__file=\"serviceTemplate.vue\";t.default=r.exports}}]);"}