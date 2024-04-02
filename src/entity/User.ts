import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Threads } from "./Threads"
import { Replies } from "./Replies"
import { Likes } from "./Likes"
import { Follows } from "./Follows"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    fullname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    profile_picture: string

    @Column({nullable: true})
    profile_description: string

    @OneToMany(() => Threads, (threads) => threads.user, {cascade: true})
    threads: Threads[]

    @OneToMany(() => Replies, (replies) => replies.user, {cascade: true})
    replies : Replies[]

    @OneToMany(() => Likes, (likes) => likes.user)
    likes: Likes[]

    @OneToMany(() => Follows, (follows) => follows.follower)
    follower : Follows[]

    @OneToMany(() => Follows, (follows) => follows.followed)
    followed : Follows[]
}
