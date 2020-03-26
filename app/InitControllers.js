const path = require('path');
const fs = require('fs');

module.exports = class InitControllers {
  /**
   * Register all Controllers to the server Object
   * @param {Object} server
   */
  // eslint
  init(server) {
    const controllerPath = path.join(__dirname, '/controllers');
    let HomepageController;

    fs.readdirSync(controllerPath).forEach((file) => {
      if (file !== 'BaseController.js' && file !== 'HomeController.js') {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const Controller = require(`./controllers/${file}`);
        new Controller(server).init();
      } else if (file === 'HomeController.js') {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        HomepageController = require(`./controllers/${file}`);
      }
    });

    if (HomepageController) {
      new HomepageController(server).init();
    }

    return server;
  }
};
