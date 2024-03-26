import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({name:'follows'})
export class Follows {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne (() => User , (user) => user.follower)
    follower : User

    @ManyToOne (() => User, (user) =>user.followed)
    followed : User
    
}
