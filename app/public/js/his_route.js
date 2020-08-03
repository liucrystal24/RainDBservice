/**
 * Created by liu on 2018/3/28.
 */

id__name()

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

//地图
var map = new BMap.Map("his_map");
var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
map.enableScrollWheelZoom();
map.addControl(top_left_control);
map.addControl(top_left_navigation);

//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
    mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));



$('.confirm>button').on('click',function () {
    map.clearOverlays();
    var id = $('#car_read').val()
    var starttime = $('#starttime').val()
    var endtime = $('#endtime').val()
    $('.loading_window').css('display','block')
    setTimeout(function () {
        his_route(id,starttime,endtime)
    },100)
})


//获取历史轨迹数组
function his_route(id,starttime,endtime) {
    console.log(id);
    $.ajax({
        url:url1+':8080/NBDServer/servlet/GetInfoByTime',
        type:'post',
        data:{'simid':id,'starttime':starttime,'endtime':endtime},
        dataType:'json',
        success:function (data) {
            console.log(data)
                var route_correct = []
                for(var i=0;i<data.length;i++) {
                    if (data[i].LOC_State != 'V' & data[i].pattern != 'N') {
                        route_correct.push(data[i])
                    }
                }
                console.log(route_correct)
                if(route_correct.length==0){
                    $('.loading_window').css('display','none')
                    layui.use('layer', function () {
                        ErrorAlert('该时段没有轨迹,请更换时间重新查询','错误提醒')
                    })
                }else{
                    //获得了所有有效点，开始分组历史数据
                    var route_section = []
                    var route_total =[]
                    var section_all = section(route_correct,route_section,route_total)
                    center(section_all)
                    //9个一组分组进行百度地图轨迹画,每10个最后一个点放入下一个的数组，第一个数组为9个
                    //闭包!!!!!!!
                    var Bibao = 0
                    for(i = 0;i < section_all.length;i++) {
                        (function () {
                            var last_info = section_all[i][section_all[i].length - 1];
                            var last_info_need = {}
                            last_info_need.id = last_info.SIMID
                            last_info_need.time = last_info.check_time.time
                            var one_RouteColor = route_color()
                            // console.log(last_info_need);
                            // console.log(one_RouteColor);
                            var car_ten_last= ''
                            var car_ten =[]
                            var car_arrival=[]
                            var nine_num = Math.ceil(section_all[i].length/9)
                            var cal_num = 0
                            for(m = 0;m < nine_num;m++){
                                // console.log(one_RouteColor);
                                car_ten = []
                                if(car_ten_last !=''){
                                    car_ten.unshift(car_ten_last)
                                }
                                for(j = cal_num;j < cal_num+9;j++){
                                    if(section_all[i][j]!=undefined){
                                        var lat = section_all[i][j].S_Latitude
                                        var long = section_all[i][j].S_Longitude
                                        var point = new BMap.Point(long, lat)
                                        car_ten.push(point)
                                    }
                                }
                                // var one_RouteColor = route_color()
                                car_ten_last = car_ten[car_ten.length-1];
                                if(m==nine_num-1){
                                    car_arrival.push(car_ten_last);
                                    console.log(car_ten_last)
                                }
                                // console.log(car_ten)
                                translateCallback = function (data){
                                    if(data.status === 0) {
                                        var polyline = new BMap.Polyline(data.points, {strokeColor:one_RouteColor, strokeWeight:2, strokeOpacity:1});
                                        map.addOverlay(polyline); //添加GPS marker
                                    }
                                };
                                translateCallback2=function(data){
                                    console.log(last_info_need);
                                    var myIcon = new BMap.Icon("img/route_car.png", new BMap.Size(47,35))
                                    var marker= new BMap.Marker(data.points[0],{icon:myIcon});
                                    map.addOverlay(marker);
                                    var opts = {
                                        width : 200,     // 信息窗口宽度
                                        height: 50,     // 信息窗口高度
                                        title : "车辆信息" , // 信息窗口标题
                                        enableMessage:false//设置允许信息窗发送短息
                                    }
                                    var infoWindow = new BMap.InfoWindow('号码: '+last_info_need.id+'<br>'+'时间: '+getLocalTime(last_info_need.time), opts);  // 创建信息窗口对象
                                    marker.addEventListener("click", function(){
                                        map.openInfoWindow(infoWindow,marker.point); //开启信息窗口
                                    });

                                };
                                var convertor = new BMap.Convertor();
                                convertor.translate(car_ten, 1, 5, translateCallback);
                                if(car_arrival!=''){
                                    convertor.translate(car_arrival, 1, 5, translateCallback2);
                                }

                                cal_num = cal_num+9
                            }
                            Bibao++
                        })(Bibao)
                    }
                    $('.loading_window').css('display','none')
                }
            //}
        },
        error:function () {
            alert('网络连接有误，请检查网络')
        }
    })

}

//分组每个段的历史轨迹
function section(correct,sect,total) {
    for (var i = 0; i < correct.length; i++) {
        if (i==0 || correct[i].check_time.time-correct[i-1].check_time.time<900000){
            sect.push(correct[i])
            if(i==correct.length-1){
                total.push(sect)
            }
        }else{
            total.push(sect)
            sect = []
            sect.push(correct[i])
            if(i==correct.length-1){
                total.push(sect)
            }
        }
    }
    return total
}

//随机颜色话地图轨迹 递归，只取深色
function route_color() {
    var __Color
    return color()
}

function color() {
    var r = parseInt(Math.random()*255)
    var g = parseInt(Math.random()*255)
    var b = parseInt(Math.random()*255)
    if(r * 0.299 + g * 0.587 + b * 0.114>192){
        color()
    }else{
        __Color = 'rgb('+r+','+g+','+b+')'
    }
    return __Color
}

function getLocalTime(time_chuo) {
    return ( new Date(parseInt(time_chuo)).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-").replace(/   日/g, " "));
}

function center(arr) {
    if(arr.length!=0){
        console.log(arr)
        var info = arr[0][0]
        var Lat = info.S_Latitude
        var Long = info.S_Longitude
        map.centerAndZoom(new BMap.Point(Long, Lat), 16)
    }
}

function id__name() {
    $.ajax({
        url:url1+':8080/NBDServer/servlet/LoadAllCar',
        type:'get',
        dataType:'json',
        success:function (data) {
            var drop_html = ''
            $.each(data,function (i,p) {
                drop_html+= `<option data-subtext='${p.idCar}'>${p.simid}</option>`;
            })
            $('#car_read').html(drop_html)
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
}


//报错弹框
function ErrorAlert(e,title) {
    var index = layer.alert(e, { icon: 8, time: 5000, offset: 'c', closeBtn: 1, title: title, btn: [], anim: 6, shade: 0 });
    layer.style(index, {
        color: '#777'
    });
}