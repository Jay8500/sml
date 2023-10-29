import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
@Component({
  selector: 'crudgrid',
  templateUrl: './crudgridview.component.html',
  styleUrls: ['./crudgridview.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CrudgridviewComponent implements OnInit {
  @Input() masterApiKey: string = "";
  @Input() headerName: string = 'Mange Headers';
  @Input() onlyGenderProps: any;
  productDialog: boolean = false;
  clonedProducts: { [s: string]: Product } = {};
  products: any = [];
  product!: Product;
  selectedProducts!: Product[] | null;
  submitted: boolean = false;
  statuses!: any[];
  public blocUI = false;

  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  @Input() cols: any;
  @Output() isEnabled = new EventEmitter();
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.blocUI = true;
    this.gridData();
    setInterval(() => this.blocUI = false, 4000);
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  gridData() {
    this._service.postApi(this.masterApiKey, 'postEndPoint', null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data['S_CODE'] == 200) {
            this.products = [];
            data['DATA'].forEach((pros: any, prdIn: number) => {
              let getObjects = { ...this.onlyGenderProps, ...pros };
              this.products.push(getObjects);
            });
          };
        },
        error: (err) => {
          this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });

  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.isEnabled.emit(true);
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val: any) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val: any) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    // switch (status) {
    //   case 'INSTOCK':
    //     return 'success';
    //   case 'LOWSTOCK':
    //     return 'warning';
    //   case 'OUTOFSTOCK':
    //     return 'danger';
    // }
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price && product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  customSort(event: SortEvent) {
    // event.data.sort((data1, data2) => {
    //     let value1 = data1[event.field];
    //     let value2 = data2[event.field];
    //     let result = null;

    //     if (value1 == null && value2 != null) result = -1;
    //     else if (value1 != null && value2 == null) result = 1;
    //     else if (value1 == null && value2 == null) result = 0;
    //     else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
    //     else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

    //     return event.order * result;
    // });
  }
}
