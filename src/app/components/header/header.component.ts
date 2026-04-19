import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Badge } from 'primeng/badge';
import { Menu } from 'primeng/menu';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import {
  LucideSearch,
  LucideCode2,
  LucideChevronDown,
  LucideMenu,
  LucideInfo,
} from '@lucide/angular';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Avatar,
    InputText,
    IconField,
    InputIcon,
    LucideSearch,
    LucideCode2,
    LucideChevronDown,
    LucideMenu,
    LucideInfo,
  ],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-reddit-header border-b border-reddit-border h-12 flex items-center px-2 sm:px-4 gap-1 md:gap-4">
      <!-- Left: Mobile Menu Toggle -->
      <button 
        (click)="store.toggleNav()"
        class="lg:hidden p-1.5 rounded hover:bg-reddit-bg transition-colors"
      >
        <svg lucideMenu [size]="20" class="text-reddit-text"></svg>
      </button>

      <!-- Logo -->
      <div class="flex items-center gap-2 cursor-pointer shrink-0" (click)="goHome()">
        <div class="w-8 h-8 bg-reddit-orange rounded-full flex items-center justify-center">
          <svg lucideCode2 class="text-white" [size]="18" [strokeWidth]="2.5"></svg>
        </div>
        <span class="text-base sm:text-lg font-bold text-reddit-text hidden sm:block tracking-tight">
          keith
        </span>
      </div>

      <!-- Search Bar -->
      <div class="flex-1 max-w-lg mx-1 sm:mx-auto min-w-0">
        <p-iconfield class="w-full">
          <p-inputicon>
            <svg lucideSearch [size]="16" class="text-reddit-meta"></svg>
          </p-inputicon>
          <input
            type="text"
            pInputText
            placeholder="Search..."
            class="w-full h-8 bg-reddit-bg border border-reddit-border rounded-full pl-9 pr-4 text-xs sm:text-sm
                   focus:border-reddit-blue focus:bg-white focus:outline-none
                   hover:border-reddit-border-hover hover:bg-white transition-all"
            [ngModel]="store.searchQuery()"
            (ngModelChange)="store.searchQuery.set($event)"
          />
        </p-iconfield>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
        <!-- Mobile Right Sidebar Toggle -->
        <button 
          (click)="store.toggleRightSidebar()"
          class="xl:hidden p-1.5 rounded hover:bg-reddit-bg transition-colors"
        >
          <svg lucideInfo [size]="18" class="text-reddit-meta"></svg>
        </button>

       <!--  Profile -->
        <button class="flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-reddit-bg border border-transparent hover:border-reddit-border transition-all">
          <p-avatar
            label="K"
            [style]="{ 'background-color': '#FF4500', color: '#fff', width: '24px', height: '24px', 'font-size': '0.7rem', 'font-weight': '700' }"
            shape="circle"
          />
          <div class="hidden md:flex flex-col items-start translate-y-[-1px]">
            <span class="text-[11px] font-semibold text-reddit-text leading-tight">u/KArani</span>
            <span class="text-[9px] text-reddit-meta leading-tight lowercase">⚡ {{ annualCommits() }}</span>
          </div>
          <svg lucideChevronDown [size]="12" class="text-reddit-meta hidden lg:block"></svg>
        </button>
      </div>
    </header>

  `,
  styles: `
    :host {
      display: block;
    }
    /* Override PrimeNG styles for Reddit feel */
    :host ::ng-deep {
      .p-iconfield {
        width: 100%;
      }
      .p-inputicon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }
    }
  `,
})
export class HeaderComponent {
  readonly store = inject(PortfolioStore);
  private router = inject(Router);

  // Signals for state
  annualCommits = signal('1,240');

  goHome(): void {
    this.store.selectProject(null);
    this.router.navigate(['/']);
  }
}


