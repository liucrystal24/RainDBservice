'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 山东
  async StationNum2015() {
    const sql2 = 'SELECT DISTINCT `station` FROM `shandong_yuliang_2015`';
    const StationNum = await this.app.mysql.get('shandong').query(sql2);
    console.log(StationNum.length);
    return { StationNum };
  }

  async StationNumOther() {
    // 时间太长，取300个
    const sql1 = 'SELECT DISTINCT `Station_Id_C`,`Station_Name` FROM `shandong_yuliang_20180920`';
    const StationNum = await this.app.mysql.get('shandong').query(sql1);
    console.log(StationNum.length);
    return { StationNum };
  }

  async rainRegularSearch(date, stationid) {
    const db = 'shandong_yuliang_' + date;
    let fea = '';
    if (date === '2015') {
      fea = 'station';
    } else if (date.indexOf('2014') !== -1) {
      fea = '站号';
    } else if (date.indexOf('2016') !== -1) {
      fea = 'Station_Id_C';
    } else {
      fea = 'Station_Id_C';
    }
    const table = await this.app.mysql.get('shandong').query('SELECT * FROM ' + db + ' WHERE ' + fea + '=?', [ stationid ]);
    // 用含有 - 区分时间，并修改
    // Object.keys(table).forEach(key => {
    //   if (key.indexOf('-') !== -1) {
    //     key = this.format(key);
    //   }
    // });
    if (date === '2015') {
      for (let i = 0; i < table.length; i++) {
        table[i].time = this.format(table[i].time);
      }
    }
    console.log(table[0]);
    return { table };
  }

  async StationNumAuto() {
    const sql = 'SELECT DISTINCT `区站号` FROM `shandong_yuliang_zidongzhan`';
    const StationNum = await this.app.mysql.get('shandong').query(sql);
    return { StationNum };
  }

  async rainAutoSearch(starttime, endtime, stationid) {
    const db = 'shandong_yuliang_zidongzhan';
    const table = await this.app.mysql.get('shandong').query('SELECT * FROM ' + db + ' WHERE `区站号` = ? AND `日期时间` BETWEEN ? AND ?', [ stationid, starttime, endtime ]);
    if (table.length !== 0) {
      table.forEach(item => {
        item['日期时间'] = this.format(item['日期时间']);
      });
    }
    return { table };
  }

  async leidaSearch(startdate, enddate) {
    const leida = await this.app.mysql.get('shandong').query('SELECT `datetime` FROM `shandong_leida` WHERE `shandong_leida`.datetime BETWEEN ? AND ?', [ startdate, enddate ]);
    if (leida.length !== 0) {
      for (let i = 0; i < leida.length; i++) {
        leida[i].datetime = this.format(leida[i].datetime);
      }
    }
    return { leida };
  }

  async leidaFile(datetime) {
    const result = await this.app.mysql.get('shandong').query('SELECT `leida` FROM `shandong_leida` WHERE `datetime` = ? ', [ datetime ]);
    return result[0].leida;
  }

  async tankongStationNum() {
    const sql2 = 'SELECT DISTINCT `站号` FROM `shandong_tankong`';
    const StationNum = await this.app.mysql.get('shandong').query(sql2);
    return { StationNum };
  }
  async tankongSearch(starttime, endtime, stationid) {
    const table = await this.app.mysql.get('shandong').query('SELECT * FROM `shandong_tankong` WHERE `datetime` BETWEEN ? AND ? AND `站号` = ?', [ starttime, endtime, stationid ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].datetime = this.format(table[i].datetime);
      }
    }
    return { table };
  }

  async weatherSearch(startdate, enddate, fea) {
    const sql1 = (fea === '地面') ? " = '地面' " : " != '地面' ";
    const table = await this.app.mysql.get('shandong').query('SELECT `datetime`,`地面\\pressure` FROM `shandong_tianqitu` WHERE `datetime` BETWEEN ? AND ? AND `地面\\pressure`' + sql1, [ startdate, enddate ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].datetime = this.format(table[i].datetime);
      }
    }
    return { table };
  }
  async weatherLook(datetime, fea) {
    const result = await this.app.mysql.get('shandong').query('SELECT `picture` FROM `shandong_tianqitu` WHERE `datetime` = ? AND `地面\\pressure` = ?', [ datetime, fea ]);
    return result[0].picture;
  }
  async rainPicSearch(startdate, enddate) {
    const table = await this.app.mysql.get('shandong').query('SELECT `date`,`time` FROM `shandong_yuliangtu` WHERE `date` BETWEEN ? AND ? ', [ startdate, enddate ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].date = this.format(table[i].date).split(' ')[0];
      }
    }
    return { table };
  }
  async rainLook(date, time) {
    const result = await this.app.mysql.get('shandong').query('SELECT `picture` FROM `shandong_yuliangtu` WHERE `date` = ? AND `time` = ?', [ date, time ]);
    return result[0].picture;
  }
  async sateSearch(startdate, enddate) {
    const table = await this.app.mysql.get('shandong').query('SELECT `datetime`,`type` FROM `shandong_weixing` WHERE `datetime` BETWEEN ? AND ?', [ startdate, enddate ]);
    if (table.length !== 0) {
      for (let i = 0; i < table.length; i++) {
        table[i].datetime = this.format(table[i].datetime);
      }
    }
    return { table };
  }
  async sateLook(datetime, type) {
    const result = await this.app.mysql.get('shandong').query('SELECT `picture` FROM `shandong_weixing` WHERE `datetime` = ? AND `type` = ?', [ datetime, type ]);
    return result[0].picture;
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
