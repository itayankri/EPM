const MyLeadersNotes = require('../models').LeadersNote;
const MyTasks = require('../models').Task;
const Sequelize = require('sequelize');
//const TodoItem = require('../models').TodoItem;

module.exports = {
    listNotes(req, res) {
        return MyLeadersNotes
            .findAll({
                attributes: [["date", "Meeting Date"],
                             ["content", "Meeting Notes"],
                             ["updatedAt", "Last Update"]],
                where: {
                    eventId: req.params.eventId
                }
            })
            .then(myNotes => {
                res.status(200).send(myNotes);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    addNote(req, res) {
        const { eventId } = req.params
        const { date, content } = req.body
        
        if (!date || date === null) {
            return res.status(404).send({
                message: `Date is not defined`,
              });
        }
        if (!content || content === null || content === "") {
            return res.status(404).send({
                message: `Content is not defined`,
              });
        }

        return MyLeadersNotes
        .findOrCreate({
            where: {
                eventId: eventId,
                date: date,
                content: content
            },
            defaults: {
                eventId: eventId,
                date: Date.now(),
            }
        }).then(myNote => {
            myNote = myNote[0]
            return MyLeadersNotes.update({
                eventId: eventId || myNote.eventId,
                date: date || myNote.date,
                content: (content),
            }, {
                    where: {
                        id: myNote.id
                    },
                    returning: true
                })
        })
        .then(updatedNote => {
            res.status(201).send(updatedNote[1][0])
        })
        .catch(error => { console.log(error); res.status(400).send(error) })
    },
    deleteNote(req, res) {
        const { noteId } = req.params
        const { date } = req.body
        return MyLeadersNotes
            .destroy({
                where: {
                    id: noteId,
                    date: date
                }
            })
            .then((myItem) => {
                if (myItem === 0) {
                    throw "Note doesn't exist"
                }
                res.status(200).send("Deleted")})
            .catch(error => { console.log(error); res.status(400).send(error) })
    },
    listTasks(req, res) {
        return MyTasks
            .findAll({
                attributes: [["completed", "X"],
                             ["name", "Task Name"],
                             ["description", "Description"],
                             "date"],
                where: {
                    eventId: req.params.eventId
                }
            })
            .then(myTasks => {
                res.status(200).send(myTasks);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    addTask(req, res) {
        let { eventId } = req.params
        const { name, date, description, completed } = req.body
        
        if (!name || name === null || name === "") {
            return res.status(404).send({
                message: `Name is not defined`,
              });
        }
        if (!date || date === null) {
            return res.status(404).send({
                message: `Date is not defined`,
              });
        }
        if (!description || description === null || description === "") {
            return res.status(404).send({
                message: `Description is not defined`,
              });
        }

        return MyTasks
        .findOrCreate({
            where: {
                eventId: eventId,
                name: name,
            },
            defaults: {
                eventId: eventId,
                date: Date.now(),
                name: name,
                description: "",
                completed: false
            }
        }).then(myTask => {
            myTask = myTask[0]
            return MyTasks.update({
                eventId: eventId || myTask.eventId,
                name: name || myTask.name,
                date: date || myTask.date,
                completed: (completed !== null ? completed : false),
                description: description || myTask.description
            }, {
                    where: {
                        id: myTask.id
                    },
                    returning: true
                })
        })
        .then(updatedTask => {
            res.status(201).send(updatedTask[1][0])
        })
        .catch(error => { console.log(error); res.status(400).send(error) })
    },
    deleteTask(req, res) {
        const { eventId } = req.params
        const { name } = req.body
        return MyTasks
            .destroy({
                where: {
                    eventId: eventId,
                    name: name
                }
            })
            .then((myItem) => {
                if (myItem === 0) {
                    throw "Task doesn't exist"
                }
                res.status(200).send("Deleted")})
            .catch(error => { console.log(error); res.status(400).send(error) })
    },
};
