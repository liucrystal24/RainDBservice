'use strict';

const Controller = require('egg').Controller;

class News1Controller extends Controller {
  async news1() {
    const { ctx } = this;
    ctx.body = 'news1';
  }
}

module.exports = News1Controller;

