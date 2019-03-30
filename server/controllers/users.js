const myuser = require('../models').User;
const EventParticipation = require('../models').Participations;

module.exports = {
  create(req, res) {
    return myuser
      .create({
        password: req.body.password,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        gender: req.body.gender,
        lastName: req.body.lastName,
        email: req.body.email,
        homeNumber: req.body.homeNumber,
        cellphoneNumber: req.body.cellphoneNumber,
        birthday: req.body.birthday,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode,
        chapter: req.body.chapter,
        roleInNA: req.body.roleInNA  || "123",
        languages: req.body.languages || "123",
        allergies: req.body.allergies || "123",
        swimming: req.body.swimming  || true,
        firstAid: req.body.firstAid  || true,
        lifeSave: req.body.lifeSave  || true,
      })
      .then(myuser => res.status(201).send(myuser))
      .catch(error => { console.log(error); res.status(400).send(error)});
  },
  list(req, res) {
    return myuser
      .findAll({
        // include: [{
        //   model: EventParticipation,
        //   as: 'participations'
        // }],
      })
      .then(myusers => res.status(200).send(myusers))
      .catch(error => { console.log(error);res.status(400).send(error)});
  },
  retrieve(req, res) {
    return myuser
      .findById(req.params.id, {
        include: [{
          model: EventParticipation,
          as: 'participations'
        }],
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

  login(req, res) {
    return myuser
      .find({ email: req.body.email,
              password: req.body.password },)
      .then(myuser => {
        if (!myuser) {
          return res.status(404).send({
            message: 'Incorrect username or password',
          })
        }
        myuser.password=""
        return res.status(200).send(myuser);
      })
      .catch((error) => res.status(400).send(error));
  }
};
