# valley-module-tpl
valley-tpl for valley-module

## 依赖

### 版本要求

* NodeJS > 8.0
* ValleyTpl > 1.1.2
* ValleyModule > 1.0

### 地址

* [valley-tpl](https://github.com/hitvalley/valley-tpl)
* [valley-module](https://github.com/hitvalley/valley-module)


## 使用

引入

	npm i --save vtpl-module

使用方法

	const RenderModule = require('vtpl-module');

	const renderModule = new RenderModule({
	  viewPath: './dist/',
	  extension: 'tpl',
	  encoding: 'utf-8'
	});
	class MainModule extends ValleyModule {
	  prepare() {
	    ...
	    this.use('prepareRender', renderModule); // 引入
	    ...
	    this.use('render', async next => {
	      let html = this.context.render(tpl, data, scope);// 调用
	      ...
	    })
	  }
	}
	let mainModule = new MainModule();
