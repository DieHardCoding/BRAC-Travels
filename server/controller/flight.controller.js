const flightModel = require("../model/flights.model");
const airlinerModel = require("../model/airliners.model");
const airportModel = require("../model/airports.model");
const mongoose = require("mongoose");

const cabinFuselage = [
  {
    index: 1,
    type: "SkyBOSS",
    rows: [
      {
        rowIndex: 1,
        seats: [
          { id: "1A", occupied: false },
          { id: "1B", occupied: false },
          { id: "1C", occupied: false },
          { id: "1D", occupied: false },
          { id: "1E", occupied: false },
          { id: "1F", occupied: false },
        ],
      },
      {
        rowIndex: 2,
        seats: [
          { id: "2A", occupied: false },
          { id: "2B", occupied: false },
          { id: "2C", occupied: false },
          { id: "2D", occupied: false },
          { id: "2E", occupied: false },
          { id: "2F", occupied: false },
        ],
      },
      {
        rowIndex: 3,
        seats: [
          { id: "3A", occupied: false },
          { id: "3B", occupied: false },
          { id: "3C", occupied: false },
          { id: "3D", occupied: false },
          { id: "3E", occupied: false },
          { id: "3F", occupied: false },
        ],
      },
      {
        rowIndex: 4,
        seats: [
          { id: "4A", occupied: false },
          { id: "4B", occupied: false },
          { id: "4C", occupied: false },
          { id: "4D", occupied: false },
          { id: "4E", occupied: false },
          { id: "4F", occupied: false },
        ],
      },
    ],
    columns: 4,
  },
  {
    index: 2,
    type: "Deluxe",
    rows: [
      {
        rowIndex: 1,
        seats: [
          { id: "5A", occupied: false },
          { id: "5B", occupied: false },
          { id: "5C", occupied: false },
          { id: "5D", occupied: false },
          { id: "5E", occupied: false },
          { id: "5F", occupied: false },
        ],
      },
      {
        rowIndex: 2,
        seats: [
          { id: "6A", occupied: false },
          { id: "6B", occupied: false },
          { id: "6C", occupied: false },
          { id: "6D", occupied: false },
          { id: "6E", occupied: false },
          { id: "6F", occupied: false },
        ],
      },
      {
        rowIndex: 3,
        seats: [
          { id: "7A", occupied: false },
          { id: "7B", occupied: false },
          { id: "7C", occupied: false },
          { id: "7D", occupied: false },
          { id: "7E", occupied: false },
          { id: "7F", occupied: false },
        ],
      },
      {
        rowIndex: 4,
        seats: [
          { id: "8A", occupied: false },
          { id: "8B", occupied: false },
          { id: "8C", occupied: false },
          { id: "8D", occupied: false },
          { id: "8E", occupied: false },
          { id: "8F", occupied: false },
        ],
      },
    ],
    columns: 4,
  },
  {
    index: 3,
    type: "Eco",
    rows: [
      {
        rowIndex: 1,
        seats: [
          { id: "9A", occupied: false },
          { id: "9B", occupied: false },
          { id: "9C", occupied: false },
          { id: "9D", occupied: false },
          { id: "9E", occupied: false },
          { id: "9F", occupied: false },
        ],
      },
      {
        rowIndex: 2,
        seats: [
          { id: "10A", occupied: false },
          { id: "10B", occupied: false },
          { id: "10C", occupied: false },
          { id: "10D", occupied: false },
          { id: "10E", occupied: false },
          { id: "10F", occupied: false },
        ],
      },
      {
        rowIndex: 3,
        seats: [
          { id: "11A", occupied: false },
          { id: "11B", occupied: false },
          { id: "11C", occupied: false },
          { id: "11D", occupied: false },
          { id: "11E", occupied: false },
          { id: "11F", occupied: false },
        ],
      },
      {
        rowIndex: 4,
        seats: [
          { id: "12A", occupied: false },
          { id: "12B", occupied: false },
          { id: "12C", occupied: false },
          { id: "12D", occupied: false },
          { id: "12E", occupied: false },
          { id: "12F", occupied: false },
        ],
      },
    ],
    columns: 4,
  },
];

