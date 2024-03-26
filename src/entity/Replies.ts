import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Threads } from "./Threads"

@Entity({name:'replies'})
export class Replies {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable : true})
    image: string

    @ManyToOne (() => User , (user) => user.replies)
    user : User
    
    @ManyToOne (() => Threads, (threads) => threads.replies)
    threads : Threads
}
