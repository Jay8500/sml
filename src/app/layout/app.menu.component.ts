import { LayoutService } from './service/app.layout.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    providers: [MessageService]
})
export class AppMenuComponent implements OnInit {
    private destroy$: Subject<void> = new Subject<void>();
    public MessageService = inject(MessageService);
    public _service = inject(ServicesService);
    public loading: boolean = false;
    public showSubmit: boolean = true;
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
       
    }

    getPermissions() {

        try {
            // this.loading = true;
            let cader = this._service.getUserInfo('userCader');
            this._service.postApi('onlyPages', 'postEndPoint', { code: cader['code'] })
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                        if (data['S_CODE'] == 200) {
                            // this.blocUI = false;
                            if (data['DATA'].length > 0) {
                                // console.log(data['DATA'])
                                let filterMod = _.filter(data['DATA'][0]['modules'], (per, pin) => per.isCanDo == 'Y');
                                // console.log(filterMod);
                                if (filterMod.length > 0) {
                                    _.forEach(filterMod, (p, pin) => {
                                        let createPages:any =
                                        {
                                            label: p.name,
                                            icon: 'pi pi-fw pi-id-card',
                                            routerLink: []
                                        };
                                        p.path = p.path.replace('/uikit/', '/');
                                        createPages.routerLink.push(p.path);
                                        this.model[1]['items'].push(createPages);
                                    });
                                };

                                // isCanDo
                                // :
                                // "Y"
                                // name
                                // :
                                // "Create Users"
                                // path
                                // :
                                // "/home/uikit/users"

                                // this.permissionJSON = data['DATA'];
                            };
                            // this.loading = false;
                        } else if (data['S_CODE'] == 300) {
                            // this.blocUI = false;
                            // this.loading = false;
                        }
                    },
                    error: (err) => {
                        // this.blocUI = false;
                        // this.myModels = [];
                        // console.log('error')
                    }
                });
        } catch (e) {
            // this.blocUI = false;
        }
    }
}