module.exports.createFlight = async (req, res) => {
  try {
    /*if (req.body.hasOwnProperty("seat")) {
      req.body.seat = JSON.parse(req.body.seat);
    }
    if (req.body.hasOwnProperty("additional")) {
      req.body.additional = JSON.parse(req.body.additional);
    }
    if (req.body.hasOwnProperty("price")) {
      req.body.price = JSON.parse(req.body.price);
    }*/
    if (req.body.hasOwnProperty("cabinFuselage")) {
      /* req.body.cabinFuselage = JSON.parse(req.body.cabinFuselage); */
    } else {
      req.body.cabinFuselage = cabinFuselage;
    }
    if (req.body.hasOwnProperty("airliner")) {
      let airliner = await airlinerModel.findById(req.body.airliner);
      if (!airliner) throw new Error("Not exist airliner");
    }
    if (req.body.hasOwnProperty("startFrom")) {
      let airport = await airportModel.findById(req.body.startFrom);
      if (!airport) throw new Error("Not exist airport");
    }
    if (req.body.hasOwnProperty("destination")) {
      let airport = await airportModel.findById(req.body.destination);
      if (!airport) throw new Error("Not exist airport");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e });
  }
  flightModel
    .create(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.findById = (req, res) => {
  flightModel
    .findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  flightModel
    .list(limit, page)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.patchFlight = async (req, res) => {
  try {
    /* if (req.body.hasOwnProperty("seat")) {
      req.body.seat = JSON.parse(req.body.seat);
    }
    if (req.body.hasOwnProperty("additional")) {
      req.body.additional = JSON.parse(req.body.additional);
    }
    if (req.body.hasOwnProperty("cabinFuselage")) {
      req.body.cabinFuselage = JSON.parse(req.body.cabinFuselage);
    } */
    if (req.body.hasOwnProperty("airliner")) {
      let airliner = await airlinerModel.findById(req.body.airliner);
      if (!airliner) throw new Error("airport does not exist");
    }
    if (req.body.hasOwnProperty("startFrom")) {
      let airport = await airportModel.findById(req.body.startFrom);
      if (!airport) throw new Error("airport does not exist");
    }
    if (req.body.hasOwnProperty("destination")) {
      let airport = await airportModel.findById(req.body.destination);
      if (!airport) throw new Error("airport does not exist");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e });
  }
  flightModel
    .update(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.deleteFlight = (req, res) => {
  flightModel
    .delete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.listFlightInDate = async (req, res) => {
  if (!req.query.date || !req.query.start || !req.query.destination) {
    return res.status(400).json({ errors: "Not enough arguments" });
  }
  let passengers = 1;
  if (req.query.passenger) {
    passengers = parseInt(req.query.passenger);
  }
  let listAll = req.query.listall
    ? req.query.listall.toLowerCase() === "true"
    : false;
  var date = new Date(req.query.date);
  date.setHours(0, 0, 0, 0);
  var tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  var current = new Date();
  let queryAggregate = [
    {
      $match: {
        startFrom: mongoose.Types.ObjectId(req.query.start),
        destination: mongoose.Types.ObjectId(req.query.destination),
        takeOffTime: { $gt: current, $gt: date, $lte: tomorrow },
      },
    },
    {
      $lookup: {
        from: "Tickets",
        localField: "_id",
        foreignField: "flightId",
        as: "tickets",
      },
    },
    {
      $lookup: {
        from: "Airliners",
        localField: "airliner",
        foreignField: "_id",
        as: "airliner",
      },
    },
    {
      $lookup: {
        from: "Airports",
        localField: "startFrom",
        foreignField: "_id",
        as: "startFrom",
      },
    },
    {
      $lookup: {
        from: "Airports",
        localField: "destination",
        foreignField: "_id",
        as: "destination",
      },
    },
    {
      $unwind: {
        path: "$airliner",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$startFrom",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$destination",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        totalEco: {
          $size: {
            $filter: {
              input: "$tickets",
              as: "tickets",
              cond: {
                $eq: ["$$tickets.status", true],
                $eq: ["$$tickets.type", "Eco"],
              },
            },
          },
        },
        totalDeluxe: {
          $size: {
            $filter: {
              input: "$tickets",
              as: "tickets",
              cond: {
                $eq: ["$$tickets.status", true],
                $eq: ["$$tickets.type", "Deluxe"],
              },
            },
          },
        },
        totalSB: {
          $size: {
            $filter: {
              input: "$tickets",
              as: "tickets",
              cond: {
                $eq: ["$$tickets.status", true],
                $eq: ["$$tickets.type", "SkyBOSS"],
              },
            },
          },
        },
      },
    },
  ];
  try {
    let flights = await flightModel.aggregate(queryAggregate);
    let deleteFlight = [];
    for (let i = 0; i < flights.length; i++) {
      flights[i].tickets.forEach((ticket) => {
        if (ticket.status === false) {
          if (ticket.type === "Eco") {
            let createTime = ticket.createAt.getSeconds();
            let currentTime = current.getSeconds();
            let _24hoursSecond = 24 * 60 * 60;
            if (currentTime < createTime + _24hoursSecond) {
              flights[i].totalEco++;
            }
          }
          if (ticket.type === "Deluxe") {
            let createTime = ticket.createAt.getSeconds();
            let currentTime = current.getSeconds();
            let _24hoursSecond = 24 * 60 * 60;
            if (currentTime < createTime + _24hoursSecond) {
              flights[i].totalDeluxe++;
            }
          }
          if (ticket.type === "SkyBOSS") {
            let createTime = ticket.createAt.getSeconds();
            let currentTime = current.getSeconds();
            let _24hoursSecond = 24 * 60 * 60;
            if (currentTime < createTime + _24hoursSecond) {
              flights[i].totalSB++;
            }
          }
        }
      });
      delete flights[i].tickets;
      let full = 0;
      flights[i].seat.forEach((s) => {
        if (s.seatType === "Eco") {
          if (flights[i].totalEco + passengers > s.amount) {
            full++;
          }
        }
        if (s.seatType === "Deluxe") {
          if (flights[i].totalDeluxe + passengers >= s.amount) {
            full++;
          }
        }
        if (s.seatType === "SkyBOSS") {
          if (flights[i].totalSB + passengers >= s.amount) {
            full++;
          }
        }
      });
      if (full === 3) {
        deleteFlight.push(flights[i]._id);
      }
    }
    deleteFlight.forEach((f) => {
      let i = 0;
      for (; i < flights.length; i++) {
        if (flights[i]._id === f) break;
      }
      flights.splice(i, 1);
    });
    res.status(200).json(flights);
  } catch (e) {
    res.status(500).json({ errors: [e] });
  }
};
