const vtpl = require('valley-tpl');
const ValleyModule = require('valley-module');

class RenderModule extends ValleyModule {
  constructor(input) {
    super(input);
    input = input || {};
    let conf = Object.assign({}, {
      viewPath: input.viewPath || './',
      encoding: input.encoding || 'utf-8',
      extension: input.extension || 'tpl'
    });
    vtpl.setConfig(conf);
  }
  prepare() {
    this.use('prepareRender', async next => {
      this.context.register = vtpl.register;
      this.context.render = async (tpl, data, scope) => {
        let tplContent = await vtpl.prepareTpl(tpl).catch(e => {
          throw e;
        });
        let html = vtpl(tplContent, data || {}, scope || {});
        return html;
      };
      this.render = this.render || this.context.render;
      this.register = this.register || this.context.register;
      await next();
    });
  }
}

module.exports = RenderModule;
