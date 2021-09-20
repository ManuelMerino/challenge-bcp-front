import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRateRequest } from '../classes/exchangeRateRequest';
import { Injectable } from '@angular/core';
import { ExchangeRateResponse } from '../classes/exchangeRateResponse';
import {environment} from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExchangeRateService {

    private URL_SERVER = environment.api;
    private HTTP_OPTIONS = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${environment.token}`
        })
      };

    constructor(private httpClient: HttpClient) {}

    convert(exchangeRateRequest: ExchangeRateRequest): Observable<ExchangeRateResponse> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<ExchangeRateResponse>(`${this.URL_SERVER}/api/exchange-rates/converter`, exchangeRateRequest, this.HTTP_OPTIONS);
    }

    getCurrencies(): Observable<any> {
      // tslint:disable-next-line:max-line-length
      return this.httpClient.get<any>(`${this.URL_SERVER}/api/exchange-rates/currencies`, this.HTTP_OPTIONS);
    }
}
