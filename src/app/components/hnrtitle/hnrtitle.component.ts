import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
@Component({
  selector: 'app-hnrtitle',
  templateUrl: './hnrtitle.component.html',
  styleUrls: ['./hnrtitle.component.css'],
  providers: [MessageService]
})
export class HnrtitleComponent {
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public onlyGenderProps = {
    name: null,
    active: null,
    // create_dt: null,
    // modify_by: null,
    // modify_dt: null,
    // __v: null,
    // _id: null
  };
  public caderCols: any = [
    {
      header: 'Name',
      style: 'width:30rem',
      showSort: true,
      field: 'name'
    },
    {
      header: 'Code',
      style: 'width:30rem',
      showSort: true,
      field: 'code'
    },
    {
      header: 'Status',
      style: 'width:30rem',
      showSort: false,
      field: 'active'
    },
  ];

  public isClicked = false;
  public createMaster: any = {
    name: "",
    description: "",
    code: "",
    active: true
  };

  public defaultMaster = JSON.stringify(this.createMaster);

  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.isClicked = false;
  }

  public loading = false;

  saveProduct() {
    let savePayload = JSON.parse(JSON.stringify(this.createMaster));
    savePayload['flag'] = 'S';
    this.loading = true;
    let loginJson = this._service.postApi('createTitle', 'postEndPoint', savePayload)
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
          console.log('error', err);
          this.loading = false;
        }
      });


  }
}
