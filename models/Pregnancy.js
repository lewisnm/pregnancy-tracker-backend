const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PregnancySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  trimester: {
    type: String,
    enum: ['First', 'Second', 'Third'],
    required: true
  },
  milestones: [
    {
      description: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pregnancy = mongoose.model('Pregnancy', PregnancySchema);
module.exports = Pregnancy;