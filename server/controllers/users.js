const myuser = require('../models').User;

module.exports = {
  create(req, res) {
    return myuser
      .create({
        password: req.body.password,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
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
        roleInNA: req.body.roleInNA,
        languages: req.body.languages,
        allergies: req.body.allergies,
        swimming: req.body.swimming,
        firstAid: req.body.firstAid,
        lifeSave: req.body.lifeSave,
      })
      .then(myuser => res.status(201).send(myuser))
      .catch(error => { console.log(error); res.status(400).send(error)});
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
