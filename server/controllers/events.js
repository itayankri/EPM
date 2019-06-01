const MyEvent = require('../models').Event;
const EventParticipation = require('../models').Participations;
const MyUser = require('../models').User;
const MyRole = require('../models').EventRole;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pdfController = require('../pdfs/pdfFiller');
const MyIndicators = require('../models').Indicators;
const MyEvidences = require('../models').Evidences;

const eventsDictionary = Object.freeze({
  SEMINAR: 'S',
  VILLAGE: 'V',
  STEPUP: 'C'
});

function formatDate(date) {
  return date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear()
}

function generateEventCode(req, res) {
  const year = new Date(req.body.start).getFullYear();
  console.log(year);
  return MyEvent.findAll({
    where: {
      start: {
        [Op.lt]: new Date((Number(year)), 11, 31, 23, 59, 59), // less than december 31, 23:59:59 same year
        [Op.gt]: new Date((Number(year)), 00, 01)              // more than january 1, 00:00:00 same year
      },
      type: req.body.eventType.toString().toLowerCase()
    }
  })
    .then(myevents => {
      let count = 0;
      if (myevents) {
        count = myevents.length;
      }
      count++;
      return (eventsDictionary[req.body.eventType.toString().toUpperCase()] + "-" + year + "-" + count.toString().padStart(3, '0'));
    });
}

function compareValues(key, order = 'asc') {
  return function (a, b) {
    if (!a.hasOwnProperty(key) ||
      !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ?
        (comparison * -1) : comparison
    );
  };
}

function shuffleArray(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function shuffleDict(d) {
  let myParticipants = {};
  Object.entries(d).forEach(([key, value]) => {
    let newval = value;
    for (let i = newval.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newval[i], newval[j]] = [newval[j], newval[i]];
    }
    myParticipants[key] = newval;
  });
  return myParticipants;
}

module.exports = {
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
          where: { status: "APPROVED" },
          include: [{
            model: MyUser,
            attributes: ["id", "firstName", "lastName", "gender", "country"],
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
  indicators(req, res) {
    if (req.params.eventId == null) {
      return res.status(404).send({
        message: 'parameter eventId is not defined',
      });
    }
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
        return MyIndicators.find({
          where: {
            year: myevent.code.split('-')[1],
            eventType: myevent.type
          }
        })
          .then(myindicators => { res.status(200).send(myindicators) })
      })
      .catch(error => res.status(400).send(error));
  },
  getEvidences(req, res) {
    if (req.params.eventId == null) {
      return res.status(404).send({
        message: 'parameter eventId is not defined',
      });
    }
    if (req.params.userId == null) {
      return res.status(404).send({
        message: 'parameter userId is not defined',
      });
    }
    return MyEvidences.find({
      where: {
        userId: req.params.userId,
        eventId: req.params.eventId
      }
    })
      .then(myevidences => {
        return res.status(200).send(myevidences);
      })
      .catch(err => {
        return res.status(400).send(err);
      })
  },
  setEvidences(req, res) {
    if (req.params.eventId == null) {
      return res.status(404).send({
        message: 'parameter eventId is not defined',
      });
    }
    if (req.params.userId == null) {
      return res.status(404).send({
        message: 'parameter userId is not defined',
      });
    }

    return MyEvidences
      .findOrCreate({
        where: {
          eventId: req.params.eventId,
          userId: req.params.userId,
        },
        defaults: {
          eventId: req.params.eventId,
          userId: req.params.userId,
          values: {}
        }
      }).then(myevidence => {
        return MyEvidences.update({
          userId: req.params.userId || myevidence[0].userId,
          eventId: req.params.eventId || myevidence[0].userId,
          values: req.body.values || JSON.stringify([{ "index": 0, "checked": true, "evidences": [{ "reportingUser": 1, "description": "bla bla bla" }] },
          { "index": 1, "checked": false, "evidences": [] }])
        }, {
            where: {
              id: myevidence[0].id
            },
            //returning: true
          })
      })
      .then(updatedEvidence => res.status(201).send(updatedEvidence))
      .catch(error => { console.log(error); res.status(400).send(error) })
  },
  roomRandomizer(req, res) {
    const { separateBy, rooms, participants } = req.body;

    if (rooms < 3)
      return res.status(400).send({
        message: "Minimum rooms required : 3"
      })
    if (participants.length < 3)
      return res.status(400).send({
        message: "Minimum participants required : 3"
      })


    let dict = {};
    let shuf = shuffleArray(participants)
    shuf.map(x => {
      if (!dict[x.User.country])
        dict[x.User.country] = [];
      dict[x.User.country].push(x);
    });

    let myParticipants = shuffleDict(dict);

    let randomizedRooms = {};
    let boysRooms = 0;
    let girlsRooms = 0;
    for (let i = 0; i < rooms; i++) {
      if (i % 2 === 0) {
        randomizedRooms[(++boysRooms).toString() + "M"] = [];
      }
      else {
        randomizedRooms[(++girlsRooms).toString() + "F"] = [];
      }
    }

    let boysCounter = 0
    let girlsCounter = 0;
    let boysWarning = []
    let girlsWarning = [];

    if (separateBy.includes("country")) {
      Object.entries(myParticipants).forEach(([key, value]) => {
        let boysInCountry = 0
        let girlsInCountry = 0;
        value.map(participant => {
          if (participant.User.gender) {
            let boysIndex = (++boysCounter).toString() + "M";
            if (!randomizedRooms[boysIndex])
              randomizedRooms[boysIndex] = [];
            randomizedRooms[boysIndex].push(participant);
            boysInCountry++;
            if (boysCounter === boysRooms)
              boysCounter = 0;
          }
          else {
            let girlsIndex = (++girlsCounter).toString() + "F";
            if (!randomizedRooms[girlsIndex])
              randomizedRooms[girlsIndex] = [];
            randomizedRooms[girlsIndex].push(participant);
            girlsInCountry++;
            if (girlsCounter === girlsRooms)
              girlsCounter = 0;
          }
        })

        if (boysInCountry > boysRooms)
          boysWarning.push(key);
        if (girlsInCountry > girlsRooms)
          girlsWarning.push(key);

      })
    }
    else {
      shuf.map(participant => {
        if (participant.User.gender) {
          let boysIndex = (++boysCounter).toString() + "M";
          if (!randomizedRooms[boysIndex])
            randomizedRooms[boysIndex] = [];
          randomizedRooms[boysIndex].push(participant);
          if (boysCounter === boysRooms)
            boysCounter = 0;
        }
        else {
          let girlsIndex = (++girlsCounter).toString() + "F";
          if (!randomizedRooms[girlsIndex])
            randomizedRooms[girlsIndex] = [];
          randomizedRooms[girlsIndex].push(participant);
          if (girlsCounter === girlsRooms)
            girlsCounter = 0;
        }
      })

    }
    let warnings = [];
    if (boysWarning.length > 0)
      warnings.push(`Cannot fully randomize by country because ${boysWarning.toString()} has more male participants than male rooms`)
    if (girlsWarning.length > 0)
      warnings.push(`Cannot fully randomize by country because ${girlsWarning.toString()} has more female participants than female rooms`)

    return res.status(200).json({
      rooms: randomizedRooms,
      warnings: warnings
    })

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
        let myPath = pdfController.fillPdfForm(req.body.formName.split(".")[0], {
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
        return res.status(200).send(myPath);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
  },
};
