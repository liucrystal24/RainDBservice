'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    // read config
    const { serverUrl } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}`, {
      data: {
      },
      dataType: 'json',
    });

    console.log(idList.data.list);
    const newsList = idList.data.list;
    return newsList;
  }
  // async list(page = 1) {
  //   // read config
  //   const { serverUrl, pageSize } = this.config.news;

  //   // use build-in http client to GET hacker-news api
  //   const { data: idList } = await this.ctx.curl(`${serverUrl}`, {
  //     data: {
  //       orderBy: '"$key"',
  //       startAt: `"${pageSize * (page - 1)}"`,
  //       endAt: `"${pageSize * page - 1}"`,
  //     },
  //     dataType: 'json',
  //   });

  //   console.log(idList);

  //   // parallel GET detail
  //   const newsList = await Promise.all(
  //     Object.keys(idList).map(key => {
  //       const url = `${serverUrl}/item/${idList[key]}.json`;
  //       return this.ctx.curl(url, { dataType: 'json' });
  //     })
  //   );
  //   return newsList.map(res => res.data);
  // }
}

module.exports = NewsService;
