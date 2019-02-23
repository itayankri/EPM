const MyParticipation = require('../models').Participations;
const DEFAULT_STATUS = "PENDING";
const DEFAULT_ROLE = "0";
//const TodoItem = require('../models').TodoItem;

module.exports = {
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
      .findOrCreate({
        where: {
        eventId: req.body.eventId,
        userId: req.body.userId,
        },
        defaults: {
          eventId: req.body.eventId,
          userId: req.body.userId,
          roleId: DEFAULT_ROLE,
          status: DEFAULT_STATUS
        }
      })
      .then(MyParticipation => {
        return MyParticipation
          .update({
            status: req.body.status || MyParticipation.status,
            roleId: req.body.roleId || MyParticipation.roleId,
          })
          .then(() => res.status(200).send(MyParticipation))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  claim(req, res) {
    req.body.status = "PENDING";
    return this.exports.update(req, res);
  },
  unclaim(req, res) {
    req.body.status = "UNCLAIMED";
    return this.exports.update(req, res);
  },
  acceptParticipation(req, res) {
    req.body.status = "CLAIMED";
    return this.exports.update(req, res);
  },
  declineParticipation(req, res) {
    req.body.status = "DECLINED";
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
