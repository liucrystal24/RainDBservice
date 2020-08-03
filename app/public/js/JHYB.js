session()

$('#file').on('change', function () {
  let urlFile = $('#file').val()
  let nameFile = $('#file')[0].files[0].name
  let DateName = nameFile.split('.')[1]
  $('#DataUrl').val(DateName)
})

$('.form_date').datetimepicker({
  language: 'zh-CN',
  weekStart: 1,
  todayBtn: 1,
  autoclose: 1,
  todayHighlight: 1,
  startView: 2,
  minView: 2,
  forceParse: 0
});

$('#pdf_close').on('click', function () {
  $('#pdf_window').css('display', 'none')
})

function returnString() {
  let rString = ''
  let PicStyle = $('#tjStyle > ul > li > a.tj_selected').attr('data-string')
  let Fea = $('#tjFea > ul > li > a.tj_selected').attr('data-string')
  let WayS = $('#tjWayS > ul > li > a.tj_selected').attr('data-string')
  let WayC = $('#tjWayC > ul > li > a.tj_selected').attr('data-string')
  let WayT = $('#tjWayT > ul > li > a.tj_selected').attr('data-string')
  let Date5 = $('#DataUrl').val()
  // let Start = $('#tjStart > ul > li > a.tj_selected').html()
  let Time = $('#tjTime > ul > li > a.tj_selected').parent().index()
  let Height = $('#tjHeight > ul > li > a.tj_selected').parent().index()
  let Area = $('tjArea > ul > li > a.tj_selected').attr('data-string')

  if (PicStyle === '1' || PicStyle === '2') {
    switch (Fea) {
      case 'cld_':
        rString = `${PicStyle};${Fea};${WayS};${Date5};${Time};${Height};${Area}`
        break;

      case 'cldamtp_':
      case 'cldtopl_':
      case 'cldbotl_':
      case 'cldamtl_':
      case 'cldlamt_':
      case 'cldamt_':
        rString = `${PicStyle};${Fea};${WayS}${WayC};${Date5};${Time};${Height};${Area}`
        break;
      default:
        rString = `${PicStyle};${Fea};${WayS}${WayC}${WayT};${Date5};${Time};${Height};${Area}`
        break;
    }
    return rString;
  } else if (PicStyle === '3' || PicStyle === '4' || PicStyle === '5' || PicStyle === '6' || PicStyle === '7' || PicStyle === '8') {
    switch (Fea) {
      case 'cld_':
        rString = `${PicStyle};${Fea};['S1','S2','S3'];${Date5};${Time};${Height};${Area}`
        break;

      case 'cldamtp_':
      case 'cldtopl_':
      case 'cldbotl_':
      case 'cldamtl_':
      case 'cldlamt_':
      case 'cldamt_':
        rString = `${PicStyle};${Fea};['S1C1','S2C1','S3C1','S1C2','S2C2','S3C2','S1C3','S2C3','S3C3','S1C4','S2C4','S3C4'];${Date5};${Time};${Height};${Area}`
        break;
      default:
        rString = `${PicStyle};${Fea};['S1C1${WayT}','S2C1${WayT}','S3C1${WayT}','S1C2${WayT}','S2C2${WayT}','S3C2${WayT}','S1C3${WayT}','S2C3${WayT}','S3C3${WayT}','S1C4${WayT}','S2C4${WayT}','S3C4${WayT}'];${Date5};${Time};${Height};${Area}`
        break;
    }
    return rString;
  } else {
    return rString;
  }
}

var Click
var Clickimg

