'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async tankong() {
    // const tankong = await this.app.mysql.get('fujian').query('SELECT * FROM `fujian_tankong` ');
    const sql1 = "SELECT `time`,`total` FROM `shandong_yuliang_2015` WHERE `station` = '58002' AND `time` BETWEEN '2015-04-01 00:00:00' AND '2015-05-02 00:00:00'";
    const tankong = await this.app.mysql.get('fujian').query(sql1);
    for (let i = 0; i < tankong.length; i++) {
      tankong[i].time = this.format(tankong[i].time);
    }
    // for (let i = 0; i < tankong.length; i++) {
    //   tankong[i].datetime = this.format(tankong[i].datetime);
    // }
    return { tankong };
  }
  async tankongFeaSearch(stationid, date, time, fea) {
    const fulldate = date + ' ' + time;
    // const tankongfeasearch = await this.app.mysql.get('fujian').query('SELECT `气压`,? FROM `fujian_tankong` WHERE `datetime` = ? AND `站号` = ? ORDER BY `气压`', [ fea, '2014-07-14 08:00:00', stationid ]);
    const tankongfeasearch = await this.app.mysql.get('fujian').select('fujian_tankong', { // 搜索 post 表
      where: { datetime: fulldate, 站号: stationid }, // WHERE 条件
      columns: [ '气压', fea ], // 要查询的表字段
      orders: [[ '气压', 'asc' ]], // 排序方式 desc >,asc <
    });
    const tankongfeasearchF = [];
    for (let i = 0; i < tankongfeasearch.length; i++) {
      if (tankongfeasearch[i].温度 !== '9999') {
        tankongfeasearchF.push(tankongfeasearch[i]);
      }
    }
    return { tankongfeasearchF };
  }
  // 福建 23.30-28.20 / 115.40-120.30
  async tankongSearch(starttime1, endtime1, stationid) {
    const tankongsearch = await this.app.mysql.get('fujian').query('SELECT * FROM `fujian_tankong` WHERE `fujian_tankong`.datetime > ? AND `fujian_tankong`.datetime < ? AND `fujian_tankong`.站号 = ?', [ starttime1, endtime1, stationid ]);
    for (let i = 0; i < tankongsearch.length; i++) {
      tankongsearch[i].datetime = this.format(tankongsearch[i].datetime);
    }
    return { tankongsearch };
  }
  async tankongStationNum() {
    // const tankong = await this.app.mysql.get('fujian').query('SELECT * FROM `fujian_tankong` ');
    const sql1 = "SELECT DISTINCT `站号`,`纬度`,`经度` FROM `fujian_tankong` WHERE `经度` >= '23.50' AND `经度` <= '28.33' AND `纬度` <= '120.50' AND `纬度` >= '115.66'";
    const tankongStationNum = await this.app.mysql.get('fujian').query(sql1);
    // console.log(tankongStationNum.length);
    return { tankongStationNum };
  }
  async leidaSearch(startdate, enddate) {
    const leida = await this.app.mysql.get('fujian').query('SELECT `datetime`,`type`,`id` FROM `fujian_leida` WHERE `fujian_leida`.datetime BETWEEN ? AND ?', [ startdate, enddate ]);
    for (let i = 0; i < leida.length; i++) {
      leida[i].datetime = this.format(leida[i].datetime);
    }
    return { leida };
  }
  async leidaFile(datetime, type, id) {
    const result = await this.app.mysql.get('fujian').query('SELECT `leida` FROM `fujian_leida` WHERE `fujian_leida`.datetime = ? AND `fujian_leida`.type = ? AND `fujian_leida`.id = ? ', [ datetime, type, id ]);
    return result[0].leida;
  }

  async zidongStationNum() {
    // 时间太长，取300个
    // const sql2 = "SELECT DISTINCT `区站号`,`纬度`,`经度` FROM `fujian_zidongzhan` WHERE `纬度` >= '38500' AND `纬度` <= '535500' AND `经度` <= '1350800' AND `经度` >= '735500'";
    const sql2 = 'SELECT DISTINCT `区站号`,`经度`,`纬度` FROM `fujian_zidongzhan` WHERE `纬度` >= 235000 AND `纬度` <= 283300 AND `经度` <= 1205000 AND `经度` >= 1156600 LIMIT 300';
    const zidongStationNum = await this.app.mysql.get('fujian').query(sql2);
    for (let i = 0; i < zidongStationNum.length; i++) {
      zidongStationNum[i].纬度 = parseFloat(zidongStationNum[i].纬度) / 10000;
      zidongStationNum[i].经度 = parseFloat(zidongStationNum[i].经度) / 10000;
    }
    console.log(zidongStationNum.length);
    return { zidongStationNum };
  }
  async zidongSearch(starttime, endtime, stationid, fea) {
    const feaArr = fea.split(',');
    let sqlfea = 'SELECT `区站号`,`观测时间`,';
    for (let i = 0; i < feaArr.length; i++) {
      const element = feaArr[i];
      if (i === feaArr.length - 1) {
        sqlfea += '`' + element + '`';
      } else {
        sqlfea += '`' + element + '`,';
      }
    }
    const sqlFea = sqlfea + ' FROM `fujian_zidongzhan` WHERE `区站号` = ? AND `观测时间` BETWEEN ? AND ? ';
    console.log(sqlFea);
    const zidongsearch = await this.app.mysql.get('fujian').query(sqlFea, [ stationid, starttime, endtime ]);
    for (let i = 0; i < zidongsearch.length; i++) {
      zidongsearch[i]['观测时间'] = this.format(zidongsearch[i]['观测时间']);
    }
    return { zidongsearch };
  }
  async zidongTitle() {
    const zidongTitle = await this.app.mysql.get('fujian').query("SELECT * FROM `fujian_zidongzhan` WHERE `区站号` = 'G1686' AND `观测时间` = '2014-07-13 23:00:00' ");
    return { zidongTitle };
  }
  async yudipuSearch(start, end) {
    const startdate = start.split(' ')[0];
    const enddate = end.split(' ')[0];
    const table1 = await this.app.mysql.get('fujian').query('SELECT `date`,`time`,`intensity`,`precipitationsincestart`,`weathercodeSYNOP`,`weathercodeMETAR/SPECI`,`weathercodeNWS`,`radarreflectivity`,`morvisibility`,`morvisibility`,`signalamplitudeoflaserband`,`temperatureinsenser`,`heatingcurrent`,`sensorvoltage` FROM `fujian_yudipu-1` WHERE `date` >= ? AND `date` <= ? ', [ startdate, enddate ]);
    for (let i = 0; i < table1.length; i++) {
      table1[i].date = this.formatyudipu(table1[i].date);
    }
    const table = table1.filter(val => {
      return val.date + ' ' + val.time >= start && val.date + ' ' + val.time <= end;
    });
    return { table };
  }
  async yudipuFile(date, time) {
    const result = await this.app.mysql.get('fujian').query('SELECT `yudipu` FROM `fujian_yudipu` WHERE `date` = ? AND `time` = ? ', [ date, time ]);
    return result[0].yudipu;
  }
  // 辅助函数
  format(date) {
    const year = date.getFullYear();
    const month1 = date.getMonth() + 1;
    const month = (month1 < 10) ? '0' + month1 : month1;
    const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();


    const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();

    const second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();


    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
  formatyudipu(date) {
    const year = date.getFullYear();
    const month1 = date.getMonth() + 1;
    const month = (month1 < 10) ? '0' + month1 : month1;
    const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
  }
}

module.exports = UserService;
