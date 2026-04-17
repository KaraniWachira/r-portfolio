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
  ],
  template: `
    <article
      class="bg-reddit-card border border-reddit-border rounded-md hover:border-reddit-border-hover transition-colors cursor-pointer"
      pAnimateOnScroll
      enterClass="fadein"
      [attr.id]="'post-' + project().id"
    >
      <div class="flex">
        <!-- Vote Gutter -->
        <div class="w-10 bg-gray-50 rounded-l-md flex flex-col items-center pt-3 pb-2 gap-0.5 shrink-0">
          <button
            class="p-0.5 rounded hover:bg-orange-100 transition-colors group"
            [class.text-reddit-upvote]="voted() === 'up'"
            [class.text-reddit-meta]="voted() !== 'up'"
            (click)="vote('up'); $event.stopPropagation()"
          >
            <svg lucideChevronUp [size]="20" class="group-hover:text-reddit-upvote"></svg>
          </button>
          <span
            class="text-xs font-bold"
            [class.text-reddit-upvote]="voted() === 'up'"
            [class.text-reddit-downvote]="voted() === 'down'"
            [class.text-reddit-text]="voted() === null"
          >
            {{ formatVotes(project().upvotes) }}
          </span>
          <button
            class="p-0.5 rounded hover:bg-blue-100 transition-colors group"
            [class.text-reddit-downvote]="voted() === 'down'"
            [class.text-reddit-meta]="voted() !== 'down'"
            (click)="vote('down'); $event.stopPropagation()"
          >
            <svg lucideChevronDown [size]="20" class="group-hover:text-reddit-downvote"></svg>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0 py-2 px-2">
          <!-- Post Meta -->
          <div class="flex items-center gap-1.5 mb-1 flex-wrap">
            <p-avatar
              [label]="project().subreddit.substring(2, 4).toUpperCase()"
              [style]="{ 'background-color': project().subredditColor, color: '#fff', width: '20px', height: '20px', 'font-size': '0.55rem', 'font-weight': '700' }"
              shape="circle"
            />
            <span class="text-xs font-bold text-reddit-text hover:underline cursor-pointer">{{ project().subreddit }}</span>
            <span class="text-xs text-reddit-meta">•</span>
            <span class="text-xs text-reddit-meta">Posted by</span>
            <span class="text-xs text-reddit-meta hover:underline cursor-pointer">{{ project().author }}</span>
            <span class="text-xs text-reddit-meta">{{ getTimeAgo(project().timestamp) }}</span>
            <!-- Awards -->
            @if (project().awards.length > 0) {
              <span class="text-xs flex gap-0.5 ml-1">
                @for (award of project().awards; track $index) {
                  <span>{{ award }}</span>
                }
              </span>
            }
          </div>

          <!-- Title -->
          <h2
            class="text-lg font-semibold text-reddit-text leading-snug mb-2 hover:underline cursor-pointer pr-4"
            (click)="toggleExpand()"
          >
            {{ project().title }}
          </h2>

          <!-- Content -->
          <p class="text-sm text-reddit-text leading-relaxed mb-3 pr-4">
            {{ project().content }}
          </p>

          <!-- Action Bar -->
          <div class="flex items-center gap-1 -ml-1 flex-wrap">
            <button
              class="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-reddit-bg transition-colors text-reddit-meta text-xs font-bold"
              [class.text-reddit-blue]="isExpanded()"
              [class.bg-blue-50]="isExpanded()"
              (click)="toggleExpand()"
            >
              <svg lucideMessageSquare [size]="16"></svg>
              <span>{{ project().commentCount }} Comments</span>
            </button>
            <button class="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-reddit-bg transition-colors text-reddit-meta text-xs font-bold">
              <svg lucideAward [size]="16"></svg>
              <span class="hidden sm:inline">Award</span>
            </button>
            <button class="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-reddit-bg transition-colors text-reddit-meta text-xs font-bold">
              <svg lucideShare2 [size]="16"></svg>
              <span class="hidden sm:inline">Share</span>
            </button>
            <button class="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-reddit-bg transition-colors text-reddit-meta text-xs font-bold">
              <svg lucideBookmark [size]="16"></svg>
              <span class="hidden sm:inline">Save</span>
            </button>
            <button class="p-1.5 rounded hover:bg-reddit-bg transition-colors text-reddit-meta">
              <svg lucideMoreHorizontal [size]="16"></svg>
            </button>
          </div>

          <!-- Expanded Project Detail Section -->
          @if (isExpanded()) {
            <app-project-detail [project]="project()" />
          }
        </div>
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
