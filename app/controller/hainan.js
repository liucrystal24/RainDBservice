"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 可以本地返回和 service,连接数据库返回
  async FY4ASearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const info = await ctx.service.hainan.FY4ASearch(startdate, enddate);
    console.log(info);
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
  async FY4AFile() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const type = request.type;
    const level = request.level;
    const band = request.band;
    const info = await ctx.service.hainan.FY4AFile(datetime, type, level, band);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
  async FY4AimgSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const info = await ctx.service.hainan.FY4AimgSearch(startdate, enddate);
    console.log(info);
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
  async FY4ALook() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const type = request.type;
    const level = request.level;
    const class1 = request.class1;
    const info = await ctx.service.hainan.FY4ALook(
      datetime,
      type,
      level,
      class1
    );
    console.log(info);
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
    const info = await ctx.service.hainan.leidaSearch(startdate, enddate);
    console.log(info);
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
  async leidaFile() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const type = request.type;
    const id = request.id;
    const info = await ctx.service.hainan.leidaFile(datetime, type, id);
    console.log(info);
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = info;
    }
  }
  async rainStationNum() {
    const ctx = this.ctx;
    const stationNum = await ctx.service.hainan.rainStationNum();
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
  async rainTitle() {
    const ctx = this.ctx;
    const titleinfo = await ctx.service.hainan.rainTitle();
    const infolength = titleinfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: titleinfo,
      };
    }
  }
  async rainSearch() {
    const ctx = this.ctx;
    const starttime = ctx.query.starttime;
    const endtime = ctx.query.endtime;
    const stationKey = ctx.query.stationKey;
    const fea = ctx.query.fea;
    const raininfo = await ctx.service.hainan.rainSearch(
      starttime,
      endtime,
      stationKey,
      fea
    );
    const infolength = raininfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: raininfo,
      };
    }
  }
}

module.exports = UserController;
