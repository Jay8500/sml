import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
    private _service = inject(ServicesService);
    public showSkeleton = true;
    private destroy$: Subject<void> = new Subject<void>();
    public dashboardData: any = [];

    async ngOnInit() {
        await this.gridData();
        //await this.getprofilepicture();
    }

    async gridData() {
        try {
            this.dashboardData = [];
            let cader = await this._service.getUserInfo('userCader');
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
                            if (data['DATA'].length > 0) this.dashboardData = data['DATA'];
                        };
                    },
                    error: (err) => {
                        this.dashboardData = [];
                    }
                });
        } catch (e) { }
    }

    async getprofilepicture() {
        try {
            // this.dashboardData = [];
            // let cader = await this._service.getUserInfo('userCader');
            this._service.postApi('getprofilepicture', 'postEndPoint',
                {
                    // cader: cader['code'],
                    empId: this._service.getUserInfo('_id')
                }
            )
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                        if (data['S_CODE'] == 200) {
                            if (data['DATA'].length > 0) {
                                console.log("data['DATA'] ", data['DATA']);
                            }
                            //this.dashboardData = data['DATA'];
                        };
                    },
                    error: (err) => {
                        // this.dashboardData = [];
                    }
                });
        } catch (e) { }
    }

}
