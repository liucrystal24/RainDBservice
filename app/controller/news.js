'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  // 可以本地返回和 service,连接数据库返回
  async list() {
    const ctx = this.ctx;
    // const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list();
    await ctx.render('news/list.tpl', { list: newsList });
  }

  async listtest() {
    const ctx = this.ctx;
    const dataList = await this.other();
    // await ctx.render('news/list.tpl', { list: newsList });
    ctx.body = {
      code: 0,
      masg: 'news list success',
      data: dataList,
    };
  }

  async other() {
    return {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' },
      ],
    };
  }
}

module.exports = NewsController;

