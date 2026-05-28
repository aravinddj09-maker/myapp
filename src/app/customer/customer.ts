import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Customermodelservice } from './customerservice';
import { Customermodel } from './customermodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {

  customers: Customermodel[] = [];

  customer: Customermodel = {
    id: 0,
    customerType: '',
    fullName: '',
    email: '',
    phnNo: ''
  };

constructor(
  private customermodelservice: Customermodelservice,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    console.log("INIT CALLED");
    this.getAllCustomers();
  }

  getAllCustomers() {

    this.customermodelservice.getAllCustomermodels().subscribe({

      next: (customers) => {

        this.customers = customers;

        console.log(this.customers);

        this.cdr.detectChanges();

      },

      error: (error) => {
        console.log("Error while fetching Customers", error);
      }

    });

  }

  addCustomer() {

    console.log(this.customer);

    this.customermodelservice.createCustomermodel(this.customer).subscribe({
      next: (response) => {

        console.log("Customer added successfully", response);

        this.customer = {
          id: 0,
          customerType: '',
          fullName: '',
          email: '',
          phnNo: ''
        };

        this.getAllCustomers();
      },

      error: (error) => {
        console.log("Error while adding customer", error);
      }
    });
  }

  editCustomer(id: any) {

    this.customermodelservice.getCustomermodelById(id).subscribe({
      next: (customer) => {

        this.customer = customer;

      },
      error: (error) => {
        console.log("Error while fetching Customer", error);
      }
    });
  }

  deleteCustomer(id: any) {

    this.customermodelservice.deleteCustomermodel(id).subscribe({
      next: () => {

        console.log("Customer deleted successfully");

        this.getAllCustomers();
      },
      error: (error) => {
        console.log("Error while deleting Customer", error);
      }
    });
  }
}
