import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="hidden md:block max-w-[1200px] mx-auto px-4 py-8 mt-4">
      <div class="border-t border-reddit-border/50 pt-8 flex justify-center">
        <!-- Copyright Only -->
        <div class="text-[10px] text-reddit-light-text font-medium tracking-tight">
          keithkarani © 2026
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})

export class SidebarFooterComponent { }

