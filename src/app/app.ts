import { Component, inject } from '@angular/core';
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
      header="About Keith"
      [style]="{ width: '320px' }"
    >
      <app-right-sidebar mode="drawer" />
    </p-drawer>

    <!-- Main Layout -->
    <div class="pt-12 min-h-screen bg-reddit-bg">
      <div class="max-w-[1200px] mx-auto px-2 sm:px-4 py-4 flex gap-4">
        <!-- Sidebar -->
        <app-nav-sidebar />

        <!-- Center Feed (Router Outlet) -->
        <main class="flex-1 min-w-0">
          <router-outlet />
        </main>

        <!-- Right Sidebar -->
        <app-right-sidebar />
      </div>

      <!-- Global Content-Aligned Footer -->
      <app-sidebar-footer />
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
}
