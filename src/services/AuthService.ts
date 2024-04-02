import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { IRegister } from "../interfaces/CircleAppInterface";

class AuthService {
    private readonly UserRepository : Repository<User> = 
    AppDataSource.getRepository(User)

    async register (reqBody: any) : Promise<any> {
        try {
            const isCheckEmail = await this.UserRepository.count({where:{email: reqBody.email}})
            if (isCheckEmail > 0) return 'Email has been registered'

            const user = this.UserRepository.create ({
                username: reqBody.username,
                fullname: reqBody.fullname,
                password: reqBody.password,
                email: reqBody.email
            })

            return await this.UserRepository.save(user)

        } catch (error) {
            throw error
        }
    }

    async login(reqBody:any) : Promise<any> {
        try {
            console.log(reqBody)
        } catch (error) {
            throw error
        }
    }

    async check(reqBody:any) : Promise<any> {
        try {
           console.log(reqBody)
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService()