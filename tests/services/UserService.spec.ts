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

    it("Should be unable to create an user if password does not match the requirements", async () => {
        const userData = {
            username: "testInvalidPassword",
            email: "testinvalidpassword@mail.com",
            password: "invalidPassword",
            confirmPassword: "invalidPassword"
        }

        await expect(userService.createUser(userData)).rejects.toThrow(
            new Error("Password does not match requirements")
        )
    })

    it("Should be unable to create an user if email is invalid", async () => {
        const userData = {
            username: "testInvalidEmail",
            email: "testinvalidemail",
            password: "testTEST123@",
            confirmPassword: "testTEST123@"
        }

        await expect(userService.createUser(userData)).rejects.toThrow(
            new Error("Invalid email")
        )
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

    it("Should be unable to authenticate if user not found", async () => {
        const userData = {
            username: "testNameAuthError",
            email: "testautherror@mail.com",
            password: "testTEST123@",
            confirmPassword: "testTEST123@"
        }
        await userService.createUser(userData)

        const authUser = {
            email: "testau@mail.com",
            password: "testTEST123@"
        }

        await expect(userService.authenticateUser(authUser)).rejects.toThrow(
            new Error("User not found by this email")
        )
    })
})