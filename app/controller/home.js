'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('RainDB/index.tpl');
  }
  async FJleida() {
    const { ctx } = this;
    await ctx.render('RainDB/FJleida.tpl');
  }
}

module.exports = HomeController;
