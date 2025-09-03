import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataTableService {


    constructor() {

    }

    public dataTableDestory() {

        $('table.mydatatable').DataTable().destroy();

    }

    public dataTableReinitalize() {

        $(document).ready(function () {
            $('table.mydatatable').DataTable({ dom: 'rtlip' ,   "searching": true});
        });

    }

}