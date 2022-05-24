import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EndpointconfigService {
  url = ".netlify/functions/endpointconfig"
  data: any;

  constructor(private http: HttpClient) { }

  // saveEndpointConfig(): Observable<any[]> {
  //   console.log('calling endpoint db save');
  //   return this.http.get<any>(this.url); 
  // }
  async saveEndpointConfig(parameter: any) {
    const url = `.netlify/functions/endpointconfig?q=${parameter}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('response from endpoint func'+JSON.stringify(data));
        return data;
    } catch (err) {
        console.log(err);
    }
  }
  async fetchEndpoints() {
    const url = `.netlify/functions/fetchendpoints`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('response from endpoint sss ss func'+JSON.stringify(data));
        return data;
    } catch (err) {
        console.log(err);
    }
  }
}
