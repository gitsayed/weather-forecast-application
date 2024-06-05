import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { CommonModule } from "@angular/common";
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    declarations: [
    
    ],
    imports: [
   ButtonModule,
   CardModule,
   ToastModule,
   TreeModule, 
   DropdownModule,
   CommonModule,
   ToolbarModule,
   DialogModule,
   TagModule,
   TableModule,
   ConfirmDialogModule,
   RippleModule,
   InputTextModule,
   PasswordModule,
   DataViewModule,
   ProgressSpinnerModule
  //  DataViewLayoutOptions
  
    ],
    exports: [
   ButtonModule,
   CardModule,
   ToastModule,
   TreeModule, 
   DropdownModule,
   TableModule,
   CommonModule,
   ToolbarModule,
   ConfirmDialogModule,
   DialogModule,
   TagModule,
   RippleModule,
   InputTextModule,
   PasswordModule,
   ProgressSpinnerModule
   

    ],
    providers: [],
    
  })
  export class CommonPrimeNgModule { }