$(function () {

  // 传递参数,并获取返回信息
  (async function () {
    await CefSharp.BindObjectAsync("localDir");
    layui.use('layer', function () {
      Click = async function (ev) {
        let time = $('#DataUrl').val()
        console.log(time);
        if (time.length != 0) {
          //弹出loading，画图函数，Csherf
          $('.loading_window').css('display', 'block');
          var dev = ''
          dev = returnString()
          console.log('开始传递参数' + '' + dev)
          var pic_state = await localDir.mydevice(dev)
          //判断 pic_state,是否画完
          let PicStyle = $('#tjStyle > ul > li > a.tj_selected').attr('data-string')
          let Fea = $('#tjFea > ul > li > a.tj_selected').attr('data-string')
          let WayS = $('#tjWayS > ul > li > a.tj_selected').attr('data-string')
          let WayC = $('#tjWayC > ul > li > a.tj_selected').attr('data-string')
          let WayT = $('#tjWayT > ul > li > a.tj_selected').attr('data-string')
          let Time = $('#tjTime > ul > li > a.tj_selected').parent().index()
          let Height = $('#tjHeight > ul > li > a.tj_selected').parent().index()
          let Datetest = $('#DataUrl').val()
          let Area = $('tjArea > ul > li > a.tj_selected').attr('data-string')
          // let start = $('#tjStart > ul > li > a.tj_selected').html()

          //根据要素和类型 变换的文件名
          let picAtrr = ''
          if (PicStyle === '3' || PicStyle === '4' || PicStyle === '5' || PicStyle === '6' || PicStyle === '7' || PicStyle === '8') {
            switch (Fea) {
              case 'cld_':
              case 'cldamtp_':
              case 'cldtopl_':
              case 'cldbotl_':
              case 'cldamtl_':
              case 'cldlamt_':
              case 'cldamt_':
                picAtrr = ``
                break;
              default:
                picAtrr = `${WayT}_`
                break;
            }
          } else if (PicStyle === '1' || PicStyle === '2') {
            switch (Fea) {
              case 'cld_':
                picAtrr = `${WayS}_`
                break;

              case 'cldamtp_':
              case 'cldtopl_':
              case 'cldbotl_':
              case 'cldamtl_':
              case 'cldlamt_':
              case 'cldamt_':
                picAtrr = `${WayS}${WayC}_`
                break;
              default:
                picAtrr = `${WayS}${WayC}${WayT}_`
                break;
            }
          }
          let picStyle = dev.split(';')[0]
          if (pic_state === 'finished') {
            // 显示并绑定打印功能
            $('.image_show').attr('src', `../Pic/${PicStyle}/${Datetest}/${Fea}${picAtrr}${Time}_${Height}_${Area}.png`)
            // $('#pic_download').attr('href', `../Pic/${PicStyle}/${Datetest}${start}/${Fea}${picAtrr}${Time}_${Height}.png`)
            //增加点击放大pdf显示框,不是邮票图，则取消放大功能？？？
            $('.loading_window').css('display', 'none');
            // if (picStyle == '3') {
            $('.image_show').addClass('.pic_pointer')
            $('.image_show').on('click', function () {
              $('#pdf_window').css('display', 'block')
              $('#pdf_content').media({
                width: '100%',
                height: '100%',
                autoplay: true,
                src: `../Pic/${PicStyle}/${Datetest}/${Fea}${picAtrr}${Time}_${Height}_${Area}.pdf`,
              });
              // $('#pdf_download').attr('href', `../Pic/${PicStyle}/${Datetest}${start}/${Fea}${picAtrr}${Time}_${Height}.pdf`)
            })
            // } else {
            //   // 跳转朱青窗口
            //   // $('.image_show').removeClass('.pic_pointer')
            //   Clickimg = async function (ev) {
            //     let pngurl = returnString()
            //     console.log(pngurl);
            //     var pic_up = await localDir.downloadpic(pngurl)
            //   }
            //   $('.image_show').unbind('click').click(Clickimg)
            // }
            console.log('pic finished')
            // $('.image_show').attr('src', '../Pic/1/' + Datetest + time + '/cldamtp_S1C1_0_0.png')
          } else if (pic_state === 'error1') {
            console.log('js格式错误');
          } else if (pic_state === 'error2') {
            console.log('画图失败');
          } else if (pic_state === 'error3') {
            console.log('js参数空');
          }
        } else {
          ErroAlert('请选择日期')
        }
      }

      $('#picStart').on('click', Click)
    })

  })();

  // 点击测试
  // $('#picStart').on('click', function () {
  //   let time = $('#dtp_input').val()
  //   console.log(time.length);
  // })

  //png下载
  // (async function () {
  //   await CefSharp.BindObjectAsync("localDir");
  //   Click_picdown = async function (ev) {
  //     var png_path = ''
  //     var png_src = $('.image_show').attr('src')
  //     if (png_src == 'img/hhhh.png') {
  //       png_path = '0'
  //     } else {
  //       png_path = returnString()
  //     }
  //     var png_path1 = await localDir.downloadpic(png_path)
  //   }
  //   $('#pic_download').on('click', Click_picdown)
  // })()

  // (async function () {
  //   await CefSharp.BindObjectAsync("localDir");
  //   Click_pdfdown = async function (ev) {
  //     var pdf_path = ''
  //     pdf_path = returnString()
  //     var pdf_path1 = await localDir.downloadpic(pdf_path)
  //   }
  //   $('#pdf_download').on('click', Click_picdown)
  // })()

})

function timetranslate(days) {
  let timeC = Date.now()

  let tdays = days * 24 * 60 * 60 * 1000

  let timeN = new Date(timeC - tdays)

  let Y = timeN.getFullYear()
  let M = timeN.getMonth() > 9 ? timeN.getMonth() + 1 : '0' + (timeN.getMonth() + 1)
  let D = timeN.getDate()

  let time1 = `${Y}/${M}/${D}`
  let time2 = `${Y}${M}${D}`
  return [time1, time2]
}

function session() {
  //开始先读一次默认参数，然后执行函数，更改前端显示，修改 sessionStorage, 每次上传session
  let startSetting = {
    "style": "auto",
    "autotime": "19:32",
    "start": "2019092008",
    "end": "2019092108",
  }
  sessionStorage.setItem('T511', 'start.bat')
  sessionStorage.setItem('fileName', '2019092608')
  sessionStorage.setItem('startSetting', JSON.stringify(startSetting))
  sessionStorage.setItem('dataDay', '0')
  // console.log(sessionStorage.getItem('startSetting'));
  $('#DataUrl').val(sessionStorage.getItem('fileName'))
}

