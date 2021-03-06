﻿import { Injectable } from '@angular/core';
import { HttpClient } from './http-client.service';
import { Transaction } from './transaction'
import {urlPrefix} from "./constants";


@Injectable()
export class TransactionService {
    constructor(private httpClient: HttpClient) { }

    getTransactions(): Promise<Transaction[]> {
        return this.httpClient.get(urlPrefix + '/api/TransactionInfoes').toPromise().
            then(response => {
            return response.json() as Transaction[];
        }).catch(this.handleError)
    }

    //api/TransactionInfoes/5
    getTransaction(id:number): Promise<Transaction> {
    return this.httpClient.get(urlPrefix + '/api/TransactionInfoes/' + id.toString()).toPromise().
    then(response => {
      return response.json() as Transaction;
    }).catch(this.handleError)
  }

    addTransaction(transaction: Transaction): Promise<boolean>
    {
        //var transactionInfo = { "transactionInfoId": 2018, "amount": "5", "month": "2016-11-20T16:00:00Z", "description": "12", "action": "Remitances", "userInfoId": 1 };
        return this.httpClient.post(urlPrefix + '/api/TransactionInfoes', transaction).toPromise()
            .then(res => res.ok)
            .catch(this.handleError);
    }

    updateTransaction(id:number, transaction: Transaction): Promise<boolean>
    {
        return this.httpClient.put(urlPrefix + '/api/TransactionInfoes/' + id.toString(), transaction).toPromise().
          then(res=>res.ok).
          catch(this.handleError);
    }


  deleteTransaction(id:number): Promise<boolean>
  {

    return this.httpClient.delete(urlPrefix + '/api/TransactionInfoes/' + id.toString()).toPromise().
      then(res=>res.ok).
      catch(this.handleError);
  }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
