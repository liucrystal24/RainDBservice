<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>集合预报软件示范系统
    </title>
    <!--<link href="img/favicon.ico" rel="shortcut icon" />-->
    <link href="../public/css/layui.css" rel="stylesheet" type="text/css" />
    <!--<link rel="stylesheet" href="fonts/material-icons.css" />-->
    <link rel="stylesheet" href="../public/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../public/css/bootstrap-switch.css" />
    <link rel="stylesheet" href="../public/css/bootstrap-select.css" />
    <!--<link rel="stylesheet" href="css/bootstrap-table.css"/>-->
    <link rel="stylesheet" href="../public/css/bootstrap-datetimepicker.css">
    <link rel="stylesheet" href="../public/css/common.css" />

</head>

<body>
    <header>
        <div id="logo"></div>
        <div id="logo_slogan">
            集合预报软件示范系统
        </div>
    </header>
    <div id="content">
        <div id="nav_left">
            <!-- <div id="user"></div> -->
            <ul class="context" style='margin-bottom:0;'>
                <li class='info_title'>
                    <div style='margin-left: 40px;float: left;font-size:18px;color:#fff;height: 40px;'>参数设置</div>
                </li>
            </ul>
            <ul class="context" style='margin-top:0;' id='info_select'>
                <li><a href='KJSZ.html'>启动设置</a></li>
                <li class="con_selected"><a href='index.html'>集合预报</a></li>
                <li><a href='RJDD.html'>路径设置</a></li>
                <li><a href='HSdata.html'>历史数据存储</a></li>
            </ul>
        </div>
        <div id='frame'>
            <div class='tj tj_title'>
                <div style='margin-left: 40px;float: left;font-size:18px;color:#fff;height: 40px;'>预报条目筛选</div>
            </div>

            <div id='tjFea' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>要素：</div>
                <ul class='tj2_detail'>
                    <li><a href="index.html" class='tj_selected' data-string='cld_'>云有无</a></li>
                    <li><a href="YL" data-string='cldamtp_'>云量</a></li>
                    <li><a href="YDGD.html" data-string='cldtopl_'>云顶高度</a></li>
                    <li><a href="YDGD2.html" data-string='cldbotl_'>云底高度</a></li>
                    <li><a href="FCYL.html" data-string='cldamtl_'>分层云量</a></li>
                    <li><a href="YCS.html" data-string='cldlamt_'>云层数</a></li>
                    <li><a href="ZYL.html" data-string='cldamt_'>总云量</a></li>
                    <li><a href="YCLX.html" data-string='cldtypl_'>云层类型</a></li>
                    <li><a href="YZSQ.html" data-string='totwp_'>云中水汽凝结物垂直积分值总量</a></li>
                    <li><a href="HJYZ.html" data-string='esi_'>环境严重指数</a></li>
                </ul>
            </div>
            <div id='tjStyle' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>类型：</div>
                <ul class='tj_detail'>
                    <li><a href="javascript:;" class='tj_selected' data-string='1'>等值线</a></li>
                    <li><a href="javascript:;" data-string='2'>填色图</a></li>
                    <li><a href="javascript:;" data-string='3'>邮票图</a></li>
                    <li><a href="javascript:;" data-string='4'>平均图</a></li>
                    <li><a href="javascript:;" data-string='5'>方差图</a></li>
                    <!-- <li><a href="javascript:;" data-string='6'>面条图</a></li> -->
                    <li><a href="javascript:;" data-string='7'>烟羽图</a></li>
                    <!-- <li><a href="javascript:;" data-string='8'>概率图分析</a></li> -->
                </ul>
            </div>
            <div id='tjWayS' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>云检测方法：</div>
                <ul class='tj_detail'>
                    <li><a href="javascript:;" class='tj_selected' data-string='S1'>基于气压层的温度露点差阈值法</a></li>
                    <li><a href="javascript:;" data-string='S2'>基于环境温度的温度露点差阈值法</a></li>
                    <li><a href="javascript:;" data-string='S3'>相对湿度阈值法</a></li>
                </ul>
            </div>
            <div id='tjFileName' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>日期：</div>
                <ul class='tj_detail'>
                    <li style='position:relative;top:5px;'>
                        <input id='DataUrl' class="form-control" disabled >
                        <label for="file" class=" btn btn-primary"
                            style='position: absolute;top: 0px;left: 190px;'>选择</label>
                        <input id="file" type="file" style="display:none">
                    </li>
                </ul>
            </div>
            <!-- <div id='tjDate' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>日期：</div>
                <div class="input-group date form_date col-md-10" data-date="" data-date-format="yyyy-mm-dd"
                    data-link-field="dtp_input" data-link-format="yyyy-mm-dd" style='width:200px;top:6px;'>
                    <input class="form-control" size="16" type="text" value="" readonly id="endtime">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
                <input type="hidden" id="dtp_input" value="" /><br />
            </div>
            <div id='tjStart' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>起报时次：</div>
                <ul class='tj_detail'>
                    <li><a href="javascript:;" class='tj_selected'>08</a></li>
                    <li><a href="javascript:;">20</a></li>

                </ul>
            </div> -->
            <div id='tjTime' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>时次：</div>
                <ul class='tj3_detail'>
                    <li><a href="javascript:;" class='tj_selected'>0</a></li>
                    <li><a href="javascript:;">3</a></li>
                    <li><a href="javascript:;">6</a></li>
                    <li><a href="javascript:;">9</a></li>
                    <li><a href="javascript:;">12</a></li>
                    <li><a href="javascript:;">15</a></li>
                    <li><a href="javascript:;">18</a></li>
                    <li><a href="javascript:;">21</a></li>
                    <li><a href="javascript:;">24</a></li>
                    <li><a href="javascript:;">27</a></li>
                    <li><a href="javascript:;">30</a></li>
                    <li><a href="javascript:;">33</a></li>
                    <li><a href="javascript:;">36</a></li>
                    <li><a href="javascript:;">39</a></li>
                    <li><a href="javascript:;">42</a></li>
                    <li><a href="javascript:;">45</a></li>
                    <li><a href="javascript:;">48</a></li>
                    <li><a href="javascript:;">51</a></li>
                    <li><a href="javascript:;">54</a></li>
                    <li><a href="javascript:;">57</a></li>
                    <li><a href="javascript:;">60</a></li>
                    <li><a href="javascript:;">63</a></li>
                    <li><a href="javascript:;">66</a></li>
                    <li><a href="javascript:;">69</a></li>
                    <li><a href="javascript:;">72</a></li>
                    <li><a href="javascript:;">78</a></li>
                    <li><a href="javascript:;">84</a></li>
                    <li><a href="javascript:;">90</a></li>
                    <li><a href="javascript:;">96</a></li>
                    <li><a href="javascript:;">102</a></li>
                    <li><a href="javascript:;">108</a></li>
                    <li><a href="javascript:;">114</a></li>
                    <li><a href="javascript:;">120</a></li>
                </ul>
            </div>
            <div id='tjHeight' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>层次（hpa）：</div>
                <ul class='tj_detail'>
                    <li><a href="javascript:;" class='tj_selected'>850</a></li>
                    <li><a href="javascript:;">700</a></li>
                    <li><a href="javascript:;">500</a></li>
                    <li><a href="javascript:;">400</a></li>
                </ul>
            </div>
            <div id='tjArea' class='tj'>
                <div style='margin-left: 40px;float: left;width:100px;'>区域：</div>
                <ul class='tj_detail'>
                    <li><a href="javascript:;" class='tj_selected' data-string='1'>全部</a></li>
                    <li><a href="javascript:;" data-string='2'>印度洋南海</a></li>
                    <li><a href="javascript:;" data-string='3'>南海西太</a></li>
                    <li><a href="javascript:;" data-string='4'>东北亚</a></li>
                </ul>
            </div>
            <div id='confirm' class='tj'>
                <button class='btn btn-primary' style='margin-left: 90%;' id='picStart'>画图</button>
            </div>
            <div id='image_block'>
                <div class='print_content'>
                    <img src="img/hhhh.png" class='image_show'>
                </div>
                <!-- <a id='pic_download' class='btn btn-success' href='img/2.png' download>下载</a>
                <button id='pic_print' class='btn btn-danger'>打印</button> -->
            </div>
            <div id='image_blank'></div>
            <div class="loading_window" style="display: none;">
                <div class="loading_pic"><img src="img/loading.gif"></div>
                <div class="loading_text">正在画图···</div>
            </div>
            <div id='pdf_window' style='display: none;'>
                <div id='pdf_nav'>
                    <div id='pdf_close'></div>
                </div>
                <!-- <div id='pdf_download_nav'>
                    <a id='pdf_download' class='btn btn-success' href=''>下载</a>
                </div> -->
                <div id='pdf_content'></div>
            </div>
        </div>
    </div>
    <!-- <script src="js/url.js"></script> -->
    <script src="../public/js/jquery.js"></script>
    <script src="../public/js/jquery.media.js"></script>
    <script src='../public/js/bootstrap.min.js'></script>
    <script src='../public/js/bootstrap-switch.js'></script>
    <script src='../public/js/bootstrap-select.js'></script>
    <script src='../public/js/bootstrap-datetimepicker.js'></script>
    <script src='../public/js/bootstrap-datetimepicker.zh-CN.js'></script>
    <script src="../public/js/jquery.PrintArea.min.js"></script>
    <script src="../public/js/layui.js"></script>
    <script src='../public/js/JH_nav.js'></script>
    <!-- <script src="js/test.js"></script> -->
    <script>
        $('#picStart').on('click',function(){
            $.ajax({
                type:'get',
                data:{date:'2015-04-09',time:'00:03:00'},
                url:'http://127.0.0.1:7001/mysqlUser',
                dataType:'json',
                success:function(data){
                    console.log(data)
                },
                error:function(err){
                    console.log(err)
                }
            })
        })
    </script>
</body>

</html>