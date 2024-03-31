export interface IThreads {
    content: string;
    image?: string;
    posted_at?: Date;
    userId: number;
}

export interface IUser {
    username: string;
    fullname: string;
    email : string;
    password : string;
    profile_picture : string;
    profile_description : string;
}