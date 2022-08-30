import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Customer } from 'src/app/shared/models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url = "http://localhost/tailor/";
  constructor(private _HttpClient: HttpClient) { }

  getCustomers()
  {
    return this._HttpClient.get<Customer[]>(this.url + "getCustomers.php");
  }

  getCustomersById(id:number)
  {
    return this._HttpClient.get<Customer[]>(
      this.url + "getEmployeeById.php?id=" + id
    );
  }

  addCustomer(customer:Customer)
  {
    return this._HttpClient.post<Customer[]>(this.url + "addCustomer.php",
    customer)
  }

  updateCustomer(customer:Customer, id:number)
  {
    return this._HttpClient.put(
      this.url + "updateCustomer.php?id=" + id,
      customer
    );
  }

  deleteCustomer(id:number)
  {
    return this._HttpClient.delete<Customer[]>(
      this.url + "deleteCustomer.php?id=" + id
    );
  }

}
