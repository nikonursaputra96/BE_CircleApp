import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./User"
import { Likes } from "./Likes"
import { Replies } from "./Replies"

@Entity({name:'threads'})
export class Threads {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable : true})
    image: string

    @Column({type: "timestamp" , default: () => "CURRENT_TIMESTAMP"})
    posted_at: Date

    @ManyToOne (() => User , (user) => user.threads)
    @JoinColumn()
    user : User

    @OneToMany (() => Likes, (likes) => likes.threads)
    likes : Likes[]

    @OneToMany (() => Replies, (replies) => replies.threads)
    replies : Replies[]
    
}
