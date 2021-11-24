import * as repository from '../repositories/signupRepository.js';
import bcrypt from "bcrypt";

async function authenticate (name, email, password) {
    const user = await repository.findByEmail(email);
    if (user) {
      return null;
    } else {
      const hashedPassword = bcrypt.hashSync(password, 12);
      const insertUser = await repository.createUser(name, email, hashedPassword);
      if(!insertUser){
        return null
      }
      return "valid"
    }
}

export {
    authenticate,
}