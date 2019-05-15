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
                    eventId: req.body.eventId
                },
                order: [['id', 'ASC']]
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
            .then(myParticipation => {
                return MyParticipation.update({
                        status: req.body.status || myParticipation.status,
                        roleId: req.body.roleId || myParticipation.roleId,
                    },
                    {
                        where: {
                            id: myParticipation[0].id
                        }
                    })
            })
            .then(myParticipation => res.status(200).send(myParticipation))
            .catch((error) => res.status(400).send(error));
    },
    claim(req, res) {
        req.body.status = "PENDING";
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
            .then(myParticipation => {
                return MyParticipation.update({
                        status: req.body.status || myParticipation.status,
                        roleId: req.body.roleId || myParticipation.roleId,
                    },
                    {
                        where: {
                            id: myParticipation[0].id
                        }
                    })
            })
            .then(myParticipation => res.status(200).send(myParticipation))
            .catch((error) => res.status(400).send(error));
    },
    unclaim(req, res) {
        req.body.status = "UNCLAIMED";
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
            .then(myParticipation => {
                return MyParticipation.update({
                        status: req.body.status || myParticipation.status,
                        roleId: req.body.roleId || myParticipation.roleId,
                    },
                    {
                        where: {
                            id: myParticipation[0].id
                        }
                    })
            })
            .then(myParticipation => res.status(200).send(myParticipation))
            .catch((error) => res.status(400).send(error));
    },
    acceptParticipation(req, res) {
        req.body.status = "APPROVED";
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
            .then(myParticipation => {
                return MyParticipation.update({
                        status: req.body.status || myParticipation.status,
                        roleId: req.body.roleId || myParticipation.roleId,
                    },
                    {
                        where: {
                            id: myParticipation[0].id
                        }
                    })
            })
            .then(myParticipation => res.status(200).send(myParticipation))
            .catch((error) => res.status(400).send(error));
    },
    declineParticipation(req, res) {
        req.body.status = "DECLINED";

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
            .then(myParticipation => {
                return MyParticipation.update({
                        status: req.body.status || myParticipation.status,
                        roleId: req.body.roleId || myParticipation.roleId,
                    },
                    {
                        where: {
                            id: myParticipation[0].id
                        }
                    })
            })
            .then(myParticipation => res.status(200).send(myParticipation))
            .catch((error) => res.status(400).send(error));
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
