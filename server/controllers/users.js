const myuser = require('../models').user;

module.exports = {
  create(req, res) {
    return myuser
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      .then(myuser => res.status(201).send(myuser))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return myuser
      .findAll({})
      .then(myusers => res.status(200).send(myusers))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return myuser
      .findById(req.params.id, {
        include: [{}],
      })
      .then(myuser => {
        if (!myuser) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(myuser);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return myuser
      .findById(req.params.id)
      .then(myuser => {
        if (!myuser) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return myuser
          .update({
            firstName: req.body.start || myuser.firstName,
            lastName: req.body.end || myuser.lastName,
          })
          .then(() => res.status(200).send(myuser))  // Send back the updated user.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return myuser
      .findById(req.params.id)
      .then(myuser => {
        if (!myuser) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return myuser
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
