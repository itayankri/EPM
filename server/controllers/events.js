const MyEvent = require('../models').Event;
const EventParticipation = require('../models').Participations;
const MyUser = require('../models').User;
const MyRole = require('../models').EventRole;
//const TodoItem = require('../models').TodoItem;

const eventsDictionary = Object.freeze({
    SEMINAR: 'S',
    VILLAGE: 'V',
    STEPUP: 'C'
});

function generateEventCode(req, res) {
    /*const year = new Date(req.body.start).getFullYear();
    const mystring = eventsDictionary[req.body.eventType] + "-" + year + "-" + (MyEvent.findall({
        where: sequelize.where(sequelize.fn('YEAR', sequelize.col('start')), year)
        }})).count();
    return mystring;*/
    return "ziv";
}

module.exports = {
  create(req, res) {
    return MyEvent
      .create({
        start: req.body.start,
        end: req.body.end,
        code: generateEventCode(req, res),
        country: req.body.country,
        chapter: req.body.chapter,
        type: req.body.eventType,
        address: req.body.eventAddress || "",
        email: req.body.email ,
        participatingNAs: req.body.participatingNAs,
        theme: req.body.eventTheme || "",
        meetingPointName: req.body.meetingPointName || "",
        meetingPointAddress: req.body.meetingPointAddress || "" ,
        meetingDate: req.body.meetingDate || "",
        nearestAirportName: req.body.nearestAirportName || "" ,
        nearestAirportCode: req.body.nearestAirportCode || "",
        nearestTrainStation: req.body.nearestTrainStation || "",
        arriveBefore: req.body.arriveBefore,
        leaveAfter: req.body.leaveAfter,

      })
      .then(myevent => res.status(201).send(myevent))
      .catch(error => {console.log(error); res.status(400).send(error)});
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
    if (req.params.eventId == null)
    {
      return res.status(404).send({
        message: 'parameter eventId is not defined',
      });
    }
    return MyEvent
      .findById(req.params.eventId, {
        attributes: [ "id", "theme", "country", "chapter" ],
        include: [{
          model: EventParticipation,
          as: 'participations',
          attributes: [ "status" ],
          where: { status: "CLAIMED" },
            include: [{
              model: MyUser,
              attributes: [ "firstName", "middleName", "lastName", "birthday",
                            "gender", "email", "homeNumber", "cellphoneNumber",
                            "country", "city", "address", "zipcode" ]},
            ]
      }]})
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
