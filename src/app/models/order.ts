export interface IOrder {
    $key?:string
    products : [
       { title:string,
        price:number}
    ],
    total:number,
    address:string,
    paymentMethod:string,
    currentOrder:boolean
}
