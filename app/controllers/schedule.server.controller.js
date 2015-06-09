'use strict';

var Schedule = require('./../models/schedule');

module.exports =  {
  getSchedules: function (req, res) {
    Schedule.find(function (err, doc) {
      if(err)
        res.send('An error occured');
      res.send(doc);
    })
  },

  getSchedule: function (req, res) {
    var schedule_id = req.params.id;
    Schedule.findById(schedule_id, function(err, doc){
      if(err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      res.json(doc);
    });
  },

  getPatientSchedule: function(req, res) {
    var patient_id = req.params.id;
    Schedule.find({ 'patient_id': patient_id }, function(err, doc){
      if(err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      res.json(doc);
    });
  },

  saveSchedule: function(req, res) {
    var schedule            = new Schedule();

    schedule.doctor_id      =   req.body.doctor_id;
    schedule.doc_firstname  =   req.body.doc_firstname;
    schedule.doc_lastname   =   req.body.doc_lastname;
    schedule.patient_id     =   req.body.patient_id;
    schedule.message        =   req.body.message;     
    schedule.SelectedDay    =   req.body.SelectedDay; 
    schedule.startTime      =   req.body.startTime;
    schedule.endTime        =   req.body.endTime;

    schedule.save(function(err){
      if (err) {
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      }
      else {
        res.json({ success: true, code: 2000, message: 'Schedule successfully added' });
      }
    });
  },

  editSchedule: function (req, res) {
    var schedule_id = req.params.id;
    Schedule.findById(schedule_id, function (err, schedule) {
      if (err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      else
        if(req.body.message) schedule.message             = req.body.message;
        if(req.body.SelectedDay) schedule.SelectedDay     = req.body.SelectedDay;
        if(req.body.startTime) schedule.startTime         = req.body.startTime;
        if(req.body.endTime) schedule.endTime             = req.body.endTime;
        if(req.body.status) schedule.status               = req.body.status;


        schedule.save(function(err, doc) {
          if(err)
            return res.json({ error: { message: "An unidentified error occured.", code: 9000 } });
          else
            res.json({ message: "Schedule details updated.", code: 2222 });
        });
    });
  },

  deleteSchedule: function(req, res) {
    var schedule_id = req.params.id;
    Schedule.remove({_id: schedule_id}, function(err, schedule) {
      if(err)
        return res.json({ error: { message: "An undefined error occured", code: 9000} });
      else
        res.json({ success: {message: true, code: 200 } });
    });
  }
};