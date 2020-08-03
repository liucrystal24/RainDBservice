/**
 * Created by liu on 2018/3/30.
 */
$('#confirm').on('click',function () {
    var car_num = $('#car_num').val()
    var car_serve = $('#car_serve').val()
    var car_month = $('#car_month').val()
    var car_deadline = $('#car_deadline').val()
    var car_name = $('#car_name').val()
    $.ajax({
        url:url1+':8080/NBDServer/servlet/SaveCarInfo',
        data:{"simid":car_num,"operator":car_serve,"flow":car_month,"etime":car_deadline,'idCar':car_name},
        type:'post',
        success:function (data) {
            if(data==1){
                alert('录入成功')
                $('#logging').reset()
            }
            else if(data==-1){
                alert('已有相同的号，请勿重复录入')
            }else{
                alert('插入失败，请检查网络连接')
            }
        },
        error:function () {
            alert('网络连接失败，请刷新重试')
        }
    })
})
