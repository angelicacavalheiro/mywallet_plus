import * as service from '../service/signupService'

async function signin (req, res) {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await connection.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email]
    );

    if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({
      id: user.rows[0].id
    }, process.env.JWT_SECRET);

    res.send({
      token
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export {
    signin,
}