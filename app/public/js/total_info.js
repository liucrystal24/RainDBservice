/**
 * Created by liu on 2018/3/30.
 */
var old_sim
refresh()

function refresh() {
    //初始化表格
    var info_json = info()
    $('#info').bootstrapTable({
        data:info_json,         //请求后台的URL（*）
//			method: 'get',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
////			queryParams: oTableInit.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
//			contentType: "application/x-www-form-urlencoded",
//			strictSearch: true,
//			showColumns: true,                  //是否显示所有的列
//			showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 1,             //最少允许的列数
//			clickToSelect: true,                //是否启用点击选中行
//			height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
//			uniqueId: "yes",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
//			cardView: true,                    //是否显示详细视图
//			detailView: false,                   //是否显示父子表

        columns: [
            {
                field: 'Num',
                title: '号码'
            }, {
                field: 'Service',
                title: '运营商'
            }, {
                field: 'Data',
                title: '每月流量(MB)'
            },{
                field:'Date',
                title:'套餐结束时间'
            },{
                field:'Name',
                title:'车辆名称'
            },{
                field:'edit',
                title:'操作',
                formatter:function (v,r,i) {
                    return [
                        '<button class="btn btn-primary revise" style="margin-left:10%;margin-right: 10%; " data-toggle="modal" data-target="#revise_car">修改</button>',
                        '<button class="btn btn-danger delete" >删除</button>'
                    ].join('');
                }
            }
        ]
    })
}

//异步请求所有车辆信息
function info() {
    var json_info = []
    $.ajax({
        url:url1+':8080/NBDServer/servlet/LoadAllCar',
        type:'get',
        dataType:'json',
        async: false,
        success:function (data) {
            console.log(data);
            $.each(data,function (i,p) {
                var one_info = {}
                one_info.Num = p.simid
                one_info.Service = p.operator
                one_info.Data = p.flow
                one_info.Date = p.etime
                one_info.Name = p.idCar
                json_info.push(one_info)
            })
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
    return json_info
}

//修改按钮
$('.revise').on('click',function () {
    var that = $(this).parent().parent().children()
    $('#car_num').attr('value',that[0].innerHTML)
    old_sim = that[0].innerHTML
    $('#car_service').attr('value',that[1].innerHTML)
    $('#car_data').attr('value',that[2].innerHTML)
    $('#car_date').attr('value',that[3].innerHTML)
    $('#car_name').attr('value',that[4].innerHTML)

})

//确定修改
$('.confirm').on('click',function () {
    var oldsimid = old_sim
    console.log(oldsimid);
    var simid = ($('#car_num').val());
    var operator = $('#car_service').val()
    var flow = $('#car_data').val()
    var etime = $('#car_date').val()
    var idCar= $('#car_name').val()
    $.ajax({
        url:url1+':8080/NBDServer/servlet/UpdateCarInfo',
        type:'post',
        data:{"oldsimid":oldsimid,"simid":simid,"operator":operator,"flow":flow,"etime":etime,"idCar":idCar},
        success:function (data) {
            if(data == 1) {
                alert('修改成功')
                location.reload();
            }else{
                alert('修改失败，检查服务器连接')
            }
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
})

//删除
$('.delete').on('click',function () {
    var simid = $(this).parent().parent().children()[0].innerHTML
    $.ajax({
        url:url1+':8080/NBDServer/servlet/DeleteCarInfo',
        data:{"simid":simid},
        type:'post',
        success:function (data) {
            if(data==1){
                alert('删除成功')
                location.reload();
            }else{
                alert('删除失败，不存在此simid')
            }
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
})
