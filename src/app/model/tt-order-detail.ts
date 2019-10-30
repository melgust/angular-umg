import { TtOrder } from './tt-order';
import { TcProduct } from './tc-product';

export class TtOrderDetail {

    public orderId: number;    
    public price: number;
    public totalCost: number;
    public totalItems: number;
    public createDate: Date;
    public statusId: number;
    public ttOrder: TtOrder;
    public tcProduct: TcProduct;

}
