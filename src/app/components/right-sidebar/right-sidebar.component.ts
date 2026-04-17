import { Component, inject, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar } from 'primeng/avatar';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import {
  LucideFileText,
  LucideBookOpen,
  LucideServer,
  LucideMonitor,
  LucideDatabase,
  LucideCode2,
} from '@lucide/angular';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    Avatar,
    Tag,
    Tooltip,
    ButtonModule,
    LucideFileText,
    LucideBookOpen,
    LucideServer,
    LucideMonitor,
    LucideDatabase,
    LucideCode2,
  ],
  template: `
    <aside [class]="mode() === 'static' ? 'hidden xl:block w-80 shrink-0' : 'w-full'">
      <div [class]="mode() === 'static' ? 'sticky top-14 space-y-3 pl-2 pb-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto' : 'space-y-3 pb-4'">

        <!-- About Community Card -->
        <div class="bg-reddit-card rounded-lg border border-reddit-border overflow-hidden">
          <!-- Banner -->
          <div class="h-8 bg-gradient-to-r from-reddit-orange to-orange-400"></div>

          <div class="px-4 pb-4 -mt-4">
            <div class="flex items-end gap-2 mb-3">
              <p-avatar
                label="K"
                [style]="{ 'background-color': '#FF4500', color: '#fff', width: '52px', height: '52px', 'font-size': '1.25rem', 'font-weight': '800', border: '4px solid white' }"
                shape="circle"
              />
              <h2 class="text-base font-bold text-reddit-text leading-tight pb-0.5">u/Keith</h2>
            </div>

            <p class="text-sm text-reddit-text mb-3">
              Analytical Engineer. Building data-driven solutions.
              Go · Angular · R · Supabase.
            </p>

            <div class="grid grid-cols-2 gap-3 py-3 border-t border-b border-reddit-border">
              <div>
                <div class="text-sm font-bold text-reddit-text">1,470</div>
                <div class="text-xs text-reddit-meta">Karma</div>
              </div>
              <div>
                <div class="text-sm font-bold text-reddit-text">3</div>
                <div class="text-xs text-reddit-meta">Projects</div>
              </div>
              <div>
                <div class="text-sm font-bold text-reddit-text">5+</div>
                <div class="text-xs text-reddit-meta">Tech Stack</div>
              </div>
              <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-house-icon lucide-map-pin-house"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg>
                <div class="text-xs text-reddit-meta">Nairobi, Kenya</div>
              </div>
            </div>

            <button 
              (click)="closeIfDrawer()"
              class="w-full mt-3 py-1.5 bg-reddit-blue text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
            >
              <a href="https://drive.google.com/file/d/1dI2NPJp2qWxCPlRfruWvugiS4UAPuVUn/view?usp=sharing" target="_blank">View Full Resume</a>
            </button>
          </div>
        </div>

        <!-- Premium Tech Stack Section -->
        <div class="bg-reddit-card rounded-lg border border-reddit-border overflow-hidden">
          <div class="px-4 py-3 border-b border-reddit-border bg-gray-50/50 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg lucideCode2 class="text-reddit-meta" [size]="14"></svg>
              <h3 class="text-[10px] font-bold uppercase tracking-widest text-reddit-meta">Engineering Stack</h3>
            </div>
          </div>
          
          <div class="p-4 space-y-6">
            @for (category of categorizedStack; track category.label) {
              <div>
                <div class="flex items-center gap-2 mb-3">
                  @switch (category.icon) {
                    @case ('server') { <svg lucideServer class="text-reddit-orange" [size]="14"></svg> }
                    @case ('monitor') { <svg lucideMonitor class="text-reddit-blue" [size]="14"></svg> }
                    @case ('database') { <svg lucideDatabase class="text-green-600" [size]="14"></svg> }
                  }
                  <span class="text-[9px] font-black uppercase tracking-tighter text-reddit-meta">{{ category.label }}</span>
                </div>
                
                <div class="grid grid-cols-1 gap-1.5">
                  @for (tech of category.items; track tech.name) {
                    <div 
                      [pTooltip]="tech.tooltip"
                      tooltipPosition="top"
                      class="flex items-center justify-between p-2 rounded border border-reddit-border/50 bg-white hover:bg-reddit-bg hover:border-reddit-border transition-all cursor-default group"
                      [style.border-left-width]="'3px'"
                      [style.border-left-color]="tech.color"
                    >
                      <span class="text-[11px] font-bold text-reddit-text group-hover:text-reddit-blue">{{ tech.name }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Technical Articles -->
        <div class="bg-reddit-card rounded-lg border border-reddit-border overflow-hidden">
          <div class="px-4 py-3 border-b border-reddit-border flex items-center gap-2">
            <svg lucideFileText  class="text-reddit-meta"></svg>
            <h3 class="text-[10px] font-bold uppercase tracking-widest text-reddit-meta">Technical Articles</h3>
          </div>
          <div class="p-3 space-y-3">
            @for (article of articles(); track article.url) {
            <a [href]="article.url" target="_blank" (click)="closeIfDrawer()" class="block article-card bg-reddit-bg/20 border border-reddit-border/50 rounded-lg p-3 hover:bg-reddit-bg/40 hover:border-reddit-border transition-all shadow-sm group/card cursor-pointer">
              <div class="flex items-start gap-3">
                <!-- Platform Favicon -->
                <div class="w-8 h-8 shrink-0 bg-white rounded border border-reddit-border flex items-center justify-center shadow-inner overflow-hidden">
                    @if (article.platform === 'medium') {
                        <svg lucideFileText  class="text-black"></svg>
                    } @else {
                        <svg lucideBookOpen  class="text-blue-600"></svg>
                    }
                </div>

                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="text-[9px] font-black uppercase text-reddit-meta tracking-tighter">{{ article.platform }}</span>
                        <span class="text-[10px] text-reddit-meta">•</span>
                        <span class="text-[10px] text-reddit-meta">{{ article.readTime }} read</span>
                    </div>
                    <h4 class="text-xs font-bold text-reddit-text group-hover/card:text-reddit-blue truncate">
                        {{ article.title }}
                    </h4>
                </div>
              </div>
            </a>
            }
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class RightSidebarComponent {
  mode = input<'static' | 'drawer'>('static');

  readonly store = inject(PortfolioStore);

  articles = computed(() => {
    return this.store.projects().flatMap(p => p.articles || []);
  });

  categorizedStack = [
    {
      label: 'Data Science & Stats',
      icon: 'database',
      items: [
        { name: 'R Language', color: '#276DC3', tooltip: 'Statistical analysis and modeling' },
        { name: 'Tidyverse', color: '#3ECF8E', tooltip: 'Data analysis and visualization' },
        { name: 'Tidymodels', color: '#3ECF8E', tooltip: 'Machine learning and statistical modeling' },
      ]
    },
    {
      label: 'Systems & Infrastructure',
      icon: 'server',
      items: [
        { name: 'Go', color: '#00ADD8', tooltip: 'Backend services and data pipelines' },
        { name: 'Kubernetes', color: '#2496ED', tooltip: 'Container orchestration and management' },
        { name: 'Supabase', color: '#3ECF8E', tooltip: 'Auth, database, and real-time' },
        { name: 'PostgreSQL', color: '#336791', tooltip: 'Relational database' },
      ]
    },
    {
      label: 'Frontend & UI',
      icon: 'monitor',
      items: [
        { name: 'Angular 21', color: '#DD0031', tooltip: 'Frontend framework (v21 with Signals)' },
        { name: 'TypeScript', color: '#3178C6', tooltip: 'Type-safe frontend development' },
        { name: 'Tailwind CSS', color: '#06B6D4', tooltip: 'Utility-first CSS framework' },
      ]
    }
  ];

  closeIfDrawer(): void {
    if (this.mode() === 'drawer') {
      this.store.isRightSidebarVisible.set(false);
    }
  }
}

