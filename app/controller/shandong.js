"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 可以本地返回和 service,连接数据库返回
  async StationNum2015() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const StationNum2015 = await ctx.service.shandong.StationNum2015();
    const infolength = StationNum2015.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: StationNum2015,
      };
    }
  }

  async StationNumOther() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const zidongStationNum = await ctx.service.shandong.StationNumOther();
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

  async rainRegularSearch() {
    const ctx = this.ctx;
    console.log(ctx.query);
    const date = ctx.query.date;
    const stationid = ctx.query.stationid;
    const info = await ctx.service.shandong.rainRegularSearch(
      date,
      stationid
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

  async StationNumAuto() {
    const ctx = this.ctx;
    const StationNum = await ctx.service.shandong.StationNumAuto();
    const infolength = StationNum.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: StationNum,
      };
    }
  }

  async rainAutoSearch() {
    const ctx = this.ctx;
    const starttime = ctx.query.starttime;
    const endtime = ctx.query.endtime;
    const stationid = ctx.query.stationid;
    const info = await ctx.service.shandong.rainAutoSearch(
      starttime,
      endtime,
      stationid
    );
    const infolength = info.table.length;
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

  async leidaSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const info = await ctx.service.shandong.leidaSearch(startdate, enddate);
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
    const info = await ctx.service.shandong.leidaFile(datetime);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
  async tankongStationNum() {
    const ctx = this.ctx;
    const stationNum = await ctx.service.shandong.tankongStationNum();
    const infolength = stationNum.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: stationNum,
      };
    }
  }
  async tankongSearch() {
    const ctx = this.ctx;
    const starttime = ctx.query.starttime;
    const endtime = ctx.query.endtime;
    const stationid = ctx.query.stationid;
    const info = await ctx.service.shandong.tankongSearch(
      starttime,
      endtime,
      stationid
    );
    const infolength = info.table.length;
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
  async weatherSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const fea = ctx.query.fea;
    const info = await ctx.service.shandong.weatherSearch(
      startdate,
      enddate,
      fea
    );
    const infolength = info.table.length;
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
  async weatherLook() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const fea = request.fea;
    const info = await ctx.service.shandong.weatherLook(datetime, fea);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
  async rainPicSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const info = await ctx.service.shandong.rainPicSearch(
      startdate,
      enddate
    );
    const infolength = info.table.length;
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

  async rainLook() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const date = request.date;
    const time = request.time;
    const info = await ctx.service.shandong.rainLook(date, time);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
  async sateSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const info = await ctx.service.shandong.sateSearch(
      startdate,
      enddate
    );
    const infolength = info.table.length;
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
  async sateLook() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const type = request.type;
    const info = await ctx.service.shandong.sateLook(datetime, type);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
}

module.exports = UserController;
