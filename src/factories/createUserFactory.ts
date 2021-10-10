import { UserController } from "../controllers/UserController"
import { UserRepository } from "../data/repositories/UserRepository"
import { UserService } from "../services/UserService"

export const createUserFactory = () => {
    const userRepo = new UserRepository()
    const createUser = new UserService(userRepo)
    const createUserController = new UserController(createUser)

    return createUserController
}