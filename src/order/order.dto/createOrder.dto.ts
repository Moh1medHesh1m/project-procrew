
export class CreateOrderDto {
    products: OrderProductDto[];
    restaurant: string;
    total: number;
}


export class OrderProductDto {
    readonly price: number;
    readonly quantity: number;
    readonly title: string;

}