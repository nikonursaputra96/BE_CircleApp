export interface IThreads {
    content: string;
    image?: string | null;
    posted_at?: Date;
    userId: number;
}

export interface IUser {
    username: string;
    fullname: string;
    email : string;
    password : string;
    profile_picture? : string;
    profile_description? : string;
}

export interface IRegister {
    username: string;
    fullname: string;
    email : string;
    password : string;
}

export interface IReply {
    id: number;
    content: string;
    image?: string | null;
    userId?: number;
    threadsId?: number;
    posted_at?: Date;

}