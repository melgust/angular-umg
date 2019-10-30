import { TcClient } from './tc-client';
import { TtOrderDetail } from './tt-order-detail';

export class TtOrder {

    public orderId: number;    
    public total: number;
    public createDate: Date;
    public statusId: number;
    public tcClient: TcClient;
    public details: TtOrderDetail[];

}
