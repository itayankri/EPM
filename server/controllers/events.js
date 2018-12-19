const MyEvent = require('../models').Event;
const EventParticipation = require('../models').Participations;
//const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return MyEvent
      .create({
        start: req.body.start,
        end: req.body.end,
        country: req.body.country,
        chapter: req.body.chapter,
      })
      .then(myevent => res.status(201).send(myevent))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return MyEvent
      .findAll({})
      .then(myevents => res.status(200).send(myevents))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return MyEvent
      .findById(req.params.eventId, {
        include: [{
          model: EventParticipation,
          as: 'participations',
        }],
      })
      .then(myevent => {
        if (!myevent) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        return res.status(200).send(myevent);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return MyEvent
      .findById(req.params.eventId)
      .then(myevent => {
        if (!myevent) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        return myevent
          .update({
            start: req.body.start || myevent.start,
            end: req.body.end || myevent.end,
            start: req.body.start || myevent.start,
            country: req.body.country || myevent.country,
            chapter: req.body.chapter || todo.chapter,
          })
          .then(() => res.status(200).send(myevent))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return MyEvent
      .findById(req.params.eventId)
      .then(myevent => {
        if (!myevent) {
          return res.status(400).send({
            message: 'Event Not Found',
          });
        }
        return myevent
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
