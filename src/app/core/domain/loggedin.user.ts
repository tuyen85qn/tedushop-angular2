export class LoggedInUSer {
    constructor(access_token: string, username: string, password: string, fullname: string, email: string, avatar: string) {
        this.access_token = access_token;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.avatar = avatar;

    }
    public id: string;
    public access_token: string;
    public username: string;
    public password: string;
    public fullname: string;
    public email: string;
    public avatar: string;
}