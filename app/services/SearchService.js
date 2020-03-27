const fetch = require('node-fetch');
const parser = require('xml2json');
const joi = require('@hapi/joi');
const config = require('../../config/config');

module.exports = class SearchService {
  constructor(configs) {
    this.configs = configs || config;
  }

  search(query) {
    return new Promise((resolve, reject) => {
      const { error } = this.validate(query);
      if (error) resolve({ error });

      fetch(
        `${config.goodreads.base_url + config.goodreads.search_resource + query.q}&key=bZFY4Rc5TZpBEc89fv7XKA`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      )
        .then((res) => res.text())
        .then((xml) => {
          const json = JSON.parse(parser.toJson(xml));
          return resolve({ result: json.GoodreadsResponse.search });
        })
        .catch((e) => reject(e));
    });
  }

  validate(query) {
    const schema = joi.object({
      q: joi.string().required(),
      page: joi
        .number()
        .min(1)
        .optional(),
      field: joi
        .string()
        .valid('title', 'author', 'all')
        .optional(),
    });

    return schema.validate(query, {allowUnknown: false});
  }
};
