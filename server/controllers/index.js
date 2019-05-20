const todos = require('./todos');
const todoItems = require('./todoitems');
const events = require('./events');
const users = require('./users');
const participations = require('./participations');
const campShop = require('./campShop');
const blog = require('./blog');
const purchase = require('./purchase');

module.exports = {
  todos,
  todoItems,
  events,
  // eventRoles,
  participations,
  campShop,
  // statuses
  purchase,
  users,
  blog
};
