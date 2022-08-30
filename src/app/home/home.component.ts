import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../core/services/customers.service';
import { Customer } from '../shared/models/customer.model';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _CustomersService: CustomersService, private _Router:Router,
    private _ToastrService: ToastrService) { }

  customers : Customer[] = [];
  customer : Customer[] = [];
  search: string = "";
  id : number = 0;
  showModal : boolean = false;

  // pagination declare

  // start : number = 0;
  // end : number = 8;
  // division : number = 0;
  // remainder : number = 0;
  // result : number = 0;


  listForm = new FormGroup({
    name : new FormControl( [Validators.required,Validators.minLength(3)]),
    tall: new FormControl( Validators.required),
    kom: new FormControl( Validators.required),
    sdr: new FormControl(Validators.required),
    west : new FormControl( Validators.required),
    wasa : new FormControl( Validators.required),
    mobile : new FormControl(),
    note : new FormControl()
  })


  get listFormValidate() {return this.listForm.controls};

  ngOnInit(): void {
    this._CustomersService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });

  }

  getCustomerId(id:number)
  {
    this._CustomersService.getCustomersById(id).subscribe((customer) => {
      this.customer = customer;
      this.id = this.customer[0].id;
      this.listForm.patchValue({
        name : this.customer[0].name,
        tall : this.customer[0].tall,
        kom : this.customer[0].kom,
        sdr : this.customer[0].sdr,
        west : this.customer[0].west,
        wasa : this.customer[0].wasa,
        mobile : this.customer[0].mobile,
        note : this.customer[0].note
      })
    });

  }

  deleteCustomer(id:number)
  {
    this._CustomersService.deleteCustomer(id).subscribe((customer) => {
      // deleted
      this._ToastrService.error("تم المسح", "ترزي السعاده");
      this._CustomersService.getCustomers().subscribe((customers) => {
        this.customers = customers;
      })
    })
  }

  // numberArray(length: number)
  // {
  //   this.division = Math.trunc(length / 8);
  //   this.remainder = length % 8;
  //   if (this.remainder > 0) {
  //     this.result = this.division + 1;
  //   }
  //   else
  //   {
  //     this.result = this.division;
  //   }
  //   return new Array(this.result)
  // }

  // changeNumber(number : number)
  // {
  //   this.start = number * 8;
  //   this.end = this.start + 8;
  // }

  onUpdateCustomer()
  {
    this._CustomersService.updateCustomer(this.listForm.value, this.id).subscribe((customer) => {
      // updated
      this._ToastrService.info("تم التحديث", "ترزي السعاده");
      this._CustomersService.getCustomers().subscribe((customers) => {
        this.customers = customers;
      });
    })
  }

}
