import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";





@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(

        private messageService: MessageService
    ) {


    }

    success(message: string, title?: string) {
        this.messageService.add({ severity: 'success', summary: title ? title : 'Success', detail: message });
    }

    info(message: string, title?: string) {
        this.messageService.add({ severity: 'info', summary: title ? title : 'Info', detail: message });
    }

    warn(message: string, title?: string) {
        this.messageService.add({ severity: 'warn', summary: title ? title : 'Warn', detail: message });
    }

    error(message: string, title?: string) {
        this.messageService.add({ severity: 'error', summary: title ? title : 'Error', detail: message });
    }

}