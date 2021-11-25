import * as service from '../service/signinService.js';
import jwt from "jsonwebtoken";

async function signin (req, res) {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await service.checkInputs(email, password)
    if(!user){
        return res.sendStatus(401)
    }

    const token = jwt.sign({
      id: user.id
    }, process.env.JWT_SECRET);

    res.send({
      token
    }).status(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  signin,
}

