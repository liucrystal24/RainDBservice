"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 可以本地返回和 service,连接数据库返回

  async tankong() {
    const ctx = this.ctx;
    const tankonginfo = await ctx.service.fujian.tankong();
    const infolength = tankonginfo.length;
    // console.log(userinfo.user.length);
    // let Rinfo = '';
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: tankonginfo,
      };
    }
    // ctx.body = userinfo;
  }
  async tankongFeaSearch() {
    const ctx = this.ctx;
    const date = ctx.query.date;
    const time = ctx.query.time;
    const stationid = ctx.query.stationid;
    const fea = ctx.query.fea;
    const tankonginfo = await ctx.service.fujian.tankongFeaSearch(
      stationid,
      date,
      time,
      fea
    );
    const infolength = tankonginfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: tankonginfo,
      };
      // console.log(tankonginfo);
    }
    // ctx.body = userinfo;
  }
  async tankongSearch() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const starttime = ctx.query.starttime;
    const endtime = ctx.query.endtime;
    const stationid = ctx.query.stationid;
    const tankonginfo = await ctx.service.fujian.tankongSearch(
      starttime,
      endtime,
      stationid
    );
    const infolength = tankonginfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: tankonginfo,
      };
    }
  }
  async tankongStationNum() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const tankongStationNum = await ctx.service.fujian.tankongStationNum();
    const infolength = tankongStationNum.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: tankongStationNum,
      };
    }
  }
  async leidaSearch() {
    const ctx = this.ctx;
    const startdate = ctx.query.startdate;
    const enddate = ctx.query.enddate;
    const leidainfo = await ctx.service.fujian.leidaSearch(startdate, enddate);
    const infolength = leidainfo.length;
    if (infolength === 0) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 1,
        info: leidainfo,
      };
    }
  }
  async leidaFile() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const datetime = request.datetime;
    const type = request.type;
    const id = request.id;
    // console.log(datetime, type, id);
    const leidainfo = await ctx.service.fujian.leidaFile(datetime, type, id);
    // const infolength = leidainfo.length;
    if (leidainfo == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = leidainfo;
    }
  }
  async zidongStationNum() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const zidongStationNum = await ctx.service.fujian.zidongStationNum();
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
    const stationid = ctx.query.stationid;
    const fea = ctx.query.fea;
    const zidonginfo = await ctx.service.fujian.zidongSearch(
      starttime,
      endtime,
      stationid,
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
    const zdTitleinfo = await ctx.service.fujian.zidongTitle();
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
    const info = await ctx.service.fujian.yudipuSearch(
      startdate,
      enddate
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
      // console.log(tankonginfo);
    }
  }
  async yudipuFile() {
    const ctx = this.ctx;
    const date = ctx.query.date;
    const time = ctx.query.time;
    const info = await ctx.service.fujian.yudipuFile(date, time);
    // const infolength = leidainfo.length;
    if (info == null) {
      ctx.body = {
        code: 0,
      };
    } else {
      console.log(info.indexOf('<'));
      const linePoint = info.indexOf('<');
      const newinfo = info.slice(0, linePoint) + '\n' + info.slice(linePoint);
      ctx.body = newinfo;
    }
  }
}

module.exports = UserController;
