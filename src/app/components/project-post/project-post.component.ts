import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import {
  LucideChevronUp,
  LucideChevronDown,
  LucideMessageSquare,
  LucideShare2,
  LucideBookmark,
  LucideMoreHorizontal,
  LucideAward,
} from '@lucide/angular';
import { Project } from '../../models/portfolio.models';
import { PortfolioStore } from '../../store/portfolio.store';
import { ProjectCommentsComponent } from '../project-comments/project-comments.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-project-post',
  standalone: true,
  imports: [
    CommonModule,
    Avatar,
    AnimateOnScroll,
    LucideChevronUp,
    LucideChevronDown,
    LucideMessageSquare,
    LucideShare2,
    LucideBookmark,
    LucideMoreHorizontal,
    LucideAward,
    ProjectDetailComponent,
    ProjectCommentsComponent
  ],
  template: `
    <article
      class="bg-reddit-card border-y sm:border border-reddit-border/60 rounded-none sm:rounded-xl hover:border-reddit-border transition-colors cursor-pointer"
      pAnimateOnScroll
      enterClass="fadein"
      [attr.id]="'post-' + project().id"
      (click)="toggleExpand()"
    >
      <div class="flex flex-col py-3 px-3 sm:px-4">
        <!-- Post Meta -->
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <p-avatar
            [label]="project().subreddit.substring(2, 4).toUpperCase()"
            [style]="{ 'background-color': project().subredditColor, color: '#fff', width: '24px', height: '24px', 'font-size': '0.65rem', 'font-weight': '700' }"
            shape="circle"
          />
          <span class="text-[13px] font-bold text-reddit-text hover:underline cursor-pointer" (click)="$event.stopPropagation()">{{ project().subreddit }}</span>
          <span class="text-[13px] text-reddit-meta">•</span>
          <span class="text-[13px] text-reddit-meta hover:underline cursor-pointer" (click)="$event.stopPropagation()">{{ project().author }}</span>
          <span class="text-[13px] text-reddit-meta">{{ getTimeAgo(project().timestamp) }}</span>
          
          <!-- Awards -->
          @if (project().awards.length > 0) {
            <span class="text-[13px] flex gap-1 ml-auto">
              @for (award of project().awards; track $index) {
                <span>{{ award }}</span>
              }
            </span>
          }
        </div>

        <!-- Title -->
        <h2 class="text-[17px] sm:text-[19px] font-bold text-reddit-text leading-snug mb-2 pr-4">
          {{ project().title }}
        </h2>

        <!-- Content -->
        <p class="text-[14px] text-reddit-text leading-relaxed mb-3 pr-4 line-clamp-4">
          {{ project().content }}
        </p>

        <!-- Action Bar -->
        <div class="flex items-center gap-1.5 flex-wrap font-bold text-reddit-meta text-[12px]">
          
          <!-- Vote Pill -->
          <div 
            class="flex items-center bg-reddit-bg/60 hover:bg-reddit-bg shrink-0 rounded-full transition-colors h-[32px]"
            (click)="$event.stopPropagation()"
          >
            <button
              class="h-full px-2 rounded-l-full hover:bg-reddit-border/30 flex items-center justify-center transition-colors"
              [class.text-reddit-upvote]="voted() === 'up'"
              (click)="vote('up')"
            >
              <svg lucideChevronUp [size]="18" [class.text-reddit-upvote]="voted() === 'up'"></svg>
            </button>
            <span
              class="px-1 text-[13px]"
              [class.text-reddit-upvote]="voted() === 'up'"
              [class.text-reddit-downvote]="voted() === 'down'"
              [class.text-reddit-text]="voted() === null"
            >
              {{ formatVotes(project().upvotes) }}
            </span>
            <button
              class="h-full px-2 rounded-r-full hover:bg-reddit-border/30 flex items-center justify-center transition-colors"
              [class.text-reddit-downvote]="voted() === 'down'"
              (click)="vote('down')"
            >
              <svg lucideChevronDown [size]="18" [class.text-reddit-downvote]="voted() === 'down'"></svg>
            </button>
          </div>

          <!-- Comments Pill -->
          <button
            class="flex items-center gap-1.5 px-3 h-[32px] rounded-full bg-reddit-bg/60 hover:bg-reddit-bg transition-colors"
            [class.text-reddit-blue]="isExpanded()"
            [class.bg-blue-50]="isExpanded()"
            (click)="$event.stopPropagation(); toggleExpand()"
          >
            <svg lucideMessageSquare [size]="16"></svg>
            <span>{{ project().commentCount }}</span>
          </button>

          <!-- Share Pill -->
          <button class="flex items-center gap-1.5 px-3 h-[32px] rounded-full bg-reddit-bg/60 hover:bg-reddit-bg transition-colors" (click)="$event.stopPropagation()">
            <svg lucideShare2 [size]="16"></svg>
            <span class="hidden sm:inline">Share</span>
          </button>
        </div>

        <!-- Expanded Project Detail Section -->
        @if (isExpanded()) {
          <div class="mt-4 border-t border-reddit-border/50 pt-4" (click)="$event.stopPropagation()">
            <app-project-detail [project]="project()" />
          </div>
        }
      </div>
    </article>

  `,
})
export class ProjectPostComponent {
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
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'just now';
  }
}
