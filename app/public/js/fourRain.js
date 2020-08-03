'use strict';
$('.list-sec li').on('click', function () {
  // console.log($(this));
  $('.list-sec li').removeClass('listactive');
  $(this).addClass('listactive');
});
$(window).resize(function () {
  tableWidth();
});

tableWidth();
const url1 = 'http://127.0.0.1:7001';
// 封装 async $.ajax
const myRequest = async (params = {}, url) => {
  let data = params.query || {};
  // data.sign = '12d707e8610645a25fdeae6855a96507';
  // data.time = '20180523093655';
  let res = await $.ajax({
    url: url,
    method: params.method || 'GET',
    data: data,
  })
  return res;
}

function tableWidth() {
  let ConWidth = $('#DBContent').css('width').split('p')[0]
  let InfoWidth = $('#DBinfo').css('width').split('p')[0]
  let tabWidth = $('#tableContainer').css('width').split('p')[0]
  let marginWidth = (ConWidth - InfoWidth - tabWidth) / 2 + 'px'
  // console.log(marginWidth)
  $('#tableContainer').css('marginLeft', marginWidth)
}