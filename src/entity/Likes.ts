import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Threads } from "./Threads"

@Entity({name:'likes'})
export class Likes {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne (() => User , (user) => user.likes)
    user : User

    @ManyToOne (() => Threads, (threads) =>threads.likes)
    threads : Threads
    
}
