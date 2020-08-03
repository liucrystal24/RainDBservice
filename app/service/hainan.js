'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 海南
  async FY4ASearch(startdate, enddate) {
    const table = await this.app.mysql.get('hainan').query('SELECT `datetime`,`type`,`level`,`band` FROM `hainan_fy4a` WHERE `datetime` BETWEEN ? AND ?', [ startdate, enddate ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].datetime = this.format(table[i].datetime);
      }
    }
    return { table };
  }
  async FY4AFile(datetime, type, level, band) {
    const result = await this.app.mysql.get('hainan').query('SELECT `FY4A` FROM `hainan_fy4a` WHERE `datetime` = ? AND `type` = ? AND `level` = ? AND `band` = ?', [ datetime, type, level, band ]);
    return result[0].FY4A;
  }

  async FY4AimgSearch(startdate, enddate) {
    const table = await this.app.mysql.get('hainan').query('SELECT `datetime`,`type`,`level`,`class` FROM `hainan_fy4a_img` WHERE `datetime` BETWEEN ? AND ?', [ startdate, enddate ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].datetime = this.format(table[i].datetime);
      }
    }
    return { table };
  }
  async FY4ALook(datetime, type, level, class1) {
    const result = await this.app.mysql.get('hainan').query('SELECT `img` FROM `hainan_fy4a_img` WHERE `datetime` = ? AND `type` = ? AND `level` = ? AND `class` = ?', [ datetime, type, level, class1 ]);
    return result[0].img;
  }
  async leidaSearch(startdate, enddate) {
    const table = await this.app.mysql.get('hainan').query('SELECT `datetime`,`type`,`id` FROM `hainan_leida` WHERE `datetime` BETWEEN ? AND ?', [ startdate, enddate ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].datetime = this.format(table[i].datetime);
      }
    }
    return { table };
  }
  async leidaFile(datetime, type, id) {
    const result = await this.app.mysql.get('hainan').query('SELECT `leida` FROM `hainan_leida` WHERE `datetime` = ? AND `type` = ? AND `id` = ?', [ datetime, type, id ]);
    return result[0].leida;
  }
  async rainStationNum() {
    const sql2 = 'SELECT DISTINCT `站点编码` FROM `hainan_yuliang`';
    const stationNum = await this.app.mysql.get('hainan').query(sql2);
    // console.log(stationNum.length);
    return { stationNum };
  }
  async rainTitle() {
    const rainTitle = await this.app.mysql.get('hainan').query("SELECT * FROM `hainan_yuliang` WHERE `观测时间 ObservTime` = '2015-04-21 13:00:00' AND `站点编码`='M1024'");
    return { rainTitle };
  }
  async rainSearch(starttime, endtime, stationKey, fea) {
    const feaArr = fea.split(',');
    const feaString = feaArr.toString();
    // console.log(feaArr);
    const timeBase = (feaString.indexOf('InsertTime') === -1) ? 0 : 1;
    let sqlfea = 'SELECT ';
    for (let i = 0; i < feaArr.length; i++) {
      const element = feaArr[i];
      if (i === feaArr.length - 1) {
        sqlfea += '`' + element + '`';
      } else {
        sqlfea += '`' + element + '`,';
      }
    }
    const sqlFea = sqlfea + ' FROM `hainan_yuliang` WHERE `站点编码` = ? AND `观测时间 ObservTime` BETWEEN ? AND ? ';
    // console.log(sqlFea);
    const rainsearch = await this.app.mysql.get('hainan').query(sqlFea, [ stationKey, starttime, endtime ]);
    // let obsTime
    // Object.keys(rainsearch).forEach((key, index) => {
    //   console.log(key, index);
    // });
    if (rainsearch.length !== 0) {
      for (let i = 0; i < rainsearch.length; i++) {
        rainsearch[i]['观测时间 ObservTime'] = this.format(rainsearch[i]['观测时间 ObservTime']);
      }
    }
    // console.log(timeBase);
    if (timeBase === 1) {
      for (let i = 0; i < rainsearch.length; i++) {
        if (rainsearch[i]['入库时间 InsertTime'] != null) {
          rainsearch[i]['入库时间 InsertTime'] = this.format(rainsearch[i]['入库时间 InsertTime']);
        }
      }
    }
    return { rainsearch };
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
}

module.exports = UserService;
