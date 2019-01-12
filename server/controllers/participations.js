const MyParticipation = require('../models').Participations;
const DEFAULT_STATUS = "0";
//const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return MyParticipation
      .create({
        userId: req.body.userId,
        eventId: req.body.eventId,
        roleId: req.body.roleId,
        statusId: req.body.statusId || DEFAULT_STATUS,
      })
      .then(MyParticipation => res.status(201).send(MyParticipation))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.body.userId != null)
    return MyParticipation
      .find({
        where: {
        eventId: req.body.eventId,
        userId: req.body.userId,
        }
      })
      .then(MyParticipation => {
        if (!MyParticipation) {
          return res.status(404).send({
            message: 'Participation Not Found',
          });
        }
        return res.status(200).send(MyParticipation);
      })
      .catch(error => res.status(400).send(error));
    return MyParticipation
      .findAll({
        where: {
          eventId: req.body.eventId}
        })
      .then(MyParticipations => res.status(200).send(MyParticipations))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return MyParticipation
      .find({
        where: {
        eventId: req.body.eventId,
        userId: req.body.userId,
        }
      })
      .then(MyParticipation => {
        if (!MyParticipation) {
          this.exports.create(req, res);
        }
        return MyParticipation
          .update({
            statusId: req.body.statusId || MyParticipation.statusId,
            roleId: req.body.roleId || MyParticipation.roleId,
          })
          .then(() => res.status(200).send(MyParticipation))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  claim(req, res) {
    req.body.statusId = 0;
    return this.exports.update(req, res);
  },
  unclaim(req, res) {
    req.body.statusId = 1;
    return this.exports.update(req, res);
  },
  destroy(req, res) {
    return MyParticipation
      .find({
        where: {
        eventId: req.body.eventId,
        userId: req.body.userId,
        }
      })
      .then(MyParticipation => {
        if (!MyParticipation) {
          return res.status(400).send({
            message: 'Participation Not Found',
          });
        }
        return MyParticipation
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
