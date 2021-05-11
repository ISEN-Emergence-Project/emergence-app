/**
 * MEETINGS CONTROLLER
 * Answers to API requests from /meetings router
 */


const spawn = require('child_process').spawn;

const Meeting = require('../models/Meeting');
const Preselection = require('../models/Preselection');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    // List all meetings
    list (req, res) {
        return commonsController.list(req, res, Meeting);
    },

    // Insert a new meeting
    insert (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId, timeSlot, godfatherRating, laureateRating } = req.body;

        if (!fkGodfatherAccountId || !fkLaureateAccountId || !godfatherRating || !laureateRating) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: fkGodfatherAccountId, fkLaureateAccountId, godfatherRating, laureateRating'
            })
        }
        
        return Meeting
            .create({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId,
                timeSlot: timeSlot,
                godfatherRating: godfatherRating,
                laureateRating: laureateRating
            })
            .then((Meeting) => {
                res.status(201).json(Meeting);
            })
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    // Update an existing meeting
    update (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId, timeSlot, godfatherRating, laureateRating } = req.body;

        return Meeting
            .update({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId,
                timeSlot: timeSlot,
                godfatherRating: godfatherRating,
                laureateRating: laureateRating
            }, {
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                },
                returning: true
            })
            .then(([, meeting]) => {
                if (!meeting[0]) {
                    return res.status(404).json({ message: 'Meeting not found' });
                }
                return res.status(200).json(meeting[0])
            })
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    // Delete a meeting
    delete (req, res) {
        return Meeting
            .findOne({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Meeting not found',
                    });
                }
                return Meeting
                    .destroy({
                        where: {
                            fkGodfatherAccountId: req.params.godfatherId,
                            fkLaureateAccountId: req.params.laureateId
                        }
                    })
                    .then(() => res.status(204).json())
                    .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ message: 'Internal error' });
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ message: 'Internal error' });
            });
    },

    // Get a meeting by fkGodfatherAccountId and fkLaureateAccountId
    getByGodfatherLaureate (req, res) {
        return Meeting
            .findOne({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then((meeting) => {
                if (!meeting) {
                    return res.status(404).json({
                        message: 'Meeting Not Found',
                    });
                }
                return res.status(200).json(meeting);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Meeting not found' });
            });
    },

    // List meetings by fkGodfatherAccountId
    listByGodfather (req, res) {
        return Meeting
            .findAll({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId
                }
            })
            .then((meetings) => {
                if (!meetings) {
                    return res.status(404).json({
                        message: 'Meeting Not Found',
                    });
                }
                return res.status(200).json(meetings);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    // List meetings by fkLaureateAccountId
    listByLaureate (req, res) {
        return Meeting
            .findAll({
                where: {
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then((meetings) => {
                if (!meetings) {
                    return res.status(404).json({
                        message: 'Meeting Not Found',
                    });
                }
                return res.status(200).json(meetings);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    algorithmMeetings(req, res) {
        return Preselection
            .findAll()
            .then((preselections) => {
                let inputPreselections = [];

                // Format inputPreselection, add godfather's preselections
                preselections.forEach((preselection) => {
                    const existingInputPreselections = inputPreselections.find((p) => p.godfatherId === preselection.fkGodfatherAccountId);

                    if (existingInputPreselections) {
                        const filteredInputPreselections = inputPreselections.filter((p) => p.godfatherId !== preselection.fkGodfatherAccountId);

                        inputPreselections = [...filteredInputPreselections, {
                            godfatherId: preselection.fkGodfatherAccountId,
                            preselections: [...existingInputPreselections.preselections, {
                                laureateId: preselection.fkLaureateAccountId
                            }]
                        }]
                    } else {
                        inputPreselections = [...inputPreselections, {
                            godfatherId: preselection.fkGodfatherAccountId,
                            preselections : [{
                                laureateId: preselection.fkLaureateAccountId
                            }]
                        }]
                    }
                })

                console.log('input: ' + inputPreselections);

                // TODO format input, then get python script result

                // spawn new child process to call the python script
                const process = spawn('python', ['../algorithms/algorithm.py', inputPreselections]);
                let outputMeetings = [];

                // collect data from script
                process.stdout.on('data',(data) => {
                    console.log(data.toString());

                    // save output
                    outputMeetings = data;
                });

                // in close event we are sure that stream is from child process is closed
                process.on('close', code => {
                    console.log(`child process close all stdio with code ${code}`);

                    // send data to browser
                    res.status(200).send(outputMeetings);
                });
            })
    }
};
