$('#autoDate').datetimepicker({
  language: 'zh-CN',
  weekStart: 1,
  todayBtn: 1,
  autoclose: 1,
  todayHighlight: 1,
  startView: 1,
  minView: 0,
  forceParse: 0,
  // defaultDate:'2019/09/26',
  // defaultTime: '20:00'
});
$('#autoDate').datetimepicker('setDate', '20:00')
// $('#autoDate').datetimepicker('setStartDate', '20:00');

$('.timeDiy').datetimepicker({
  language: 'zh-CN',
  weekStart: 1,
  todayBtn: 1,
  autoclose: 1,
  todayHighlight: 1,
  startView: 2,
  minView: 2,
  forceParse: 0
});

//开机设置
$('#tjOpen>ul>li>a').on('click', function () {
  let openSelect = $(this).attr('data-string')
  if (openSelect === 'auto') {
    $('#tjOpenDate').css('display', 'block')
    $('.tjDiy').css('display', 'none')
  } else {
    $('#tjOpenDate').css('display', 'none')
    $('.tjDiy').css('display', 'block')

  }
})

layui.use('layer', function () {
  $('#openconfirm').on('click', function () {
    let time = $('#opentime').val()
    let openWay = $('#tjOpen>ul>li>a.tj_selected').html()
    if (openWay === '定时启动') {
      if (time !== '') {
        SuccessAlert('设置成功')
      } else {
        ErroAlert('请输入启动时间')
      }
    } else {
      SuccessAlert('设置成功')
    }

  })
})