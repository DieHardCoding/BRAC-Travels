const bookingModel = require("../model/bookings.model");
const ticketModel = require("../model/tickets.model");
const flightModel = require("../model/flights.model");
const emailHelper = require("../helper/email.helper");
const validation = require("../helper/verify.helper");

module.exports.addBooking = (req, res) => {
  bookingModel
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
  bookingModel
    .findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.findByPNR = (req, res) => {
  bookingModel
    .find({ pnr: req.params.pnr, buyerName: req.query.fullname })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.patchBooking = (req, res) => {
  bookingModel
    .update(req.params.id, req.body)
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
  bookingModel
    .list(limit, page)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.deleteBooking = (req, res) => {
  bookingModel
    .delete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

let changeSeat = async (ticketObject) => {
  let flight = await flightModel.findById(ticketObject.flightId);
  for (let i = 0; i < flight.cabinFuselage.length; i++) {
    if (flight.cabinFuselage[i].type == ticketObject.type) {
      for (let j = 0; j < flight.cabinFuselage[i].rows.length; j++) {
        for (let k = 0; k < flight.cabinFuselage[i].rows[j].seats.length; k++) {
          if (
            flight.cabinFuselage[i].rows[j].seats[k].id == ticketObject.seat
          ) {
            flight.cabinFuselage[i].rows[j].seats[k].occupied = true;
            await flightModel.update(flight._id, {
              cabinFuselage: flight.cabinFuselage,
            });
          }
        }
      }
    }
  }
};

module.exports.createBookingAndTickets = async (req, res) => {
  let ticketInfos;
  if (req.body.hasOwnProperty("ticketInfos")) {
    ticketInfos = req.body.ticketInfos;
  }
  if (!Array.isArray(ticketInfos)) {
    return res.status(400).json({ errors: ["Can not find any tickets"] });
  }
  // if (req.body.hasOwnProperty("ticketInfos")) {
  //   ticketInfos = JSON.parse(req.body.ticketInfos);
  // } else if (!Array.isArray(ticketInfos)) {
  //   return res.status(400).json({ errors: ["Does not found any tickets"] });
  // }
  let ticketObjects = [];
  console.log(ticketObjects);
  try {
    let ticketPromises = ticketInfos.map((element) => {
      return ticketModel.create(element);
    });
    ticketObjects = await Promise.all(ticketPromises);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: e });
  }
  req.body.tickets = [];
  req.body.totalPrice = 0;
  ticketObjects.forEach((element) => {
    changeSeat(element);
    req.body.tickets.push(element._id);
    req.body.totalPrice += element.price;
  });

  bookingModel
    .create(req.body)
    .then(async (result) => {
      let emailMessage = `<div style="font-family:sans-serif"><div class="adM"> 
      </div><table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="background:#e6eaed"> 
       <tbody>
        <tr> 
         <td align="center"> 
          <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px"> 
           <tbody>
            <tr> 
             <td align="center" style="padding-top:24px;padding-bottom:24px"> </td> 
            </tr> 
           </tbody>
          </table> </td> 
        </tr> 
        <tr> 
         <td align="center"> 
          <table border="0" align="center" cellpadding="0" cellspacing="0" style="background:#fff;width:100%;max-width:600px"> 
           <tbody>
            <tr> 
             <td> 
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
               <tbody>
                <tr> 
                 <td style="background-image:url(https://ci3.googleusercontent.com/proxy/Uhu-caK7XEuaQmTA_ETdlAXJ4itsPtnZO6jD08nnkj33LtqIIKDCNiX3SJhFWXCGsE89Ggo-FuTHh_H_a-wAI5e9RWpGZfcCXq3MS7l0sbr8bm3DPImvogiBKCjvsnK32Ff6Je4t0Qr-zEf1UozVjWr6pcvFOK1wIR0P5gAJTNJBS62Ai02a_NRB3ERg=s0-d-e1-ft#https://d1gnmtcb0vp69g.cloudfront.net/imageResource/2021/01/28/1611827920940-d828ad41cd15a98d24597862fd09c177.jpeg?tr=q-75);background-repeat:repeat-x no-repeat;width:100%;height:4px;background-color:#259fd9;display:block"></td> 
                </tr> 
               </tbody>
              </table> </td> 
            </tr> 
             
            <tr> 
             <td align="center" valign="top" style="background:#fff;padding-left:16px;padding-right:16px" width="100%"> 
              <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
               <tbody>
                <tr> 
                 <td align="center" valign="top" style="padding-top:24px"> <h1 style="font-weight:normal;font-size:30px;color:#434343;margin:0px;padding:0px">Vé điện tử của quý khách trong thư này!</h1> </td> 
                </tr> 
                <tr> 
                 <td align="left" valign="top"> 
                  <div style="width:100%;height:38px;display:block"></div> <h3 style="font-size:16px;margin:0px;padding:0px;color:#434343"> <strong>Kính gửi quý khách ${result.buyerName},</strong> </h3> 
                  <div style="width:100%;height:16px;display:block"></div> <p style="line-height:25px;font-size:16px;padding:0px;margin:0px"> Yêu cầu đặt vé của quý khách đã được xác nhận thành công, mã đặt chỗ của quý khách là <span style="color: blue;">${result.pnr}</span></p> </td> 
                </tr> 
                <tr> 
                 <td align="center" valign="top"> 
                  
                  
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:16px"> 
                   <tbody>
                    <tr> 
                     <td style="width:100%;background:#444444;height:0px"></td> 
                    </tr> 
                   </tbody>
                  </table> </td> 
                </tr> 
               </tbody>
              </table> </td> 
            </tr> 
            <tr> 
             <td style="background-color:#e6eaed"> 
              <table style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%"> 
               <tbody> 
                <tr style="padding:0;text-align:left;vertical-align:top"> 
                 <td height="16px" style="Margin:0;border-collapse:collapse!important;color:#434343;font-size:16px;font-weight:normal;line-height:16px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp; </td> 
                </tr> 
               </tbody> 
              </table> </td> 
            </tr> 
           </tbody>
          </table> </td> 
        </tr> 
       </tbody>
      </table>      
      <img style="display:block;font-size:0px;line-height:0em" src="https://ci5.googleusercontent.com/proxy/cdw-MENhpV8AlrnT5wilQ84y-djlWqJlo1Y40enyGwtAepIbKqZ1n3IO5PEvpNTzcwV1jrExm7f2tV9dUGXp7GmWt-fV18hMeL6XNscX9uKo3OJQXMWrq75yptw=s0-d-e1-ft#https://messaging-callback-api.msg.traveloka.com/o?id=1697564480904392067" alt="" width="1" height="1" border="0" class="CToWUd"><div class="yj6qo"></div><div class="adL">
     </div>
    </div>`;
      email = result.email;
      if (validation.emailValidation(email)) {
        emailHelper.sendEmail(result.email, "Confirm booking", emailMessage);
      }
      res.status(201).json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
};

module.exports.searchByFlight = (req, res) => {
  if (!req.query.hasOwnProperty("flightId")) {
    return res.status(400).json({ errors: ["No flightId"] });
  }
  //console.log(req.query.flightId);
  bookingModel
    .searchByFlight(req.query.flightId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};
