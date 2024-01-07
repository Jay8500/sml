import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, forkJoin } from 'rxjs';

import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [MessageService]
})
export class TeamComponent implements OnInit {
  public showSubmit = true;
  public blocUI = false;
  public genderList: any = [];
  public caders: any = [];
  public createTeam: any = [];
  public loading = false;
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public mode: string = "";
  public createMaster = {
    branch_id: null,
    cader_id: null,
  }
  constructor() { }
  async ngOnInit() {
    this.showSubmit = true;
    this.loading = false;
    this._service.postApi('getBranch', 'postEndPoint', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.genderList = [{
              label: "Select Branches",
              value: null
            }];
            data['DATA'] = _.filter(data['DATA'], { active: true });
            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products = {
                label
                  :
                  prodcuts.bname,
                value
                  :
                  prodcuts._id
              };
              this.genderList.push(products)
            });
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });

    let cader = this._service.getUserInfo('userCader');

    // if (cader['code'] == 'DA') {
    //   this.params['code'] = 'DEV';
    // };

    // if (cader['code'] == 'SA') {
    //   this.params['code'] = 'SA';
    // };

    // if (cader['code'] == 'HRPM') {
    //   this.params['code'] = 'HRPM';
    // }
    // this.params['create_by'] = this._service.getUserInfo('_id');

  }
  public store: any = [];
  public editer: any = [];

  async onBranchChange(event: any) {
    try {
      this.loading = false;
      this.createTeam = [];
      if (![undefined, null, ''].includes(this.createMaster.branch_id)) {
        this.blocUI = true;
        const getTeamObservable = this._service.postApi('getTeam', 'postEndPoint', {});
        const getEditTeamObservable = this._service.postApi('getEditTeam', 'postEndPoint', {
          branch: this.createMaster.branch_id
        });

        forkJoin([getTeamObservable, getEditTeamObservable]).subscribe({
          next: ([teamData, editTeamData]) => {
            if (teamData['S_CODE'] == 200) {
              this.blocUI = false;
              teamData['DATA']['cader'].forEach((prodcuts: any, prdIn: number) => {
                let team: any = {
                  cdname: prodcuts.cdname,
                  code: prodcuts.code,
                  id: prodcuts.id,
                  atleastOneSelect: false,
                  users: []
                };
                if (prodcuts.users.length > 0) {
                  _.forEach(prodcuts.users, (users, usersIn) => {
                    let userss: any = {
                      uname: users.uname,
                      id: users.id,
                      isChecked: users.isChecked || false,
                    };
                    team.users.push(userss);
                  });
                };
                this.createTeam.push(team);
              });
              // this.store = JSON.parse(JSON.stringify(this.createTeam));
            } else if (teamData['S_CODE'] == 300) {
              this.blocUI = false;
            }
            if (editTeamData['S_CODE'] == 200) {
              this.blocUI = false;
              _.forEach(this.createTeam, (editTeam, editIn) => {
                _.forEach(editTeam['users'], (editUsers, editIn) => {
                  if (editTeamData['DATA']['cader'] != null) {
                    _.forEach(editTeamData['DATA']['cader'], (editCad, editIn) => {
                      let filterUsers = _.filter(editCad['users'], (editFi, editIn) => editFi._id == editUsers.id && editFi.isChecked == true);
                      if (filterUsers.length > 0) {
                        editUsers['isChecked'] = true;
                      };
                    });
                  };
                });
                this.showSubmit = !editTeam['users'].some((editFi: any, editIn: number) => editFi.isChecked);
              });
            } else if (editTeamData['S_CODE'] == 300) {
              this.showSubmit = true; this.blocUI = false;
            }
          },
          error: (err) => {
            // Handle errors
          }
        });
      };
    } catch (e) {

    }
  }

  onUserChecked(event: any, users: any, user: any, team: any) {
    _.forEach(users, (allUsers, indx) => {
      if (team['code'] == 'BM') {
        allUsers['isChecked'] = false;
      };
    });
    if (event.target.checked) {
      if (team['code'] == 'BM') {
        user['isChecked'] = event.target.checked;
      };
    };
    this.showSubmit = !event.target.checked;
  }

  //   function isAtLeastOneChecked(array) {
  //   return array.some(obj => obj.items.some(item => item.isChecked));
  // }

  // Usage
  // const atLeastOneChecked = isAtLeastOneChecked(arrayOfObjects);

  //   public loading: boolean = false;

  saveProduct() {

    let savePayload: any = JSON.parse(JSON.stringify(this.createTeam));
    // console.log(savePayload)
    // savePayload['flag'] = 'S'// ? 'S' : 'E';
    let teamCreate: any = {
      // flag : 'S',
      branch: this.createMaster.branch_id,
      cader: [],
    };
    _.forEach(savePayload, (team, teamIn) => {
      let caders: any = {
        cader: team.id,
        users: team.users.filter((ele: any, eleIn: number) => ele.isChecked),
      };
      teamCreate.cader.push(caders)
    });
    teamCreate['cader'] = teamCreate['cader'].filter((fil: any, filIn: number) => fil.users.length > 0);

    // return;
    this.loading = true;
    let loginJson = this._service.postApi('createTeam', 'postEndPoint', teamCreate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            await this.onBranchChange(null);
            this.loading = false;
            // this.createMaster = JSON.parse(this.defaultUser);
            this.loading = false;
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

    // this.loading = false;
  }

  atleastOneSelect() {
    return [undefined, null, ''].includes(this.createMaster.branch_id) && _.filter(this.createTeam, (fil, filIn) => fil.atleastOne == false).length == 0
  }
}
