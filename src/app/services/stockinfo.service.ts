import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StockinfoService {
  //url = ".netlify/functions/stockinfo"

  constructor(private http: HttpClient) { }
  

  // getStockinfo() {
  //   return this.http.get<any>(this.url); 
  // }
  async getStockinfo(parameter: any) {
    const url = `.netlify/functions/stockinfo?api=${parameter}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('response from netlify'+JSON.stringify(data));
        return data;
    } catch (err) {
        console.log(err);
    }
  }
}
