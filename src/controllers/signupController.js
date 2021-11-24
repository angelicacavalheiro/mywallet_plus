import * as service from '../service/signupService'

async function signup (req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.sendStatus(400);
      }

      const verificate = await service.authenticate(name, email, password);

      if (verificate == null) {
        return res.sendStatus(409);
      }

      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}
export {
    signup,
}