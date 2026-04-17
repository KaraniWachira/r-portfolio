import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideChevronUp } from '@lucide/angular';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, LucideChevronUp],
  template: `
    <button
      *ngIf="isVisible()"
      (click)="scrollToTop()"
      class="fixed bottom-20 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-reddit-orange text-white shadow-lg transition-all hover:bg-orange-600 focus:outline-none animate-fade-in"
      aria-label="Back to top"
    >
      <svg lucideChevronUp [size]="24" strokeWidth="2.5"></svg>
    </button>
  `,
  styles: `
    :host {
      display: block;
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
})
export class BackToTopComponent {
  isVisible = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show button when scrolled down more than 400px
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible.set(scrollOffset > 400);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
