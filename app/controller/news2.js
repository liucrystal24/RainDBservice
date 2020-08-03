'use strict';

const Controller = require('egg').Controller;

class News2Controller extends Controller {
  async news2() {
    const { ctx } = this;
    ctx.body = 'news2';
  }
}

module.exports = News2Controller;
