const mongoose = require('mongoose');
const nanoid = require('nanoid');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightId: { type: String, require: true, default: nanoid.nanoid(6).toUpperCase() },
  airliner: { type: Schema.Types.ObjectId, ref: 'Airliners' },
  takeOffTime: Date,
  landingTime: Date,
  startFrom: { type: Schema.Types.ObjectId, ref: 'Airports' },
  destination: { type: Schema.Types.ObjectId, ref: 'Airports' },
  type: String,
  price: Schema.Types.Mixed,
  seat: [{ seatType: String, amount: Number }],
  additional: Schema.Types.Mixed,
});

const flightModel = mongoose.model('Flights', flightSchema, 'Flights');

module.exports = {
  create: (flight) => {
    return flightModel.create(flight);
  },
  find: (query) => {
    return flightModel.find(query).populate();
  },
  findById: (_id) => {
    return flightModel.findById(_id).populate();
  },
  update: async (_id, data) => {
    let flight = await flightModel.findOne({ _id: _id });
    Object.assign(flight, data);
    return flight.save();
  },
  delete: (_id) => {
    return flightModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return flightModel.find()
      .limit(perPage)
      .skip(perPage * page).lean();
  }
}