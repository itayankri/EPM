const todos = require('./todos');
const todoItems = require('./todoitems');
const events = require('./events');
const users = require('./users');
const participations = require('./participations');
const campShop = require('./campShop');
const blog = require('./blog');
const purchase = require('./purchase');
const leadersNotes = require('./leadersNotes');
const eventRoles = require('./eventRoles');

module.exports = {
  todos,
  todoItems,
  events,
  leadersNotes,
  participations,
  campShop,
  // statuses
  purchase,
  users,
  blog,
  eventRoles
};
