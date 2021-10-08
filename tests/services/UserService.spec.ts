import { UserService } from "../../src/services/UserService"
import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory"

describe("Create user", () => {
    it("Should be able to create a new user", async () => {
        const userRepository = new UserRepositoryInMemory()
        const userService = new UserService(userRepository)

        const userData = {
            username: "testName",
            email: "test@mail.com",
            password: "testTEST123@",
            confirmPassword: "testTEST123@"
        }

        const user = await userService.createUser(userData)

        expect(user).toHaveProperty("id")
    })
})