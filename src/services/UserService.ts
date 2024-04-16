import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { IUser } from "../interfaces/CircleAppInterface";



class UserService {
    private readonly UserRepository:Repository<User> = 
        AppDataSource.getRepository(User)

    async create (reqBody:IUser) :Promise<User> {
        try {
            const repository = await this.UserRepository.save(reqBody)
            return repository
        } catch (error) {
            throw error
        }
    }

    async find () {
        try {
            const user = await this.UserRepository.find();
            return user
            
        } catch (error) {
            throw error
        }
    }

    async findById (id:number) {
        try {
            const find = await this.UserRepository.findOne({where: {id:Number(id)}
            });

            if(!find) throw new Error ("User not found !")

            return find
        } catch (error) {
            throw error
        }
    }

    async update (id: number , reqBody: IUser, image:string ) {
        try {
            const user = await this.UserRepository.findOne({where: {id : Number(id)}
            })

            if(!user) throw new Error ("User not found !")

            const {username, fullname, email, password, profile_description, profile_picture}:IUser = reqBody

            if(username != '') user.username = username
            if(fullname != '') user.fullname = fullname
            if(email != '') user.email = email
            if(password != '') user.password = password
            if(image !== '' && profile_picture != '') user.profile_picture = image
            if(profile_description != '') user.profile_description = profile_description
            
            
            const update = await this.UserRepository.save(user)

            return update
        } catch (error) {
            throw error
        }
    }

    async delete (id: number) {
        try {
            const user = await this.UserRepository.findOne({where: {id:Number(id)}})

            if (!user) throw new Error( "User not found !")
      
           const deleteUser = await this.UserRepository.delete({id:Number (id)})

            return deleteUser
        } catch (error) {
            throw error
        }
    }

    // getUser email for Auth
    async getUser(email:string) : Promise <any> {
        try {
            const response = await this.UserRepository.findOne({where: {email}})
            return response
        } catch (error) {
            throw error
        }
    }
}

export default new UserService()