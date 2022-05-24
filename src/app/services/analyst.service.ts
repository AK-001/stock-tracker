import { Injectable } from '@angular/core';

export class Customer {
  exchange!: string;
  shortname!: string;
  quoteType!: string;
  symbol!: string;
  index!: string;
  score!: number;
  typeDisp!: string;
  longname!: string;
  exchDisp!: string;
  sector!: string;
  industry!: string;
  dispSecIndFlag?: boolean;
  isYahooFinance!: boolean;
}

@Injectable()
export class AnalystService {

  constructor() { }
  getCustomers() {
    return Customer;
  }
}
