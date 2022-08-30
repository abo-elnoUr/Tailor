import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './shared/components/add-customer/add-customer.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch:'full'},
  {path: '', component: HomeComponent},
  {path: 'addCustomer', component: AddCustomerComponent},
  // {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
