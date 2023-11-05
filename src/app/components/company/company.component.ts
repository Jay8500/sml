import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [MessageService]
})
export class CompanyComponent {
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public onlyGenderProps = {
    cname: "",
    ccode: "",
    cadress: "",
    decs: "",
    active: true
    // create_dt: null,
    // modify_by: null,
    // modify_dt: null,
    // __v: null,
    // _id: null
  };
  public caderCols: any = [
    {
      header: 'Name',
      style: { "width": '10rem' },
      showSort: true,
      field: 'cname'
    },
    {
      header: 'Code',
      style: { "width": '10rem' },
      showSort: true,
      field: 'ccode'
    },
    {
      header: 'Address',
      style: { "width": '10rem' },
      showSort: false,
      field: 'cadress'
    },
    {
      header: 'Description',
      style: { "width": '10rem' },
      showSort: false,
      field: 'decs'
    },
    {
      header: 'Status',
      style: { "width": '10rem' },
      showSort: false,
      field: 'active',
      "color": [
        {
          "width": '10rem', "color": '#FF0000'
        },
        {
          "width": '10rem', "color": '#00FF00'
        }
      ],
    },
  ]
  public isClicked = false;
  public createMaster: any = {
    cname: "",
    ccode: "",
    cadress: "",
    decs: "",
    active: true
  };
  public defaultMaster = JSON.stringify(this.createMaster);
  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.MessageService.clear();
    this.isClicked = false;
  }

  public loading = false;

  saveProduct() {
    let savePayload = JSON.parse(JSON.stringify(this.createMaster));
    savePayload['flag'] = 'S';
    this.loading = true;
    let loginJson = this._service.postApi('createCompany', 'postEndPoint', savePayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.loading = false;
            this.createMaster = JSON.parse(this.defaultMaster);
          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            this.loading = false;
          }
        },
        error: (err) => {
          // console.log('error', err);
          this.loading = false;
        }
      });

      this.loading = false;
  }
}
