const MyEvent = require('../models').Event;
const EventParticipation = require('../models').Participations;
const MyUser = require('../models').User;
const MyRole = require('../models').EventRole;
const MyCampShop = require('../models').CampShop;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pdfController = require('../pdfs/pdfFiller');
//const TodoItem = require('../models').TodoItem;

const myshit = module.exports = {
    create(req, res) {
        generateEventCode(req, res).then(eventcode => {
            return MyEvent
                .create({
                    start: req.body.start,
                    end: req.body.end,
                    code: eventcode.toString(),
                    country: req.body.country,
                    chapter: req.body.chapter,
                    type: req.body.eventType.toString().toLowerCase(),
                    address: req.body.eventAddress || "",
                    email: req.body.email,
                    participatingNAs: req.body.participatingNAs,
                    theme: req.body.eventTheme || "",
                    meetingPointName: req.body.meetingPointName || "",
                    meetingPointAddress: req.body.meetingPointAddress || "",
                    meetingDate: req.body.meetingDate || "",
                    nearestAirportName: req.body.nearestAirportName || "",
                    nearestAirportCode: req.body.nearestAirportCode || "",
                    nearestTrainStation: req.body.nearestTrainStation || "",
                    arriveBefore: req.body.arriveBefore,
                    leaveAfter: req.body.leaveAfter,

                })
                .then(myevent => res.status(201).send(myevent))
                .catch(error => { console.log(error); res.status(400).send(error) })
        });
    },
    list(req, res) {
        return MyCampShop
            .findAll({
                attributes: ["name", "quantity"],
                where: {
                    eventId: req.params.eventId
                }})
            .then(myItems => {
                console.log(myItems);
                res.status(200).send(myItems);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    retrieve(req, res) {
        return MyEvent
            .findById(req.params.eventId, {
                include: [{
                    model: EventParticipation,
                    as: 'participations',
                    include: [MyUser, MyRole]
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
    contactList(req, res) {
        if (req.params.eventId == null) {
            return res.status(404).send({
                message: 'parameter eventId is not defined',
            });
        }
        return MyEvent
            .findById(req.params.eventId, {
                attributes: ["id", "theme", "country", "chapter"],
                include: [{
                    model: EventParticipation,
                    as: 'participations',
                    attributes: ["status", "roleId"],
                    where: { status: "APPROVED" },
                    include: [{
                        model: MyUser,
                        attributes: ["firstName", "middleName", "lastName", "birthday",
                            "gender", "email", "homeNumber", "cellphoneNumber",
                            "country", "city", "address", "zipcode"]
                    },
                    ]
                }]
            })
            .then(myevent => {
                if (!myevent) {
                    return res.status(404).send({
                        message: 'No records found.',
                    });
                }
                return res.status(200).send(myevent);
            })
            .catch(error => res.status(400).send(error));
    },
    participantsToRandomize(req, res) {
        if (req.params.eventId == null) {
            return res.status(404).send({
                message: 'parameter eventId is not defined',
            });
        }
        return MyEvent
            .findById(req.params.eventId, {
                attributes: ["id", "theme", "country", "chapter"],
                include: [{
                    model: EventParticipation,
                    as: 'participations',
                    attributes: ["status", "roleId"],
                    where: { status:"APPROVED" },
                    include: [{
                        model: MyUser,
                        attributes: ["firstName", "lastName", "gender", "country"],
                    }]
                }]
            })
            .then(myevent => {
                if (!myevent) {
                    return res.status(404).send({
                        message: 'No records found.',
                    });
                }
                return res.status(200).send(myevent);
            })
            .catch(error => res.status(400).send(error));
    },
    roomRandomizer(req, res) {
        let myObject;
        console.log(req.body);
        switch (req.body.rooms) {
            case 1:
                myObject = {
                    "Rooms": [
                        {
                            "Room Number": 1,
                            "Participants": [
                                { "firstName": "fake_first_1", "lastName": "fake_last_1", "gender": true, "country": "fake_country_1", "roleId": 2 },
                                { "firstName": "fake_first_2", "lastName": "fake_last_2", "gender": false, "country": "fake_country_2", "roleId": 2 },
                                { "firstName": "fake_first_3", "lastName": "fake_last_3", "gender": true, "country": "fake_country_3", "roleId": 2 },
                                { "firstName": "fake_first_4", "lastName": "fake_last_4", "gender": false, "country": "fake_country_4", "roleId": 2 },
                            ],
                            "warning": ""
                        }
                    ]
                }
                break;
            case 2:
                myObject = {
                    "Rooms": [
                        {
                            "Room Number": 1,
                            "Participants": [
                                { "firstName": "fake_first_1", "lastName": "fake_last_1", "gender": true, "country": "fake_country_1", "roleId": 2 },
                                { "firstName": "fake_first_2", "lastName": "fake_last_2", "gender": false, "country": "fake_country_2", "roleId": 2 },
                                { "firstName": "fake_first_3", "lastName": "fake_last_3", "gender": true, "country": "fake_country_3", "roleId": 2 },
                                { "firstName": "fake_first_4", "lastName": "fake_last_4", "gender": false, "country": "fake_country_4", "roleId": 2 },
                            ],
                            "warning": ""
                        },
                        {
                            "Room Number": 2,
                            "Participants": [
                                { "firstName": "fake_first_5", "lastName": "fake_last_5", "gender": true, "country": "fake_country_1", "roleId": 2 },
                                { "firstName": "fake_first_6", "lastName": "fake_last_6", "gender": false, "country": "fake_country_2", "roleId": 2 },
                                { "firstName": "fake_first_7", "lastName": "fake_last_7", "gender": true, "country": "fake_country_3", "roleId": 2 },
                                { "firstName": "fake_first_8", "lastName": "fake_last_8", "gender": false, "country": "fake_country_4", "roleId": 2 },
                            ],
                            "warning": "Fake warning"
                        },
                    ]
                }
                break;
            default:
                myObject = { "error": "Didn't get 1 room or 2 rooms" };
                break;
        }

        return res.status(200).send(myObject);
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
                        country: req.body.country || myevent.country,
                        chapter: req.body.chapter || myevent.chapter,
                    })
                    .then(() => res.status(200).send(myevent))  // Send back the updated todo.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    generateForm(req, res) {
        return MyEvent
            .findById(req.params.eventId, {
                include: [{
                    model: EventParticipation,
                    as: 'participations',
                    where: { userId: req.body.userId },
                    include: [MyUser, MyRole]
                }],
            })
            .then(myevent => {
                if (!myevent) {
                    return res.status(404).send({
                        message: 'Event Not Found',
                    });
                }
                let zivPath = pdfController.fillPdfForm(req.body.formName.split(".")[0], {
                    "Date of Birth": formatDate(new Date(myevent.participations[0].User.birthday)),
                    "Last name": myevent.participations[0].User.lastName,
                    "First name": myevent.participations[0].User.firstName,
                    "Middle name": myevent.participations[0].User.middleName,
                    "Male": (myevent.participations[0].User.gender) ? 1 : null,
                    "Female": (!myevent.participations[0].User.gender) ? 1 : null,
                    "Country of Citizenship": myevent.participations[0].User.country,
                    "Participant will attend CISV programme in Host Nation": myevent.country,
                    "Programme start date": formatDate(new Date(myevent.start)),
                    "Programme end date": formatDate(new Date(myevent.end)),
                    "Languages spoken": myevent.participations[0].User.languages.languages.toString(),
                    "Country Code_Home": myevent.participations[0].User.homeNumber.split("-")[0],
                    "Area Code_Home": myevent.participations[0].User.homeNumber.split("-")[1],
                    "Local Number_Home": myevent.participations[0].User.homeNumber.split("-")[2],
                    "Country Code_Mobile": myevent.participations[0].User.cellphoneNumber.split("-")[0],
                    "Area Code_Mobile": myevent.participations[0].User.cellphoneNumber.split("-")[1],
                    "Local Number_Mobile": myevent.participations[0].User.cellphoneNumber.split("-")[2],
                    "Name of Participant": myevent.participations[0].User.firstName + " " + ((myevent.participations[0].User.middleName ? myevent.participations[0].User.middleName + " " : "")) + myevent.participations[0].User.lastName,
                    "Sending National Association": myevent.participations[0].User.country
                });
                return res.status(200).send(zivPath);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
};