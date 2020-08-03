/** 2018-4-9
 * CrystalLiu **/


/** 全局变量 **/
var map = new BMap.Map("allmap");
var speed_watch
var area_watch


/** 地图控件加载 **/
//中心
map.centerAndZoom(new BMap.Point(118.824372, 32.034304), 18);
//路况提示
var ctrl = new BMapLib.TrafficControl({
    showPanel: true //是否显示路况提示面板
});
var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件

//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
    mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));

//路况，左上角大小尺
map.addControl(ctrl);
ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
map.addControl(top_left_control);
map.addControl(top_left_navigation);
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用


/** 发送超速和区域开关 **/

//接受主界面信息,超速和区域监控开关情况
window.addEventListener('message',function (e) {
    speed_watch = e.data.speed
    area_watch = e.data.area
    console.log(e.data);
},false)

//向主界面发送
//parent.postMessage('Im son','*')

//定时器开关
setInterval(function () {
    position_refresh()
},16000)


position_refresh()



/** 功能主函数 **/

//定位刷新(多辆车，超速，超区域报警)
function position_refresh() {
    var car_all = info()
    console.log(car_all);
    var Bibao_position = 0
    for (var i = 0; i <car_all.length; i++) {
        //所有车定位
        (function () {
            position(car_all[i].Num)
            Bibao_position++
        })(Bibao_position)

    }
}

//获取所有的车辆信息
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

//根据simid请求最新位置
function position(id) {
    $.ajax({
        url:url1+':8080/NBDServer/servlet/GetCurrentLocation',
        type:'post',
        data:{'simid':id},
        dataType:'json',
        success:function (data) {
            console.log(data)
            if(data!=''){
                if(data[0].LOC_State =='V' || data[0].pattern =='N'){
                    layui.use('layer', function () {
                        console.log('当前信号较弱，车辆 '+id+' 定位无效','信号提示')
                        //alert(id)
                    })
                }else{
                    speed_warning(data[0])
                    var lat = data[0].S_Latitude
                    var long = data[0].S_Longitude
                    var cur_point = new BMap.Point(long, lat)
                    var cur_time = getLocalTime(data[0].check_time.time)
                    //速度 节 -> km/h x*1.852
                    var cur_speed = parseFloat(data[0].rate*1.852).toFixed(3)
                    console.log(speed_watch);
                    //超速监控
                    speed_warning(id,cur_speed)
                    //区域监控
                    area_warning(id,cur_point)
                    console.log(id,long,lat,cur_time,cur_speed)
                    draw_point(id,long,lat,cur_time,cur_speed)
                    // draw_point('1445','118.824372','32.034304','2018-04-27','55')
                }
            }
        },
        error:function () {
            alert('网络连接失败，请检查网络连接')
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

//baidu画点函数(矫正位置){Simid/Slongitude/SLatitude/rate(速度)/checkTime(入库时间)}
function draw_point(id,long,lat,cur_time,cur_speed) {
    var point = new BMap.Point(long, lat)
    //data & data.points[0]不用修改
    translateCallback = function (data){
        var myIcon = new BMap.Icon("img/position_car.png", new BMap.Size(25,25))
        var marker2 = new BMap.Marker(data.points[0],{icon:myIcon})
        console.log(data.points)
        console.log(marker2)
        map.addOverlay(marker2)
        //设置备注框
        var opts = {
            width : 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "车辆信息" , // 信息窗口标题
            enableMessage:false//设置允许信息窗发送短息
        }
        var infoWindow = new BMap.InfoWindow('号码: '+id+'<br>'+'时间: '+cur_time+'<br>'+'速度: '+cur_speed+'Km/h', opts);  // 创建信息窗口对象
        marker2.addEventListener("click", function(){
            map.openInfoWindow(infoWindow,marker2.point); //开启信息窗口
        });
        map.setCenter(data.points[0])
    }
    setTimeout(function(){
        var convertor = new BMap.Convertor();
        var pointArr = []
        pointArr.push(point)
        convertor.translate(pointArr, 1, 5, translateCallback)
    }, 1)

}

//时间戳 转普通时间格式(24H)
function getLocalTime(time_chuo) {
    return ( new Date(parseInt(time_chuo)).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-").replace(/   日/g, " "));
}

//超速监控
function speed_warning(id,speed) {
    if(speed_watch!=undefined && speed_watch[0]!='speed_false'){
        if(id==speed_watch[1]){
            if(speed-speed_watch[2]>0){
                layui.use('layer', function () {
                    ErrorAlert('车辆 '+id+' 已超速','超速报警');
                })
            }
        }
    }
}

//区域监控
function area_warning(id,point) {
    if(area_watch!=undefined && area_watch[0]!='area_false'){
        if(id==area_watch[1]){
            getBoundary(id,point,area_watch[2])
        }
    }
}

//区域函数
function getBoundary(id,point,city){
    var bdary = new BMap.Boundary();
    var result=0;
    bdary.get(city, function(rs){       //获取行政区域
//            map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
            alert('未能获取当前输入行政区域');
            return ;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
            /**添加判断*/
            result_tf = BMapLib.GeoUtils.isPointInPolygon(point, ply)
            if(result_tf){
                result++
            }
            //map.addOverlay(ply);  //添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
        }
        /**根据result,判断是否报警*/
        console.log(result)
        if(result == 0){
            layui.use('layer', function () {
                ErrorAlert('车辆 '+id+' 已超出 '+city,'区域报警');
            })
        }
        //map.setViewport(pointArray);    //调整视野
    });
}

//根据点的描绘，计算总里程函数
function distance() {
    var route1 = [
        new BMap.Point(118.5, 32),
        new BMap.Point(119.5, 32),
        new BMap.Point(118.5, 33)
    ]
    var route2 = [
        new BMap.Point(117.6, 32.5),
        new BMap.Point(117.6, 32.6),
        new BMap.Point(118.6, 33)
    ]
    var route_arr = [route1,route2]
    var total_distance = 0
    for(i=0;i<route_arr.length;i++){
        var polyline = new BMap.Polyline(route_arr[i],{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5})
        map.addOverlay(polyline)
        var __distance = BMapLib.GeoUtils.getPolylineDistance(polyline)
        total_distance = parseFloat(total_distance + __distance)
    }
    //显示公里数
    return parseFloat(total_distance/1000).toFixed(2)
}