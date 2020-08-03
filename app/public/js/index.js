/**
 * Created by liu on 2018/3/22.
 */

//全局变量

var iframWin = document.getElementById("con_right").contentWindow
var warning_data = {}

// admin()
setTimeout(function(){
    refresh()
    id_name()
},500)

setInterval(function () {
    refresh()
},15000)


//左侧导航
$('.context>li>a').on('click',function () {
    var h_l = $('.context').children('li').length
    var h_e = 50
    $(this).parent().addClass('con_selected')
        .siblings().removeClass('con_selected')
        .css('height','50px')
    if($(this).html().indexOf('车辆定位')!=-1){
        $('#warning_total').css('display','block')
    }else{
        $('#warning_total').css('display','none')
    }
    if($(this).siblings().hasClass('context_sec')){
        var h_a =parseInt($(this).css('height').slice(0,-2))
        var h_c =parseInt($(this).siblings().css('height').slice(0, -2))
        var h_t = h_a+h_c
        $(this).parent().css('height',h_t+'px')
        $(this).parent().parent().css('height',h_t+(h_l-1)*h_e+'px')
    }else{
        $(this).parent().parent().css('height',h_l*h_e+'px')
    }
})

//收起主菜单
var last_height
$('#car_up').on('click','i',function () {
    var height = $('.context').css('height')
    if(height == '0px'){
        console.log(1)
        var close = `<i class="material-icons">keyboard_arrow_up</i>收起`
        $(this).parent().html(close)
        $('.context').css('height',last_height)
    }else{
        console.log(2)
        var open =`<i class="material-icons">keyboard_arrow_down</i>展开`
        $(this).parent().html(open)
        last_height = height
        $('.context').css('height','0px')
    }
})


/**测试父子元素**/

//接受子界面
window.addEventListener('message',function (e) {
    console.log(e.data)
},false)


// 验证账号密码
function admin(){
    if(sessionStorage['Beidoucar_username']==undefined || sessionStorage['Beidoucar_password']==undefined){
        location.href='login.html'
    }
}

//超速监控确认
$('#speed_open').on('click',function () {
    var speed_state = 'speed_'+$("#switch-state-speed").bootstrapSwitch('state')
    var drop_car = $('.speed_car').val()
    var drop_speed = $('.drop_speed').val()
    warning_data.speed = [speed_state,drop_car,drop_speed]
    $(this).parent().parent().siblings().trigger('click')
    //向子界面发送
    iframWin.postMessage(warning_data,'*')
})

//区域报警确认
$('#area_open').on('click',function () {
    var area_state = 'area_'+$("#switch-state-area").bootstrapSwitch('state')
    var drop_car = $('.area_car').val()
    var drop_area = $('.drop_area').val()
    warning_data.area = [area_state,drop_car,drop_area]
    $(this).parent().parent().siblings().trigger('click')
    //向子界面发送
    iframWin.postMessage(warning_data,'*')
})

//超速区域打开菜单
$('#warning_total>ul>li>a').on('click',function () {
    change_state($(this))
})

//超速区域切换开关
function change_state(e) {
    var height = e.siblings().css('height')
    var that=e
    if(height == '0px'){
        e.children()[1].innerHTML='keyboard_arrow_down'
        e.siblings().css('height','176px')
        setTimeout(function () {
            that.siblings().removeClass('over')
        },200)
    }else{
        e.children()[1].innerHTML='keyboard_arrow_right'
        e.siblings().css('height',0)
        e.siblings().addClass('over')

    }
}

//时间转换
function getLocalTime(time_chuo) {
    return ( new Date(parseInt(time_chuo)).toLocaleString().replace(/年|月/g, "-").replace(/   日/g, " "));
}

//左侧信号强弱表格
function refresh() {
    var id_all=info()
    var table_all = sign_all()
    var s_html
    if(id_all==''){
        s_html=''
    }else{
        s_html='<tr><td>号码</td><td>信号</td><tr>'
        $.each(table_all,function (i,p) {
            console.log(p);
            if(p.signal=='强'){
                s_html += `<tr><td>${p.Num}</td><td><p class='sign0'><img src='img/sign_1.png'></p>`
                if(p.online == 'on'){
                    s_html+= `<p class='sign0'><img src='img/location_on.png'></p></td></tr>`
                }else{
                    s_html+= `<p class='sign0'><img src='img/location_off.png'></p></td></tr>`
                }
            }else{
                s_html += `<tr><td>${p.Num}</td><td><p class='sign0'><img src='img/sign_0.png'></p>`
                if(p.online == 'on'){
                    s_html+= `<p class='sign0'><img src='img/location_on.png'></p></td></tr>`
                }else{
                    s_html+= `<p class='sign0'><img src='img/location_off.png'></p></td></tr>`
                }
            }
        })
        $('#sign').html(s_html)
    }
}

//异步请求所有车辆id
function info() {
    var json_id = []
    $.ajax({
        url:url1+':8080/NBDServer/servlet/LoadAllCar',
        type:'get',
        dataType:'json',
        async: false,
        success:function (data) {
            console.log(data);
            $.each(data,function (i,p) {
                json_id.push(p.simid)
            })
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
    return json_id
}

//异步请求所有车辆id和车名
function id_name() {
    $.ajax({
        url:url1+':8080/NBDServer/servlet/LoadAllCar',
        type:'get',
        dataType:'json',
        success:function (data) {
            var drop_html = ''
            $.each(data,function (i,p) {
                drop_html+= `<option data-subtext='${p.idCar}'>${p.simid}</option>`;
            })
            $('.speed_car').html(drop_html)
            $('.area_car').html(drop_html)
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
}

//根据id 获得所有小车的信号强弱
function id_sign(id) {
    var sign_num
    var online
    $.ajax({
        url:url1+':8080/NBDServer/servlet/GetCurrentLocation',
        type:'post',
        data:{'simid':id},
        dataType:'json',
        async: false,
        success:function (data) {
            console.log(data);
            var date = new Date().getTime()
            if(data=='' || date - data[0].check_time.time > 60000){
                online = 'off'
            }else{
                online = 'on'
            }
            if(data=='' || data[0].pattern!='A' || data[0].LOC_State!='A'){
                sign_num = '弱'
            }else{
                sign_num ='强'
            }
        },
        error:function () {
            alert('网络连接有误，请检查网络连接')
        }
    })
    return [sign_num,online]
}

//循环获得每个小车的信号
function sign_all() {
    var id_arr = info()
    var sign_table = []
    for (var i = 0; i < id_arr.length; i++) {
        var sign_one = {}
        sign_one.Num = id_arr[i]
        sign_one.signal = id_sign(id_arr[i])[0]
        sign_one.online = id_sign(id_arr[i])[1]
        sign_table.push(sign_one)
    }
    return sign_table
}
