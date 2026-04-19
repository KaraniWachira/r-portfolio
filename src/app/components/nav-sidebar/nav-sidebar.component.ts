import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import {
  LucideHome,
  LucideBriefcase,
  LucideX,
  LucideStar,
  LucideUsers,
  LucideInfo,
} from '@lucide/angular';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-nav-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    Avatar,
    LucideHome,
    LucideBriefcase,
    LucideX,
    LucideStar,
    LucideUsers,
    LucideInfo,
  ],
  templateUrl: './nav-sidebar.component.html',
  styles: `
    :host {
      display: contents;
    }
    {
      display: none !important;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
})
export class NavSidebarComponent {
  mode = input<'static' | 'drawer'>('static');

  private store = inject(PortfolioStore);
  private router = inject(Router);

  subreddits = [
    { name: 'r/DataPipelines', color: '#0079D3', icon: 'DP' },
    { name: 'r/FarmTech', color: '#46A508', icon: 'FT' },
    { name: 'r/SystemsArchitecture', color: '#FF4500', icon: 'SA' },
    { name: 'r/GoLang', color: '#00ADD8', icon: 'Go' },
    { name: 'r/Angular', color: '#DD0031', icon: 'Ng' },
  ];

  goHome(): void {
    this.store.selectProject(null);
    this.store.searchQuery.set('');
    this.router.navigate(['/']);
    if (this.mode() === 'drawer') {
      this.store.isNavVisible.set(false);
    }
  }

  filterBySub(sub: string): void {
    this.store.searchQuery.set(sub);
    if (this.mode() === 'drawer') {
      this.store.isNavVisible.set(false);
    }
  }
}
