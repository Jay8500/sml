import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
    private _service = inject(ServicesService);
    private destroy$: Subject<void> = new Subject<void>();
    public dashboardData: any = [
    ];
    public blocUI = false;

    async ngOnInit() {
        this.gridData();
    }

    gridData() {
        this.blocUI = true;
        try {
            let cader = this._service.getUserInfo('userCader');
            this._service.postApi('getDashboardDetails', 'postEndPoint',
                {
                    cader: cader['code'],
                    create_by: this._service.getUserInfo('_id')
                }
            )
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                        if (data['S_CODE'] == 200) {
                            this.blocUI = false;
                            //  this.model = [];
                            if (data['DATA'].length > 0) this.dashboardData = data['DATA'];
                            // this.blocUI = false;
                            // this.myModels = [];
                        };
                    },
                    error: (err) => {
                        this.blocUI = false;
                        // this.myModels = [];
                    }
                });
        } catch (e) { this.blocUI = false; }
        // setTimeout(() => this.blocUI = false, 1400);
    }
 
}
