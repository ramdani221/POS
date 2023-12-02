declare type Params = {
    keyword: string;
    page: number;
    limit: number | string;
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
    id: number;
    email: string;
    name: string;
    role: string;
}

declare type UnitInput = {
    unit: string;
    name: string;
    note: string;
}

declare type UnitsType = {
    id: number;
    unit: string;
    name: string;
    note: string;
}

declare type GoodsType = {
    id: number;
    barcode: string;
    name: string;
    stock: string;
    purchaseprice: string;
    sellingprice: string;
    unit: number;
    picture: string;
    Unit: {
        id: number;
        unit: string;
        name: string;
        note: string
    }
}