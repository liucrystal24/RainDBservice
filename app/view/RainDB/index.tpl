<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="../public/css/bootstrap.min.css">
  <link rel="stylesheet" href="../public/css/bootstrap-select.css">
  <link rel="stylesheet" href="../public/css/FourDB.css">
  <link rel="stylesheet" href="../public/css/bootstrap-table.css">
</head>

<body>
  <div id='navLeft'>
    <div id='slogan'>
      <div class='logoContainer'>
        <img src="public/img/logo.jpg">
      </div>
      <div class='logoText'>
        中国气象科学研究院
      </div>
    </div>
    <div id='dblistLeft'>
      <div class='dbLeft'>
        <img src="public/img/total.png" alt="" srcset="">
        数据库列表
      </div>
      <ul id='listDetail'>
        <li>
          <div class='dbLeftTitle'>
            <img src="public/img/db.png" alt="" srcset="">福建
          </div>
          <ul class='list-sec'>
            <li><a href='/FJleida'><img src="public/img/table.png" alt="" srcset="">雷达</a></li>
            <li class='listactive'><a href='/'><img src="public/img/table.png">探空</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雨滴谱</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">自动站</a></li>
          </ul>
        </li>
        <li>
          <div class='dbLeftTitle'><img src="public/img/db.png" alt="" srcset="">海南</div>
          <ul class='list-sec'>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">FY4A</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">FY4A图片</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雷达</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雨量</a></li>
          </ul>
        </li>
        <li>
          <div class='dbLeftTitle'><img src="public/img/db.png" alt="" srcset="">吉林</div>
          <ul class='list-sec'>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雨滴谱</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">辐射计</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">无人机</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雷达</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">自动站</a></li>
          </ul>
        </li>
        <li>
          <div class='dbLeftTitle'><img src="public/img/db.png" alt="" srcset="">山东</div>
          <ul class='list-sec'>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雨量</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雷达</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">探空</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">天气图</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">雨量图</a></li>
            <li><a href='/'><img src="public/img/table.png" alt="" srcset="">卫星</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div id='navRight'>
    <header>人工增雨随机化试验样本数据库</header>
    <div id='DBContent'>
      <div id="DBinfo">
				<div id='DBinfoContent'>
					<div class='DBinfologo'>
						<img src="public/img/dbinfo.png" alt="" srcset="">
						数据库信息
					</div>
					<div class='DBinfoListContent'>
						<ul class="list-group">
							<li class="list-group-item">
								数据类型
								<span class="badge badge-primary">string</span>
							</li>
							<li class="list-group-item">
								数据数目
								<span class="badge badge-primary">667245</span>
							</li>
							<li class="list-group-item">
								负责人员
								<span class="badge badge-primary">李主任</span>
							</li>
							<li class="list-group-item">
								上传时间
								<span class="badge badge-success">2019-08-20</span>
							</li>
						</ul>
					</div>
				</div>
				<div id='DBinfoSearch'>
					<div class='DBinfologo'>
						<img src="public/img/infosearch.png" alt="" srcset="">
						数据库查询
					</div>
					<div class='DBinfoListContent'>
						<ul class="list-group">
							<li class="list-group-item">
								站号
								<span class="badge badge-primary">10035</span>
							</li>
							<li class="list-group-item">
								起始时间
								<span class="badge badge-success">2014-7-14</span>
							</li>
							<li class="list-group-item">
								结束时间
								<span class="badge badge-success">2017-3-7</span>
							</li>
							<li class="list-group-item">
								<button class='btn btn-primary' id='BtnSearch'>查询</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
      <div id='DBdetail'>
        <div id='tableContainer'>
          <table class="RainTable"></table>
					<div class="loading_window" style="display: block;" id='Cloading'>
						<div class="loading_pic"><img src="../public/img/loading.gif"></div>
						<div class="loading_text">正在查询···</div>
					</div>
					<div>
        </div>
      </div>
    </div>
  </div>
  <script src="../public/js/jquery.js"></script>
  <script src="../public/js/bootstrap-table.js"></script>
  <script src="../public/js/bootstrap-table-zh-CN.js"></script>
  <script src="../public/js/fourRain.js"></script>
	<script src='../public/js/FJtankong.js'></script>
</body>

</html>