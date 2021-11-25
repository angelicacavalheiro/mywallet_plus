import * as repository from '../repositories/signinRepository.js';
import bcrypt from "bcrypt";

async function checkInputs(email, password) {
    const user = await repository.fetchUserData(email, password)
    if(!user){
        return null
    } else {
        if (!bcrypt.compareSync(password, user.password)) {
            return null
        } else {
            return "valid"
        }
    }
}

export {
    checkInputs,
}