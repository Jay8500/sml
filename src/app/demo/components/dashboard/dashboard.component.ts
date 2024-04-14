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

}
