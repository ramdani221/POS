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

declare type SaleInput = {
    totalsum: string;
    pay: string;
    change: string;
    customer: number | null;
    operator: number;
}

declare type SalesType = {
    id: number;
    invoice: string;
    createdAt: string;
    totalsum: string;
    pay: string;
    change: string;
    customer: number;
    operator: number;
    Customer: {
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

declare type SaleitemInput = {
    invoice: number;
    itemcode: number;
    quantity: number;
    sellingprice: string;
    totalprice: string;
}

declare type SaleitemsType = {
    id: number;
    invoice: number;
    itemcode: number;
    quantity: number;
    sellingprice: string;
    totalprice: string;
    Good: {
        id: number;
        barcode: string;
        name: string;
    }
}

declare type ParamsDashboard = {
    keyword: string;
    strDate: string;
    endDate: string;
    page: number;
    limit: number | string;
    sort: string;
    sortBy: string;
}

declare type ReportType = {
    monthly: string;
    name: string;
    expense: string;
    revenue: string | null;
    earning: string;
}

declare type NotifInput = {
    barcode: string,
    name: string,
    stock: number | string
}

declare type NotifsType = {
    _id: string,
    barcode: string,
    name: string,
    stock: number,
    isRead: boolean
}

declare type PasswordChange = {
    id: number,
    oldPassword: string,
    newPassword: string,
    rePassword: string
}

declare type NotifInput = {
    barcode: string,
    name: string,
    stock: number
}