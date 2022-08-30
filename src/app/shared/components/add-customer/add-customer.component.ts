import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';
import { ToastrService } from "ngx-toastr";



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private _CustomersService: CustomersService, private _Router:Router,
    private _ToastrService: ToastrService) { }


    listForm = new FormGroup({
      name : new FormControl('', [Validators.required,Validators.minLength(3)]),
      tall: new FormControl('', Validators.required),
      kom: new FormControl('', Validators.required),
      sdr: new FormControl(null, Validators.required),
      west : new FormControl(null, Validators.required),
      wasa : new FormControl(null, Validators.required),
      mobile : new FormControl(null),
      note : new FormControl(null)
    })


    get listFormValidate() {return this.listForm.controls};

  ngOnInit(): void {
  }

  onAddCustomer()
  {
    this._CustomersService.addCustomer(this.listForm.value).subscribe((customer) => {
      this._Router.navigate(['/']);
      this._ToastrService.success(" تم الاضافه", "ترزي السعاده");
    })
  }

}
