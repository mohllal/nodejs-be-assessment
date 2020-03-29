const fetch = require('node-fetch');
const parser = require('xml2json');
const joi = require('@hapi/joi');
const config = require('../../config/config');
const SortService = require('./SortService');

module.exports = class SearchService {
  constructor(configs) {
    this.configs = configs || config;
  }

  search(query) {
    return new Promise((resolve, reject) => {
      const { error, value } = this.validate(query);
      console.log(value)
      if (error) resolve({ error });

      fetch(
        `${config.goodreads.base_url + config.goodreads.search_resource}?q=${value.q}&key=bZFY4Rc5TZpBEc89fv7XKA&page=${value.page}&field=${value.field}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      )
        .then((res) => res.text())
        .then((xml) => {
          const json = JSON.parse(parser.toJson(xml));
          SortService.sortBooks(
            json.GoodreadsResponse.search.results.work, value.sortBy
          );
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
        .default(1)
        .optional(),
      field: joi
        .string()
        .valid('title', 'author', 'all')
        .default('all')
        .optional(),
      sortBy: joi
        .string()
        .valid('average_rating', 'ratings_count', 'publication_date', 'none')
        .default('none')
        .optional(),
    });

    return schema.validate(query, { allowUnknown: false });
  }
};
