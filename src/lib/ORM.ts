import {ObjectId} from 'bson';

export interface Item {
  name: string;
  cost: number;
}
export interface Reciept {
  _id: ObjectId, store: string, address: string, items: Array<Item>,
      total: number, created: Date, updated: Date, transaction_date: Date,
      sub: string
}