var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;
var ScheduleSchema = new Schema({

  doctor_id:             { type: String, required: true },
  doctorEmail:           { type: String, required: true }, 
  doc_firstname:         { type: String, required: true },
  doc_lastname:          { type: String, required: true },
  patientName:           { type: String, required: true },
  patient_id:            { type: String, required: true },
  message:               { type: String, required: true },
  SelectedDay:           { type: String, required: true },
  startTime:             { type: String, required: true },
  endTime:               { type: String, required: true },
  status:                { type: String, default: 'pending' }
});

module.exports     = mongoose.model('Schedule', ScheduleSchema);
