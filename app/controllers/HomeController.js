const BaseController = require('./BaseController');

module.exports = class HomeController extends BaseController {
  constructor(server) {
    super(server);
  }

  /**
   * Register Controller
   */
  init() {
    this.server.get("/", this.homeAction);
    this.server.get("/api/v1", this.healthCheckAction);
    this.server.use((req, res) => {
      res
        .status(404)
        .send(super.sendResponse("NOT_FOUND", "Resource not found"));
    });
    this.server.use((err, req, res) => {
      res.status(500).send(super.sendResponse("UNKNOWN_ERROR", err.message));
    });
  }

  /**
   * @api {get} / Home
   * @apiName Index
   * @apiGroup Home
   * @ApiDescription Root request to render the HTML template
   * @apiUse Render HTML
   */
  homeAction(req, res) {
    res.render('index');
  }

  /**
   * @api {get} /api/v1/ Health Check
   * @apiVersion 1.0.0
   * @apiName Index V1
   * @apiGroup Health Check
   * @ApiDescription V1 Request to check if service is responding
   * @apiUse HealthResponse100
   */
  /**
   * Say Hello
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   */
  healthCheckAction(req, res) {
    res
      .status(200)
      .json(super.sendResponse("SUCCESS", "You know for search books"));
  }
};
