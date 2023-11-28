declare type UserParams = {
    keyword: string;
    page: number;
    limit: number;
    sort: string;
    sortBy: string;
}

declare type UserInput = {
    email: string;
    name: string;
    password: string;
    role: string;
}

declare type UserEdit = {
    email: string;
    name: string;
    role: string;
}

declare type UsersType = { 
    id: number, 
    email: string, 
    name: string, 
    role: string 
}