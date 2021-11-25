import * as service from '../service/financial-eventsService.js';
import jwt from "jsonwebtoken";

async function financialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    if (!token) {
      return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  user = user.id;

  const { value, type } = req.body;

  const isValid = await service.validateFinancialEvent(value, type, user);
  if (!isValid){
    return res.sendStatus(400);
  }

  res.sendStatus(201);
} catch (err) {
  console.error(err);
  res.sendStatus(500);
}
}

async function financialEventList(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }
    user = user.id;

    const events = await service.getEvents(user);
    if (events){
      res.send(events);
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function balance(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }
    user = user.id;

    const sum = await service.calculateTheSum(user)

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  financialEvent,
  financialEventList,
  balance,
}
