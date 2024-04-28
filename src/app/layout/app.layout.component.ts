import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';
import { IdleSessionTimeout } from 'idle-session-timeout';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html',
    providers: [ConfirmationService, MessageService]
})
export class AppLayoutComponent implements OnInit, OnDestroy {
    public sessions: any
    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router,
        private confirmationService: ConfirmationService, private messageService: MessageService
    ) {
    }

    hideMenu() {
        // this.layoutService.state.overlayMenuActive = false;
        // this.layoutService.state.staticMenuMobileActive = false;
        // this.layoutService.state.menuHoverActive = false;
        // if (this.menuOutsideClickListener) {
        //     this.menuOutsideClickListener();
        //     this.menuOutsideClickListener = null;
        // }
        // this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    ngOnInit(): void {
        this.sessions = new IdleSessionTimeout(1 * 60 * 1000);

        this.sessions.onTimeLeftChange = (timeLeft: any) => {
            // console.log(`${timeLeft} ms left`);/
        };
        this.sessions.onTimeOut = () => {
            // this.autoLogout()
            // You can call your logout function or perform any action here
        };
        this.sessions.start();

        // can be manually reset.
        // this.sessions.session.reset();
        // Note:when the session is expired, it's automatically disposed. 
        // To reset the counter for expired session use start method.

        // to dispose the session
        // this.sessions.session.dispose();

        // returns time left before time out
        let timeLeft = this.sessions.getTimeLeft();
    }

    ngOnDestroy() {
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }

        if (this.sessions) {
            this.sessions.dispose();
        }
    }

    autoLogout() {
        this.confirmationService.confirm({
            // target: event.target as EventTarget,
            message: 'Kindly relogin as 2minutes been inactive on your application?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                window.localStorage.removeItem('userInfo');
                this.router.navigate(['/sml-signin']);
            }
        });
    }

}
