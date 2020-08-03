$('.context>li>a').on('click', function () {
  var h_l = $('.context').children('li').length
  var h_e = 45
  $(this).parent().addClass('con_selected')
    .siblings().removeClass('con_selected')
    .css('height', '45px')
})


$('.tj>ul>li>a').on('click', function () {
  $(this).addClass('tj_selected')
    .parent().siblings().children().removeClass('tj_selected')
})

//邮票图全选
$('#tjStyle>ul>li>a').on('click', function () {
  let picSelect = $(this).attr('data-string')
  if (picSelect === '3' || picSelect === '4' || picSelect === '5' || picSelect === '6' || picSelect === '7' || picSelect === '8') {
    $('#tjWayS>ul>li>a').addClass('tj_selected2')
    $('#tjWayC>ul>li>a').addClass('tj_selected2')
    console.log(picSelect)
  } else {
    $('#tjWayS>ul>li>a').parent().siblings().children().removeClass('tj_selected2')
    $('#tjWayC>ul>li>a').parent().siblings().children().removeClass('tj_selected2')
  }
})



//错误弹窗
function ErroAlert(e) {
  var index = layer.alert(e, { icon: 8, time: 2000, offset: 'c', closeBtn: 1, title: '错误信息', btn: [], anim: 6, shade: 0 });
  layer.style(index, {
    color: '#777'
  });
}
//修改成功弹窗
function SuccessAlert(e) {
  var index = layer.alert(e, { icon: 1, time: 2000, offset: 'c', closeBtn: 1, title: '设置', btn: [], anim: 6, shade: 0 });
  layer.style(index, {
    color: '#777'
  });
}