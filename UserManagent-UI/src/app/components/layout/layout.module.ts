import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NumberDirective } from 'src/app/directives/numbers-only.directive';
import { CharDirective } from 'src/app/directives/char-only.directive';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpClientModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        DataTablesModule,
    ],
    declarations: [HeaderComponent, FooterComponent, DashboardComponent, EmployeeComponent, NumberDirective, CharDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule { }