import { IUserRepository } from "../../src/data/repositories/IUserRepository"
import { UserService } from "../../src/services/UserService"
import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory"

describe("Create user", () => {
    let userRepository: IUserRepository
    let userService: UserService

    beforeAll(() => {
        userRepository = new UserRepositoryInMemory()
        userService = new UserService(userRepository)
    })

    it("Should be able to create a new user", async () => {
        const userData = {
            username: "testName",
            email: "test@mail.com",
            password: "testTEST123@",
            confirmPassword: "testTEST123@"
        }

        const user = await userService.createUser(userData)

        expect(user).toHaveProperty("id")
        expect(user.username).toBe("testName")
        expect(user.email).toBe("test@mail.com")
    })

    it("Should be unable to create an existing user", async () => {
        const userData = {
            username: "testNameExists",
            email: "testexists@mail.com",
            password: "testTEST123@",
            confirmPassword: "testTEST123@"
        }

        await userService.createUser(userData)

        await expect(userService.createUser(userData)).rejects.toThrow(
            new Error("This email is already in use")
        )
    })

    it("Should be able to authenticate user", async () => {
        const userData = {
            username: "testNameAuth",
            email: "testauth@mail.com",
            password: "testTEST123@",
            confirmPassword: "testTEST123@"
        }
        await userService.createUser(userData)

        const authUser = {
            email: "testauth@mail.com",
            password: "testTEST123@"
        }
        const auth = await userService.authenticateUser(authUser)

        expect(auth).toHaveProperty("token")
    })
})