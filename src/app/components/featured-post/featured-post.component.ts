import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import {
  LucideChevronUp,
  LucideChevronDown,
  LucideMessageSquare,
  LucideShare2,
  LucideBookmark,
  LucideExternalLink,
  LucideCode2,
} from '@lucide/angular';
import { Project } from '../../models/portfolio.models';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-featured-post',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    ButtonModule,
    AnimateOnScroll,
    LucideChevronUp,
    LucideChevronDown,
    LucideMessageSquare,
    LucideShare2,
    LucideBookmark,
    LucideExternalLink,
    LucideCode2,
  ],
  template: `
    <article
      class="bg-reddit-card border border-reddit-border rounded-md hover:border-reddit-border-hover transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
      pAnimateOnScroll
      enterClass="fadein"
      [attr.id]="'post-' + project().id"
    >
      <div class="flex">
        <!-- Vote Gutter -->
        <div class="w-10 bg-gray-50/80 rounded-l-md flex flex-col items-center pt-3 pb-2 gap-0.5 shrink-0 border-r border-reddit-border/30">
          <button
            class="p-1 rounded hover:bg-orange-100 transition-colors group"
            [class.text-reddit-upvote]="voted() === 'up'"
            [class.text-reddit-meta]="voted() !== 'up'"
            (click)="vote('up'); $event.stopPropagation()"
          >
            <svg lucideChevronUp [size]="20" class="group-hover:text-reddit-upvote"></svg>
          </button>
          <span
            class="text-xs font-bold py-1"
            [class.text-reddit-upvote]="voted() === 'up'"
            [class.text-reddit-downvote]="voted() === 'down'"
            [class.text-reddit-text]="voted() === null"
          >
            {{ formatVotes(project().upvotes) }}
          </span>
          <button
            class="p-1 rounded hover:bg-blue-100 transition-colors group"
            [class.text-reddit-downvote]="voted() === 'down'"
            [class.text-reddit-meta]="voted() !== 'down'"
            (click)="vote('down'); $event.stopPropagation()"
          >
            <svg lucideChevronDown [size]="20" class="group-hover:text-reddit-downvote"></svg>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <div class="p-3">
            <!-- Post Meta -->
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <div class="w-5 h-5 rounded-full bg-reddit-orange flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-inner">
                A
              </div>
              <span class="text-xs font-bold text-reddit-text hover:underline cursor-pointer">r/AutoCareTowing</span>
              <span class="text-xs text-reddit-meta">•</span>
              <span class="text-xs text-reddit-meta">Posted by</span>
              <span class="text-xs text-reddit-meta hover:underline cursor-pointer font-medium text-reddit-blue">{{ project().author }}</span>
              <span class="text-xs text-reddit-meta">{{ getTimeAgo(project().timestamp) }}</span>
              
              <div class="flex gap-1 ml-auto">
                @for (award of project().awards; track $index) {
                  <span class="text-sm" [title]="'Awarded ' + award">{{ award }}</span>
                }
              </div>
            </div>

            <!-- Title -->
            <h2
              class="text-xl font-bold text-reddit-text leading-tight mb-2 hover:text-reddit-blue transition-colors cursor-pointer"
              (click)="toggleExpand()"
            >
              {{ project().title }}
            </h2>

            <!-- Media Container (16:9) -->
            <div 
              class="relative w-full aspect-video bg-black rounded-lg overflow-hidden group/media mb-3 cursor-pointer ring-1 ring-reddit-border/20"
              (click)="toggleExpand()"
            >
              <img
                [src]="'/featured.png'"
                alt="AutoCare Towing Fleet"
                class="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 transition-opacity duration-500"
              />
              <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span class="px-2 py-1 bg-reddit-orange text-white text-[10px] font-black uppercase rounded shadow-lg tracking-wider">Featured Project</span>
              </div> -->
            </div>

            <!-- Short Description -->
            <p class="text-sm text-reddit-text leading-relaxed mb-4 line-clamp-2">
              {{ project().content }}
            </p>

            <!-- Action Bar -->
            <div class="flex items-center justify-between border-t border-reddit-border/30 pt-1 -mx-2 px-2">
              <div class="flex items-center gap-1 flex-wrap">
                <button
                  class="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-reddit-bg/60 transition-colors text-reddit-meta text-xs font-bold group"
                  [class.text-reddit-blue]="isExpanded()"
                  [class.bg-blue-50]="isExpanded()"
                  (click)="toggleExpand()"
                >
                  <svg lucideMessageSquare [size]="18" class="group-hover:scale-110 transition-transform"></svg>
                  <span>{{ project().commentCount }} Comments</span>
                </button>
                <button class="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-reddit-bg/60 transition-colors text-reddit-meta text-xs font-bold group">
                  <svg lucideShare2 [size]="18" class="group-hover:scale-110 transition-transform"></svg>
                  <span class="hidden sm:inline">Share</span>
                </button>
                <button class="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-reddit-bg/60 transition-colors text-reddit-meta text-xs font-bold group">
                  <svg lucideBookmark [size]="18" class="group-hover:scale-110 transition-transform"></svg>
                  <span class="hidden sm:inline">Save</span>
                </button>
              </div>

              <div class="flex items-center gap-2">
                @if (project().githubUrl) {
                  <a [href]="project().githubUrl" target="_blank" (click)="$event.stopPropagation()">
                    <p-button 
                      label="Source" 
                      severity="secondary" 
                      [outlined]="true" 
                      size="small"
                      [style]="{'padding': '0.4rem 0.8rem', 'font-size': '0.75rem', 'font-weight': '700'}"
                    >
                      <ng-template pTemplate="icon">
                         <svg lucideCode2 [size]="14" class="mr-1.5"></svg>
                      </ng-template>
                    </p-button>
                  </a>
                }
                @if (project().liveUrl) {
                  <a [href]="project().liveUrl" target="_blank" (click)="$event.stopPropagation()">
                    <p-button 
                      label="Live" 
                      severity="info" 
                      size="small"
                      [style]="{'padding': '0.4rem 0.8rem', 'font-size': '0.75rem', 'font-weight': '700'}"
                    >
                      <ng-template pTemplate="icon">
                        <svg lucideExternalLink [size]="14" class="mr-1.5"></svg>
                      </ng-template>
                    </p-button>
                  </a>
                }
              </div>
            </div>
          </div>

          <!-- Expanded Content -->
          @if (isExpanded()) {
            <div class="animate-slide-down border-t border-reddit-border/30 bg-gray-50/40">
              <div class="p-4">
                <div class="flex items-center gap-2 text-xs text-reddit-meta mb-4">
                  <span class="font-bold uppercase tracking-widest text-[9px] text-reddit-blue px-2 py-0.5 bg-blue-50 rounded">Technical Summary</span>
                  <span>·</span>
                  <span class="font-medium italic">Architecture & Stack Breakdown</span>
                </div>

                @for (comment of project().summaryComments; track comment.id) {
                  <div class="flex gap-3 mb-6">
                    <div class="flex flex-col items-center shrink-0">
                      <div class="w-8 h-8 rounded-full bg-reddit-blue flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        {{ comment.author[2] || 'K' }}
                      </div>
                      <div class="flex-1 w-[2px] bg-gradient-to-b from-reddit-blue/40 to-transparent mt-2"></div>
                    </div>
                    <div class="flex-1 pt-0.5">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm font-bold text-reddit-text">{{ comment.author }}</span>
                        <span class="text-xs text-reddit-meta">·</span>
                        <span class="text-xs font-bold text-reddit-blue uppercase tracking-tighter">{{ comment.phase }}</span>
                      </div>
                      <p class="text-sm text-reddit-text leading-relaxed mb-4">
                        {{ comment.content }}
                      </p>

                      <div class="flex flex-wrap gap-2">
                        @for (tag of comment.techTags; track tag.name) {
                          <p-tag 
                            [value]="tag.name" 
                            [severity]="tag.severity"
                            [style]="getTagStyle(tag.name)"
                            class="shadow-sm hover:scale-105 transition-transform cursor-help"
                            [title]="tag.tooltip"
                          />
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host ::ng-deep .p-button.p-button-outlined {
      border-width: 1.5px;
    }
    .aspect-video {
      aspect-ratio: 16 / 9;
    }
  `]
})
export class FeaturedPostComponent {
  project = input.required<Project>();

