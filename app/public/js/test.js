$('.image_show').on('click', function () {
  $('#pdf_window').css('display', 'block')
  // $('#pdf_content').css('zoom','3')
  // document.getElementsById('#pdf_content')[0].style.zoom = 2
  $('#pdf_content').media({
    width: '100%',
    height: '100%',
    autoplay: true,
    src: 'img/esi_2016 .pdf',
  });
})