import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
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

    @Column({type: "timestamp" , default: () => "CURRENT_TIMESTAMP"})
    posted_at: Date

    @ManyToOne (() => User , (user) => user.replies)
    @JoinColumn()
    user : User
    
    @ManyToOne (() => Threads, (threads) => threads.replies)
    @JoinColumn()
    threads : Threads
}
