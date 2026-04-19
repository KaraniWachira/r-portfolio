import { Component, inject, HostListener, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { Toast } from 'primeng/toast';
import { Drawer } from 'primeng/drawer';
import { PortfolioStore } from './store/portfolio.store';
import { SidebarFooterComponent } from './components/sidebar-footer/sidebar-footer.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavSidebarComponent,
    RightSidebarComponent,
    BottomNavComponent,
    Toast,
    Drawer,
    SidebarFooterComponent,
    BackToTopComponent,
  ],
  template: `
    <!-- Header -->
    <app-header />

    <!-- Global Notifications -->
    <p-toast />

    <!-- Back to Top Button -->
    <app-back-to-top />

    <!-- Mobile Navigation Drawer -->
    <p-drawer 
      [visible]="store.isNavVisible()" 
      (visibleChange)="store.isNavVisible.set($event)"
      header="Communities"
      [style]="{ width: '280px' }"
    >
      <app-nav-sidebar mode="drawer" />
    </p-drawer>

    <!-- Mobile Right Sidebar Drawer -->
    <p-drawer 
      [visible]="store.isRightSidebarVisible()" 
      (visibleChange)="store.isRightSidebarVisible.set($event)"
      position="right"
      header="About Me"
      [style]="{ width: '320px' }"
    >
      <app-right-sidebar mode="drawer" />
    </p-drawer>

    <!-- Main Layout -->
    <div class="pt-12 min-h-screen bg-reddit-bg">
      <div class="w-full max-w-[1280px] mx-auto flex justify-center p-0 md:p-4">
        
      <!-- Sidebar -->
       @if (isDesktop()) {
        <app-nav-sidebar
         class="w-60 shrink-0 stickytop-14 self-start h-[calc(100vh-3.5rem)]" /> 
       }
        
        <!-- Center Feed (Router Outlet) -->
        <main class="w-full min-w-0 max-w-[640px] flex-1">
          <router-outlet />
        </main>

        @if (isWide()) {
           <!-- Right Sidebar -->
          <app-right-sidebar class="w-80 shrink-0 sticky top-14 self-start"
            mode="static" />
        }

      <!-- Global Content-Aligned Footer -->
      <app-sidebar-footer  hidden :block/>
    </div>


    <!-- Mobile Bottom Nav -->
    <app-bottom-nav />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class App {
  readonly store = inject(PortfolioStore);

  //create a signal to track of we are on desktop
  isDesktop = signal(false);
  isWide = signal(false)

  //update the signal whenever the window is resized
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.onResize();
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isDesktop.set(window.innerWidth >= 1024);
      this.isWide.set(window.innerWidth >= 1280);
    }
  }

}