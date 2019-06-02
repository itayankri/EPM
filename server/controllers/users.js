const User = require('../models').User;
const EventParticipation = require('../models').Participations;

module.exports = {
    create(req, res) {
        return User
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
                roleInNA: req.body.roleInNA || "123",
                languages: req.body.languages || "123",
                allergies: req.body.allergies || "123",
                swimming: req.body.swimming || true,
                firstAid: req.body.firstAid || true,
                lifeSave: req.body.lifeSave || true,
            })
            .then(user => res.status(201).send(user))
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    list(req, res) {
        return User
            .findAll({
                // include: [{
                //   model: EventParticipation,
                //   as: 'participations'
                // }],
            })
            .then(users => res.status(200).send(users))
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    retrieve(req, res) {
        return User
            .findById(req.params.id, {
                include: [{
                    model: EventParticipation,
                    as: 'participations'
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        // return User
        //     .findById(req.params.id)
        //     .then(user => {
        //         if (!user) {
        //             return res.status(404).send({
        //                 message: 'User Not Found',
        //             });
        //         }
        //         return User
        //             .update({
        //                 firstName: req.body.start || user.firstName,
        //                 lastName: req.body.end || user.lastName,
        //             })
        //             .then(() => res.status(200).send(user))  // Send back the updated user.
        //             .catch((error) => res.status(400).send(error));
        //     })
        //     .catch((error) => res.status(400).send(error));
        User.update({
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
            roleInNA: req.body.roleInNA || "123",
            languages: req.body.languages || "123",
            allergies: req.body.allergies || "123",
            swimming: req.body.swimming || true,
            firstAid: req.body.firstAid || true,
            lifeSave: req.body.lifeSave || true,
        }, {
            where: {
                id: req.params.userId
            }
        })
            .then(user => {
                console.log('Itayway');
                console.log(user);
                res.send(user)
            })
            .catch(err => {
                res.status(400).send();
            })
    },

    login(req, res) {
        return User
            .findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send('Incorrect username or password');
                } else {
                    user.password = "";
                    req.session.user = user.dataValues;
                    req.session.isAuthenticated = true;
                    console.log('session user', req.session.user);
                    return res.status(200).send(user);
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    retrieveAuthenticated(req, res) {
        if (req.session.isAuthenticated) {
            res.send(req.session.user);
        } else {
            res.status(403).send('User is Unauthenticated');
        }
    }
};
