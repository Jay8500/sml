import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
    selector: 'app-createborrowers',
    templateUrl: './createborrowers.component.html',
    styleUrls: ['./createborrowers.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class CreateborrowersComponent implements OnInit {
    public name = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
    @ViewChild('aa', { static: false }) aa!: FileUpload;
    @ViewChild('ab', { static: false }) ab!: FileUpload;
    @ViewChild('ac', { static: false }) ac!: FileUpload;
    @ViewChild('ad', { static: false }) ad!: FileUpload;
    @ViewChild('ae', { static: false }) ae!: FileUpload;
    @ViewChild('af', { static: false }) af!: FileUpload;
    @ViewChild('ag', { static: false }) ag!: FileUpload;

    public image: any = [];

    public isShowForm = false;
    public isShowSidebarClose = false;
    public isCloseOnEscape = false;
    private destroy$: Subject<void> = new Subject<void>();
    public MessageService = inject(MessageService);
    public _service = inject(ServicesService);
    countries: any[] | undefined;
    public blocUI = false;
    selectedCity: any;
    selectedState: any = null;
    states: any[] = [
        { name: 'Arizona', code: 'Arizona' },
        { name: 'California', value: 'California' },
        { name: 'Florida', code: 'Florida' },
        { name: 'Ohio', code: 'Ohio' },
        { name: 'Washington', code: 'Washington' }
    ];

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    public statuses = [
        { label: 'Active', value: 'qualified' },
        { label: 'Inactive', value: 'unqualified' },
        { label: 'New', value: 'new' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Renewal', value: 'renewal' },
        { label: 'Proposal', value: 'proposal' }
    ];

    public branches = [
        {
            label: "Select Branches",
            value: null,
            bcode: "",
            clientCount: 0
        }
    ];
    public caders = [
        {
            label: "Select Caders",
            value: null
        }
    ];
    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;
    public mode = "";
    public addressList: any = [];

    public loading = false;
    public crudGrid: any = [];
    public params: any = {};
    public createMaster: any = {
        id: null,
        branch_id: this._service.getUserInfo('branchid'),
        branch_name: this._service.getUserInfo('branchname'),
        name: null,
        aadhar: null,
        ccode: null,
        description: null,
        cityId: null,
        district: null,
        city: '',
        contact_no: null,
        state: null,
        pincode: null,
        byemployee: null,
        byemployeename: null,
        active: true,
        A: null,
        RC: null,
        HTR: null,
        LA: null,
        HP: null,
        PPC: null,
        OTHERS: null,
        TEST: {
            name: "",
            original_file_name: "",
            file_folder: ""
        }
    };
    public defaultUser = JSON.stringify(this.createMaster);

    public errorMessages = {
        name: "",
        aadhar: "",
        ccode: "",
        description: "",
        city: "",
        contact_no: "",
        pincode: "",
    };
    public defErrs = JSON.stringify(this.errorMessages);

    getErrorMessages(ctrl: string) {
        switch (ctrl) {
            case "name":
                if ([undefined, null, ''].includes(this.createMaster.name)) {
                    this.errorMessages.name = [undefined, null, ''].includes(this.createMaster.name) ? 'Name is required' : "";
                } else {
                    // const nameRegex = /^[A-Za-z]+$/;
                    const nameRegex = /^[a-zA-Z ]*$/;
                    // const specifiedString = "Jhon Doe.";
                    if (nameRegex.test(this.createMaster.name)) {
                        this.errorMessages.name = '';
                    } else {
                        this.errorMessages.name = 'Invalid name format';

                    }
                };
                break;
            case "aadhar":
                this.errorMessages.aadhar = [undefined, null, ''].includes(this.createMaster.aadhar) ? 'Aadhar is required' : this.createMaster.aadhar.length != 12 ? "" : 'Aadhar should have 12 digit';
                break;
            case "city":
                this.errorMessages.city = [undefined, null, ''].includes(this.createMaster.city) || typeof this.createMaster.city != 'object' ? 'City is required' : "";
                break;
            case "contact_no":
                this.errorMessages.contact_no = [undefined, null, ''].includes(this.createMaster.contact_no) ? 'Contact is required' : this.createMaster.contact_no.length != 10 ? 'Contact no. should have 10 digits' : "";
                break;
            case "pincode":
                this.errorMessages.pincode = [undefined, null, ''].includes(this.createMaster.pincode) ? 'Pincode is required' : "";
                break;
        }
    }

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
        let cader = this._service.getUserInfo('userCader');

        if (cader['code'] == 'DA') {
            this.params['code'] = 'DEV';
        };

        if (cader['code'] == 'SA') {
            this.params['code'] = 'SA';
        };

        if (cader['code'] == 'HRPM') {
            this.params['code'] = 'HRPM';
        }
        this.params['create_by'] = this._service.getUserInfo('_id');
        this._service.postApi('getBranch', 'postEndPoint', { filter: 'Drop' })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                    if (data['S_CODE'] == 200) {
                        this.branches = [{
                            label: "Select Branches",
                            value: null,
                            bcode: "",
                            clientCount: 0
                        }];
                        data['DATA'].forEach((prodcuts: any, prdIn: number) => {
                            let products = {
                                label
                                    :
                                    prodcuts.bname,
                                value
                                    :
                                    prodcuts.id,
                                bcode
                                    :
                                    prodcuts.bcode,
                                clientCount: prodcuts.clientCount
                            };
                            this.branches.push(products)
                        });
                    };
                },
                error: (err) => {
                    // this.blocUI = false;
                    // this.myModels = [];
                    // console.log('error')
                }
            });

        //
        this.addressList = [];
        this._service.postApi('getAddressList', 'postEndPoint', {})
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                    if (data['S_CODE'] == 200) {
                        this.addressList = data['DATA'][0]['data'];
                    };
                },
                error: (err) => {
                    // this.blocUI = false;
                    // this.myModels = [];
                    // console.log('error')
                }
            });
        this.gridData();
    }


    gridData() {
        try {
            this.loading = true;
            let cader = this._service.getUserInfo('userCader');

            if (cader['code'] == 'DA') {
                this.params['code'] = 'DEV';
            };

            if (cader['code'] == 'SA') {
                this.params['code'] = 'SA';
            };

            if (cader['code'] == 'HRPM') {
                this.params['code'] = 'HRPM';
            }
            this.params['create_by'] = this._service.getUserInfo('_id');
            this.crudGrid = [];
            this._service.postApi('getBorrowers', 'postEndPoint', this.params)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                        if (data['S_CODE'] == 200) {
                            this.blocUI = false;
                            data['DATA'].forEach((pros: any, prdIn: number) => {
                                let createdBorrowers: any = {
                                    A
                                        :
                                        pros.A,
                                    HP
                                        :
                                        pros.HP,
                                    LA
                                        :
                                        pros.LA,
                                    OTHERS
                                        :
                                        pros.OTHERS,
                                    RC
                                        :
                                        pros.RC,
                                    aadhar
                                        :
                                        pros.aadhar,
                                    active
                                        :
                                        pros.active,
                                    byemployee
                                        :
                                        pros.byemployee,
                                    byemployeename
                                        :
                                        pros.byemployeename,
                                    ccode
                                        :
                                        pros.ccode,
                                    city
                                        :
                                        pros.city,
                                    cityname
                                        :
                                        pros.cityname,
                                    branch_name: pros.branch_name,
                                    contact_no
                                        :
                                        pros.contact_no,
                                    countryname
                                        :
                                        pros.countryname,
                                    description
                                        :
                                        pros.description,
                                    id
                                        :
                                        pros.id,
                                    name
                                        :
                                        pros.name,
                                    pincode
                                        :
                                        pros.pincode,
                                    state
                                        :
                                        pros.state,
                                    dataKey: prdIn + 1,
                                    branch_id: pros.branch_id,
                                    status: (pros.active == true ? 'Qualified' : 'Unqualified')

                                };
                                this.crudGrid.push(createdBorrowers)
                            });
                            this.crudGrid = data['DATA'];
                            this.loading = false;
                        } else if (data['S_CODE'] == 300) {
                            this.blocUI = false;
                            this.loading = false;
                        }
                    },
                    error: (err) => {
                        this.blocUI = false;
                        // this.myModels = [];
                        // console.log('error')
                    }
                });
        } catch (e) {
            this.blocUI = false;
        }
    }

    // public imageFile: File | null = null;
    onSelect(event: any, ctrl: string) { // A, RC, HTR,LA, HP, PPC, OTHERS
        try {
            if (![undefined, null, ''].includes(event)) {
                if (Object.keys(event.files).length > 0) {
                    // console.log(event.target.files)
                    event.files[0]['ctrl'] = ctrl;
                    this.image.push({ ctrl: ctrl, files: event.files[0] })
                    this.createMaster[ctrl] = event.files[0]['name'];
                    // if (files) this.uploadFile(files, ctrl)
                    this.aa.clear();
                    this.ab.clear();
                    this.ac.clear();
                    this.ad.clear();
                    this.ae.clear();
                    this.af.clear();
                    this.ag.clear();
                };
            }
        } catch (e) {
        };
    }

    uploadFile(files: File, ctrl: string): void {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            // console.log("files", files)
            let base64 = e.target.result;

            // this.createMaster[ctrl] = {
            //     name: files.name,
            //     file_folder: ""
            // };
            // console.log("files", files)
        };
        reader.readAsDataURL(files);
        this.aa.clear();
        this.ab.clear();
        this.ac.clear();
        this.ad.clear();
        this.ae.clear();
        this.af.clear();
        this.ag.clear();
    }

    fileSize = () => this._service.fileMaxSize();
    public isOk = false;
    onClick(event: any, mode: any) {
        this.isShowForm = true;
        this.isShowSidebarClose = true;
        this.errorMessages = JSON.parse(this.defErrs);
        // console.log("event",event)
        this.createMaster = JSON.parse(this.defaultUser);
        this.mode = mode;
        if (['VIEW', 'EDIT'].includes(mode)) {
            //   this.isClicked = true;
            this.createMaster = {
                A: event['A'] == null ? null : event['A'],
                RC: event['RC'] == null ? null : event['RC'],
                HT: event['HTR'] == null ? null : event['HTR'],
                LA: event['LA'] == null ? null : event['LA'],
                HP: event['HP'] == null ? null : event['HP'],
                PP: event['PPC'] == null ? null : event['PPC'],
                OTHERS: event['OTHERS'],
                id: event.id,
                branch_id: event.branch_id,
                name: event.name,
                aadhar: event.aadhar,
                ccode: event.ccode,
                description: event.description,
                city: { "code": event.city, "cname": event.cityname },
                contact_no: event.contact_no,
                pincode: event.pincode,
                byemployee: event.byemployee,
                byemployeename: event.byemployeename,
                active: event.active ? true : false,

            };
        };
    }

    public submitloading = false;

    saveProduct() {

        try {
            let cols = [
                "name",
                "aadhar",
                "city",
                "contact_no",
                "pincode",
            ];
            _.forEach(cols, (cols, colIn) => {
                this.getErrorMessages(cols);
            });

            let count = 0;
            let checkValues = Object.values(this.errorMessages).every((ele: any, eleIn: number) => {
                if (ele == '') {
                    count++;
                }
            });

            if (count > 0) {
                this.submitloading = true;
                let savePayload = JSON.parse(JSON.stringify(this.createMaster));
                savePayload['flag'] = this.mode == 'NEW' || this.mode == '' ? 'S' : 'E';
                savePayload.byemployee = this._service.getUserInfo('_id');
                savePayload.byemployeename = this._service.getUserInfo('uname');
                savePayload['create_by'] = this._service.getUserInfo('_id');
                let filterCities: any[] = [];
                _.forEach(this.addressList, (country: any) => {
                    _.forEach(country['states'], (state: any) => {
                        // Use _.filter on the array of cities and provide a predicate function
                        const filteredCities = _.filter(state['cities'], (city: any) => {
                            // Adjust the condition based on your filtering criteria
                            return city.code === this.createMaster.city.code &&
                                city.name === this.createMaster.city.name;
                        });


                        if (filteredCities.length > 0) {
                            filterCities.push({
                                country: country.name,
                                state: state.name,
                                cities: filteredCities,
                            });
                        }
                    });
                });

                savePayload['countryname'] = filterCities[0]['country'];
                savePayload['state'] = filterCities[0]['state'];
                savePayload['cityname'] = filterCities[0]['cities'][0]['cname'];
                savePayload['cityname'] = filterCities[0]['cities'][0]['cname'];
                savePayload['city'] = this.createMaster['city']['code'];

                // console.log(savePayload)

                const formData = new FormData();
                formData.append('secure', JSON.stringify(savePayload));
                if (this.image.length > 0) {

                    this.image.forEach((item: any, index: number) => {
                        formData.append('image', item.files);
                        // formData.append(`image-${index}`, );
                    });
                };
               
                let loginJson = this._service.formpostApi('createBorrowers', 'postEndPoint', formData)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe({
                        next: (data) => {
                            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                            if (data.S_CODE == 200) {
                                this.isShowSidebarClose = false;
                                this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
                                this.isOk = true;
                                this.createMaster = JSON.parse(this.defaultUser);
                                this.submitloading = false;

                            } else if (data.S_CODE == 300) {
                                this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
                                // this.submitloading = false;
                                this.isShowSidebarClose = false;
                                this.submitloading = false;
                            }
                        },
                        error: (err) => {
                            this.submitloading = false;
                            // this.loading = false;
                        }
                    });
            };

        } catch (e) {

        }
        // this.loading = false;
    }

    hideDialog() {
        this.isShowForm = false;
        this.createMaster = JSON.parse(this.defaultUser);
        this.errorMessages = JSON.parse(this.defErrs);
    }

    onMessageClose() {
        if (this.isOk) {
            this.isShowSidebarClose = true;
            this.gridData();
            this.hideDialog();
        }
    }

    onInput(event: any) {
        const inputValue = event.target.value;
        const validPattern = /^[A-Za-z]+(?: [A-Za-z]+)?$/;

        if (validPattern.test(inputValue)) {
            // Valid input, you can handle it accordingly
        } else {
            // Invalid input, you can handle it accordingly (e.g., show an error message)
        }
    }
}
