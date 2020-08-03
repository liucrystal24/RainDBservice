
var json_speed =[]
var idname_arr

idandname()
table()


$('.form_date').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});

$('.speed_search').on('click',function () {
    // layui.use('layer', function () {
    //     LoadingAlert('<div><img src="img/loading.gif"></div>\n' +
    //         '    <div>正在加载</div>')
    // })
    $('.loading_window').css('display','block')
    setTimeout(function () {
        var data_speed
        json_speed = []
        console.log(idname_arr);
        var starttime = $('#starttime').val()
        var endtime = $('#endtime').val()
        var speed = $('#speed_sel').val()
        for(var i = 0;i<idname_arr.length;i++){
            his_speed(idname_arr[i].id,idname_arr[i].name,starttime,endtime,speed)
        }
        console.log(json_speed)

        // data_speed = JSON.parse(JSON.stringify(json_speed))
        // console.log(data_speed);
        $("#SpeedTable").bootstrapTable('load', json_speed);
        $('.loading_window').css('display','none')
        // alert(2222)
        console.log(2222)
        // layui.use('layer', function () {
        //     layer.closeAll()
        // })
    },100)

})

//初始化表格
function table() {
    $('#SpeedTable').bootstrapTable({
        url:'',
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
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [5,10],        //可供选择的每页的行数（*）
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
                field: 'Time',
                title: '时间'
            }, {
                field: 'Name',
                title: '车辆'
            }, {
                field: 'Num',
                title: '号码'
            },{
                field:'Speed',
                title:'速度(Km/h)'
            }
        ]
    })
}




//获取制定id历史信息
function his_speed(id,car_name,starttime,endtime,speed){
    $.ajax({
        type: "get",
        url: url1+":8080/NBDServer/servlet/GetInfoByTime",
        data:{'simid':id,'starttime':starttime,'endtime':endtime},
        async: false,
        dataType:"json",
        success : function(data) {
            // $('.loading_window').css('display','block')
            $.each(data,function (i,p) {
                var cookie_speed = parseFloat(p.rate*1.852).toFixed(3)
                if(cookie_speed - speed > 0){
                    var row_speed = {}
                    row_speed.Time = getLocalTime(p.check_time.time)
                    /** 获得id对应的车辆名称 **/
                    row_speed.Name = car_name
                    row_speed.Num = id
                    row_speed.Speed = cookie_speed
                    json_speed.push(row_speed)
                }
            })
        }
    })
}


//请求所有车辆id和车名[{"id":"123","name":"苏K"},{}]
function idandname() {
    idname_arr=[]
    $.ajax({
        url:url1+':8080/NBDServer/servlet/LoadAllCar',
        type:'get',
        dataType:'json',
        // async: false,
        success:function (data) {
            $.each(data,function (i,p) {
                var idname_one ={}
                idname_one.id = p.simid
                idname_one.name = p.idCar
                idname_arr.push(idname_one)
            })
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
}



//时间戳 转普通时间格式(24H)
function getLocalTime(time_chuo) {
    return ( new Date(parseInt(time_chuo)).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-").replace(/   日/g, " "));
}

//加载弹框
function LoadingAlert(e) {
    var index = layer.alert(e, {offset: 'c', closeBtn: 0, btn: [], anim: 1, shade: 0 ,resize:false});
    layer.style(index, {
        color: '#777'
    });
}


