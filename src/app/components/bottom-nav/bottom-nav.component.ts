import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideHome,
  LucideBriefcase,
  LucideCode2,
  LucideFileText,
  LucideUser,
} from '@lucide/angular';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [
    LucideHome,
    LucideBriefcase,
    LucideCode2,
    LucideFileText,
    LucideUser,
  ],
  template: `
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-reddit-header border-t border-reddit-border h-12 flex items-center justify-around px-2">
      <button class="flex flex-col items-center justify-center gap-0.5 p-1 text-reddit-text" (click)="goHome()">
        <svg lucideHome [size]="20"></svg>
        <span class="text-[9px] font-medium">Home</span>
      </button>

      <a href="https://www.linkedin.com/in/keith-karani-3794041a4/" target="_blank" class="flex flex-col items-center justify-center gap-0.5 p-1 text-reddit-meta hover:text-reddit-blue transition-colors">
        <svg lucideBriefcase [size]="20"></svg>
        <span class="text-[9px] font-medium">Network</span>
      </a>

      <a href="https://github.com/KaraniWachira" target="_blank" class="flex flex-col items-center justify-center gap-0.5 p-1">
        <div class="w-8 h-8 bg-reddit-orange rounded-full flex items-center justify-center -mt-3 shadow-md border-2 border-white">
          <svg lucideCode2 [size]="18" class="text-white"></svg>
        </div>
      </a>

      <a href="https://medium.com/@keithkarani/" target="_blank" class="flex flex-col items-center justify-center gap-0.5 p-1 text-reddit-meta hover:text-reddit-blue transition-colors">
        <svg lucideFileText [size]="20"></svg>
        <span class="text-[9px] font-medium">Articles</span>
      </a>

      <a href="https://drive.google.com/file/d/1dI2NPJp2qWxCPlRfruWvugiS4UAPuVUn/view?usp=sharing" target="_blank" class="flex flex-col items-center justify-center gap-0.5 p-1 text-reddit-meta hover:text-reddit-blue transition-colors">
        <svg lucideUser [size]="20"></svg>
        <span class="text-[9px] font-medium">Resume</span>
      </a>
    </nav>
  `,
})
export class BottomNavComponent {
  private store = inject(PortfolioStore);
  private router = inject(Router);

  goHome(): void {
    this.store.selectProject(null);
    this.store.searchQuery.set('');
    this.router.navigate(['/']);
  }
}
