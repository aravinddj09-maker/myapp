import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Customer } from './app/customer/customer';

bootstrapApplication(Customer, appConfig)
  .catch((err) => console.error(err));
