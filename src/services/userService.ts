import userRepository from "../data/repositories/userRepository"
import emailValidator from "../validation/emailValidator"
import passwordValidator from "../validation/passwordValidator"

interface IUserRequest {
    username: string
    email: string
    password: string
    confirmPassword: string
}

interface IUAuthRequest {
  email: string
  password: string
}

class userService {
    async saveUser({username, email, password, confirmPassword}: IUserRequest) {
        if (passwordValidator.isValid(password, confirmPassword) === false) {
            throw new Error("Password does not match requirements or confirmation password")
          }
        
          if (emailValidator.isValid(email) === false) {
            throw new Error("Invalid email")
          }
        
          if(await userRepository.findUserByEmail(email)) {
            throw new Error("This email is already in use")
          }

        const newUser = userRepository.addUser(username, email, password)

        return newUser
    }

    async authenticateUser({email, password}: IUAuthRequest) {
      const user = await userRepository.findUserByEmail(email)

      if (user === null) {
        return await userRepository.authenticateUser(password, user)
      }

      throw new Error("User not found by this email")
    }
}

export default new userService()