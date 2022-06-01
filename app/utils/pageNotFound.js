const Response = require('../model/Response');

const pageNotFound = (_, res) => {
  res.json(new Response.Error(true, 'Halaman tidak ditemukan!'));
};

module.exports = pageNotFound;
