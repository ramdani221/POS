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
    stock: number;
    purchaseprice: string;
    sellingprice: string;
    unit: number;
    picture: string;
    Unit: {
        id: number;
        unit: string;
        name: string;
        note: string;
    }
}

declare type SupplierInput = {
    name: string;
    address: string;
    phone: string;
}

declare type SuppliersType = {
    id: number;
    name: string;
    address: string;
    phone: string;
}

declare type PurchaseInput = {
    totalsum: string;
    supplier: number | null;
    operator: number;
}

declare type PurchasesType = {
    id: number;
    invoice: string;
    createdAt: string;
    totalsum: string;
    supplier: number;
    operator: number;
    Supplier: {
        id: number;
        name: string;
        address: string;
        phone: string;
    };
    User: {
        id: number;
        email: string;
        name: string;
        role: string;
    }

}

declare type PurchaseitemInput = {
    invoice: number;
    itemcode: number;
    quantity: number;
    purchaseprice: string;
    totalprice: string;
}

declare type PurchaseitemsType = {
    id: number;
    invoice: number;
    itemcode: number;
    quantity: number;
    purchaseprice: string;
    totalprice: string;
    Good: {
        id: number;
        barcode: string;
        name: string;
    }

}

declare type CustomerInput = {
    name: string;
    address: string;
    phone: string;
}

declare type CustomersType = {
    id: number;
    name: string;
    address: string;
    phone: string;
}