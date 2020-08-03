'use strict';
table();
// 封装一个接口地址
const tankongList = (params) => myRequest(params, url1 + '/FJtankongList');
const tankongListSearch = (params) => myRequest(params, url1 + '/FJtankongsearch');
// 传参执行
tankongList({ query: {} }).then(res => {
  console.log(res)
  let tankongdata = res.info.tankong
  for (let i = 0; i < 2; i++) {
    let test1 = tankongdata[i].datetime
    console.log(test1)
    console.log(typeof (test1))
  }
  $(".RainTable").bootstrapTable('load', tankongdata);
  $('#Cloading').css('display', 'none')
});

$('#BtnSearch').on('click', function () {
  $('#Cloading').css('display', 'block')
  console.log(1)
  tankongListSearch({ query: {} }).then(res => {
    console.log(res)
    let tankongdata = res.info.tankongsearch1
    for (let i = 0; i < 3; i++) {
      let test1 = tankongdata[i].datetime
      console.log(test1)
      console.log(typeof (test1))
    }
    $(".RainTable").bootstrapTable('load', tankongdata);
    $('#Cloading').css('display', 'none')
  });
})

function table() {
  $('.RainTable').bootstrapTable({
    url: '',
    //         data: json,         //请求后台的URL（*）
    method: 'get',                      //请求方式（*）
    toolbar: '#toolbar',                //工具按钮用哪个容器
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: true,                   //是否显示分页（*）
    sortable: false,                     //是否启用排序
    sortOrder: "asc",                   //排序方式
    ////			queryParams: oTableInit.queryParams,//传递参数（*）
    sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                       //初始化加载第一页，默认第一页
    pageSize: 10,                       //每页的记录行数（*）
    pageList: [10],        //可供选择的每页的行数（*）
    // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    //			contentType: "application/x-www-form-urlencoded",
    //			strictSearch: true,
    //			showColumns: true,                  //是否显示所有的列
    //			showRefresh: true,                  //是否显示刷新按钮
    minimumCountColumns: 1,             //最少允许的列数
    // clickToSelect: true,                //是否启用点击选中行
    //			height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    //			uniqueId: "yes",                     //每一行的唯一标识，一般为主键列
    showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
    //			cardView: true,                    //是否显示详细视图
    //			detailView: false,                   //是否显示父子表
    columns: [
      {
        field: 'datetime',
        title: '时间'
      }, {
        field: '站号',
        title: '站号'
      }, {
        field: '纬度',
        title: '纬度'
      }, {
        field: '经度',
        title: '经度'
      }, {
        field: '海拔',
        title: '海拔'
      }, {
        field: 'unknown',
        title: 'unknown'
      }, {
        field: '气压',
        title: '气压'
      }, {
        field: '高度',
        title: '高度'
      }, {
        field: '温度',
        title: '温度'
      }, {
        field: '位温',
        title: '位温'
      }, {
        field: '风向',
        title: '风向'
      }, {
        field: '风速',
        title: '风速'
      }
    ]
  })
}