"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 可以本地返回和 service,连接数据库返回

  async fushejiSearch() {
    const ctx = this.ctx;
    console.log(ctx.query);
    const stationid = ctx.query.stationid;
    const level = ctx.query.level;
    const date = ctx.query.date;
    const starttime = ctx.query.starttime;
    const endtime = ctx.query.endtime;
    const info = await ctx.service.jilin.fushejiSearch(
      stationid,
      level,
      date,
      starttime,
      endtime
    );
    const infolength = info.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info,
      };
    }
  }
  async wurenjiSearch() {
    const ctx = this.ctx;
    console.log(ctx.query);
    const style = ctx.query.style;
    const info = await ctx.service.jilin.wurenjiSearch(style);
    const infolength = info.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info,
      };
    }
  }
  async wurenjiFile() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const style = request.style;
    const number = request.number;
    // console.log(style, number);
    // console.log(number);
    const info = await ctx.service.jilin.wurenjiFile(style, number);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
  async leidaSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const info = await ctx.service.jilin.leidaSearch(startdate, enddate);
    console.log(info);
    const infolength = info.leida.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info,
      };
    }
  }
  async leidaFile() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const info = await ctx.service.jilin.leidaFile(datetime);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }

  async zidongStationNum() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const zidongStationNum = await ctx.service.jilin.zidongStationNum();
    const infolength = zidongStationNum.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: zidongStationNum,
      };
    }
  }
  async zidongSearch() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const starttime = ctx.query.starttime;
    const endtime = ctx.query.endtime;
    const stationKey = ctx.query.stationKey;
    const fea = ctx.query.fea;
    const zidonginfo = await ctx.service.jilin.zidongSearch(
      starttime,
      endtime,
      stationKey,
      fea
    );
    const infolength = zidonginfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: zidonginfo,
      };
    }
  }
  async zidongTitle() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const zdTitleinfo = await ctx.service.jilin.zidongTitle();
    const infolength = zdTitleinfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: zdTitleinfo,
      };
    }
  }
  async yudipuSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const station = ctx.query.station;
    const info = await ctx.service.jilin.yudipuSearch(
      startdate,
      enddate,
      station
    );
    const infolength = info.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info,
      };
    }
  }
  async yudipuStationid() {
    const ctx = this.ctx;
    const station = await ctx.service.jilin.yudipuStationid();
    const infolength = station.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: station,
      };
    }
  }
}

module.exports = UserController;
