'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 吉林 23.30-28.20 / 115.40-120.30
  async fushejiSearch(stationid, level, date, starttime, endtime) {
    let db = '';
    date = date.replace('-', '');
    if (stationid === '白城') {
      db = 'jilin_fusheji_baicheng_lv2';
    } else if (stationid === '长春') {
      db = 'jilin_fusheji_changchun_lv2';
    } else {
      if (level === 'lv1') {
        db = `jilin_fusheji_jilin_${date}_lv1`;
      } else {
        db = 'jilin_fusheji_jilin_lv2';
      }
    }
    const fushejiTable = await this.app.mysql.get('jilin').query('SELECT * FROM ' + db + ' WHERE `Date/Time` BETWEEN ? AND ?', [ starttime, endtime ]);
    for (let i = 0; i < fushejiTable.length; i++) {
      fushejiTable[i]['Date/Time'] = this.format(fushejiTable[i]['Date/Time']);
    }
    return { fushejiTable };
  }

  async wurenjiSearch(style) {
    let db = '';
    let sql1 = '';
    if (style === '查询') {
      db = 'jilin_wurenji';
      sql1 = 'SELECT `datetime`,`number` FROM ' + db;
    } else {
      db = 'jilin_wurenji_static';
      sql1 = 'SELECT `year`,`number` FROM ' + db;
    }
    console.log(db);
    const wurenjiTable = await this.app.mysql.get('jilin').query(sql1);
    if (style === '查询') {
      for (let i = 0; i < wurenjiTable.length; i++) {
        wurenjiTable[i].datetime = this.format(wurenjiTable[i].datetime);
      }
    }
    return { wurenjiTable };
  }

  async wurenjiFile(style, number) {
    const db = style === '查询' ? 'jilin_wurenji' : 'jilin_wurenji_static';
    // console.log(db);
    const result = await this.app.mysql.get('jilin').query('SELECT `table` FROM ' + db + ' WHERE `number` = ? ', [ number ]);
    return result[0].table;
  }

  async leidaSearch(startdate, enddate) {
    const leida = await this.app.mysql.get('jilin').query('SELECT `datetime` FROM `jilin_leida` WHERE `jilin_leida`.datetime BETWEEN ? AND ?', [ startdate, enddate ]);
    for (let i = 0; i < leida.length; i++) {
      leida[i].datetime = this.format(leida[i].datetime);
    }
    return { leida };
  }

  async leidaFile(datetime) {
    const result = await this.app.mysql.get('jilin').query('SELECT `leida` FROM `jilin_leida` WHERE `datetime` = ? ', [ datetime ]);
    return result[0].leida;
  }

  async zidongStationNum() {
    const sql2 = 'SELECT DISTINCT `stationKey` FROM `jilin_zidongzhan`';
    const zidongStationNum = await this.app.mysql.get('jilin').query(sql2);
    console.log(zidongStationNum.length);
    return { zidongStationNum };
  }

  async zidongTitle() {
    const zidongTitle = await this.app.mysql.get('jilin').query("SELECT * FROM `jilin_zidongzhan` WHERE `factId` = '5226338'");
    return { zidongTitle };
  }

  async zidongSearch(starttime, endtime, stationKey, fea) {
    const feaArr = fea.split(',');
    const timeBase = (feaArr.indexOf('timeBase') === -1) ? 0 : 1;
    let sqlfea = 'SELECT `factId`,`stationKey`,`obsTime`,';
    for (let i = 0; i < feaArr.length; i++) {
      const element = feaArr[i];
      if (i === feaArr.length - 1) {
        sqlfea += '`' + element + '`';
      } else {
        sqlfea += '`' + element + '`,';
      }
    }
    const sqlFea = sqlfea + ' FROM `jilin_zidongzhan` WHERE `stationKey` = ? AND `obsTime` BETWEEN ? AND ? ';
    // console.log(sqlFea);
    const zidongsearch = await this.app.mysql.get('jilin').query(sqlFea, [ stationKey, starttime, endtime ]);
    // let obsTime
    // Object.keys(zidongsearch).forEach((key, index) => {
    //   console.log(key, index);
    // });
    for (let i = 0; i < zidongsearch.length; i++) {
      zidongsearch[i].obsTime = this.format(zidongsearch[i].obsTime);
    }
    if (timeBase === 1) {
      for (let i = 0; i < zidongsearch.length; i++) {
        zidongsearch[i].timeBase = this.format(zidongsearch[i].timeBase);
      }
    }
    return { zidongsearch };
  }

  async yudipuSearch(start, end, station) {
    const startdate = start.split(' ')[0];
    const enddate = end.split(' ')[0];
    const table1 = await this.app.mysql.get('jilin').query('SELECT * FROM `jilin_yudipu-1` WHERE `传感器日期` >= ? AND `传感器日期` <= ? AND `station` = ?', [ startdate, enddate, station ]);
    for (let i = 0; i < table1.length; i++) {
      table1[i]['传感器日期'] = this.formatyudipu(table1[i]['传感器日期']);
    }
    const table = table1.filter(val => {
      return val['传感器日期'] + ' ' + val['传感器时间'] >= start && val['传感器日期'] + ' ' + val['传感器时间'] <= end;
    });
    return { table };
  }
  async yudipuFile(date, time) {
    const result = await this.app.mysql.get('fujian').query('SELECT `yudipu` FROM `fujian_yudipu` WHERE `date` = ? AND `time` = ? ', [ date, time ]);
    return result[0].yudipu;
  }
  async yudipuStationid() {
    const sql2 = 'SELECT DISTINCT `station` FROM `jilin_yudipu-1`';
    const station = await this.app.mysql.get('jilin').query(sql2);
    // console.log(station.length);
    return { station };
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
