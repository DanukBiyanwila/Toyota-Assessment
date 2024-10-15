const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  disability: {
    type: Boolean,
    required: true,
  },
  mealPlane: {
    type: String,
    required: true,
},
dayReq: {
  type: String,
  required: true,
},
adress: {
  type: String,
  required: true,
},
deliveryInstruction: {
  type: String,
  required: true,
},
tp_num: {
  type: Number,
  required: true,
},
sec_tp_num: {
  type: Number,
  required: true,
},
email: {
  type: String,
  required: true,
},
 document: {
   type: String, 
   required: false,
 },
});

const User = mongoose.model('User', UserSchema);

module.exports =User;