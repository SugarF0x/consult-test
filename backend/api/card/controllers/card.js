'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

function processPhones(ctx) {
  ctx.request.body.phones = ctx.request.body.phones.map(entry => parseInt(entry))
  return !ctx.request.body.phones.includes(NaN)
}

function phonesGuard(ctx) {
  if (!processPhones(ctx)) {
    ctx.throw(406, 'Phones array only accepts number values')
  }
}

module.exports = {

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.card.create(data, { files });
    } else {
      phonesGuard(ctx)
      entity = await strapi.services.card.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.card });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.card.update({ id }, data, {
        files,
      });
    } else {
      phonesGuard(ctx)
      entity = await strapi.services.card.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.card });
  }

};
