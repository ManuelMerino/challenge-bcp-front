import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ExchangeRateRequest } from '../classes/exchangeRateRequest';
import { ExchangeRateResponse } from '../classes/exchangeRateResponse';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {

  @ViewChild('alertMessage') alert: ElementRef;
  exchangeRateResponse = {} as ExchangeRateResponse;
  isError = false;
  errorMessage: string = '';
  currencies: string[];

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getCurrencies().subscribe(response => {
      this.currencies = response[0];
    });
  }

  convert(amount: number, originCurrency: string, destinationCurrency: string) {
    this.isError = amount == null || amount <= 0;
    if (!this.isError) {
      const exchangeRateRequest: ExchangeRateRequest = {
        amount,
        originCurrency,
        destinationCurrency
      };
      this.exchangeRateService.convert(exchangeRateRequest)
        .subscribe((response) => {
          this.exchangeRateResponse = response[0];
        });
    } else {
      this.errorMessage = 'Debe indicar el monto';
      if (this.alert) {
        this.alert.nativeElement.classList.add('show');
      }
    }
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  clean() {
    this.exchangeRateResponse.amountWithExchangeRate = null;
    this.exchangeRateResponse.exchangeRate = null;
  }
}
