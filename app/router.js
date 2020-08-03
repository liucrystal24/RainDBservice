'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router get(接口地址,方法位置,请求方法直接为网站地址加端口名称 如 127.0.0.1:7001/list)
  // ------------ 接口 --------------
  router.get('/tankongFeaSearch', controller.fujian.tankongFeaSearch);
  // http://127.0.0.1:7001/yudipuSearch?date=2015-04-09&time=01:51:00&method=RA
  router.get('/yudipuSearch', controller.fujian.yudipuSearch);

  // 福建
  router.get('/FJtankongSearch', controller.fujian.tankongSearch);
  router.get('/FJtankongStationNum', controller.fujian.tankongStationNum);
  router.get('/FJleidaSearch', controller.fujian.leidaSearch);
  router.post('/FJleidaFile', controller.fujian.leidaFile);
  router.get('/FJzidongStationNum', controller.fujian.zidongStationNum);
  router.get('/FJzidongSearch', controller.fujian.zidongSearch);
  router.get('/FJzidongTitle', controller.fujian.zidongTitle);
  router.get('/FJyudipuSearch', controller.fujian.yudipuSearch);

  // 吉林
  router.get('/JLfushejiSearch', controller.jilin.fushejiSearch);
  router.get('/JLwurenjiSearch', controller.jilin.wurenjiSearch);
  router.post('/JLwurenjiFile', controller.jilin.wurenjiFile);
  router.get('/JLleidaSearch', controller.jilin.leidaSearch);
  router.post('/JLleidaFile', controller.jilin.leidaFile);
  router.get('/JLzidongStationNum', controller.jilin.zidongStationNum);
  router.get('/JLzidongTitle', controller.jilin.zidongTitle);
  router.get('/JLzidongSearch', controller.jilin.zidongSearch);
  router.get('/JLyudipuSearch', controller.jilin.yudipuSearch);
  router.get('/JLyudipuStationid', controller.jilin.yudipuStationid);


  // 山东
  router.get('/SDrainStationNum2015', controller.shandong.StationNum2015);
  router.get('/SDrainStationNumOther', controller.shandong.StationNumOther);
  router.get('/SDrainRegularSearch', controller.shandong.rainRegularSearch);
  router.get('/SDrainStationNumAuto', controller.shandong.StationNumAuto);
  router.get('/SDrainAutoSearch', controller.shandong.rainAutoSearch);
  router.get('/SDleidaSearch', controller.shandong.leidaSearch);
  router.post('/SDleidaFile', controller.shandong.leidaFile);
  router.get('/SDtankongStationNum', controller.shandong.tankongStationNum);
  router.get('/SDtankongSearch', controller.shandong.tankongSearch);
  router.get('/SDweatherSearch', controller.shandong.weatherSearch);
  router.post('/SDweatherLook', controller.shandong.weatherLook);
  router.get('/SDrainPicSearch', controller.shandong.rainPicSearch);
  router.post('/SDrainLook', controller.shandong.rainLook);
  router.get('/SDsateSearch', controller.shandong.sateSearch);
  router.post('/SDsateLook', controller.shandong.sateLook);

  // 海南
  router.get('/HNFY4ASearch', controller.hainan.FY4ASearch);
  router.post('/HNFY4AFile', controller.hainan.FY4AFile);
  router.get('/HNFY4AimgSearch', controller.hainan.FY4AimgSearch);
  router.post('/HNFY4ALook', controller.hainan.FY4ALook);
  router.get('/HNleidaSearch', controller.hainan.leidaSearch);
  router.post('/HNleidaFile', controller.hainan.leidaFile);
  router.get('/HNrainStationNum', controller.hainan.rainStationNum);
  router.get('/HNrainTitle', controller.hainan.rainTitle);
  router.get('/HNrainSearch', controller.hainan.rainSearch);

};