  private store = inject(PortfolioStore);
  private router = inject(Router);

  voted = computed(() => this.project().userVote ?? null);
  isExpanded = computed(() => this.store.selectedProjectId() === this.project().id);

  toggleExpand(): void {
    const currentId = this.store.selectedProjectId();
    const projectId = this.project().id;

    if (currentId === projectId) {
      this.store.selectProject(null);
      this.router.navigate(['/']);
    } else {
      this.store.selectProject(projectId);
      this.router.navigate(['/post', projectId]);
    }
  }

  vote(direction: 'up' | 'down'): void {
    this.store.toggleVote(this.project().id, direction);
  }

  formatVotes(count: number): string {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  }

  getTagStyle(tagName: string): any {
    const name = tagName.toLowerCase();

    // Angular 19 / Signals: Red/Orange
    if (name.includes('angular') || name.includes('signal')) {
      return {
        'background': 'linear-gradient(135deg, #DD0031 0%, #F97316 100%)',
        'color': '#fff',
        'border': 'none'
      };
    }

    // Cloudinary: Blue / Light-Blue
    if (name.includes('cloudinary')) {
      return {
        'background': 'linear-gradient(135deg, #0079D3 0%, #60A5FA 100%)',
        'color': '#fff',
        'border': 'none'
      };
    }

    // Material / Tailwind: Gray / Indigo
    if (name.includes('material') || name.includes('tailwind')) {
      return {
        'background': 'linear-gradient(135deg, #6366F1 0%, #475569 100%)',
        'color': '#fff',
        'border': 'none'
      };
    }

    return {};
  }
}
