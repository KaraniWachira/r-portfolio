import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { Avatar } from 'primeng/avatar';
import {
  LucideChevronUp,
  LucideChevronDown,
} from '@lucide/angular';
import { ProjectComment } from '../../models/portfolio.models';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-project-comments',
  standalone: true,
  imports: [
    CommonModule,
    Tag,
    Tooltip,
    Avatar,
    LucideChevronUp,
    LucideChevronDown,
  ],
  template: `
    <div class="animate-slide-down">
      <!-- Comment input area (decorative) -->
      <div class="px-4 pt-3 pb-2 border-t border-reddit-border">
        <div class="border border-reddit-border rounded-md p-2 text-sm text-reddit-meta bg-reddit-bg/50 cursor-text">
          Comment as <span class="text-reddit-blue font-medium">u/Keith</span>
        </div>
      </div>

      <!-- Thread heading -->
      <div class="px-4 py-2">
        <div class="flex items-center gap-2 text-xs text-reddit-meta">
          <span class="font-bold">Sort by: Best</span>
          <span>·</span>
          <span>{{ comments().length }} top-level comments</span>
        </div>
      </div>

      <!-- Comment threads -->
      <div class="px-2 pb-4 space-y-1">
        @for (comment of comments(); track comment.id) {
          <div class="animate-fade-in" [style.animation-delay]="($index * 100) + 'ms'">
            <ng-container *ngTemplateOutlet="commentThread; context: { $implicit: comment, depth: 0 }"></ng-container>
          </div>
        }
      </div>
    </div>

    <!-- Recursive comment template -->
    <ng-template #commentThread let-comment let-depth="depth">
      <div class="flex group" [style.margin-left]="(depth * 20) + 'px'">
        <!-- Thread line -->
        <div class="flex flex-col items-center mr-2 pt-2">
          <div class="thread-line flex-1 ml-[1px]" [class.border-reddit-blue]="depth === 0"></div>
        </div>

        <!-- Comment body -->
        <div class="flex-1 min-w-0 py-2">
          <!-- Comment header -->
          <div class="flex items-center gap-2 mb-1">
            <p-avatar
              [label]="comment.author[2]?.toUpperCase() || 'K'"
              [style]="{ 'background-color': depth === 0 ? '#FF4500' : '#EDEFF1', color: depth === 0 ? '#fff' : '#1C1C1C', width: '24px', height: '24px', 'font-size': '0.65rem', 'font-weight': '700' }"
              shape="circle"
            />
            <span class="text-xs font-bold text-reddit-text">{{ comment.author }}</span>
            <span class="text-xs text-reddit-meta">·</span>
            <span class="text-xs font-bold text-reddit-blue">📋 {{ comment.phase }}</span>
            <span class="text-xs text-reddit-meta">·</span>
            <span class="text-xs text-reddit-meta">{{ getTimeAgo(comment.timestamp) }}</span>
          </div>

          <!-- Comment content -->
          <p class="text-sm text-reddit-text leading-relaxed mb-2 pr-4">{{ comment.content }}</p>

          <!-- Tech tags -->
          @if (comment.techTags && comment.techTags.length > 0) {
            <div class="flex flex-wrap gap-1.5 mb-2">
              @for (tag of comment.techTags; track tag.name) {
                <p-tag
                  [value]="tag.name"
                  [severity]="tag.severity"
                  [pTooltip]="tag.tooltip"
                  tooltipPosition="top"
                  [rounded]="true"
                  [style]="{ cursor: 'default' }"
                />
              }
            </div>
          }

          <!-- Comment actions -->
          <div class="flex items-center gap-3 text-xs text-reddit-meta">
            <div class="flex items-center gap-1">
              <button
                class="hover:text-reddit-upvote transition-colors p-0.5 rounded hover:bg-red-50"
                [class.text-reddit-upvote]="comment.userVote === 'up'"
                (click)="vote(comment.id, 'up'); $event.stopPropagation()"
              >
                <svg lucideChevronUp [size]="14"></svg>
              </button>
              <span
                class="font-bold text-xs min-w-[1ch] text-center"
                [class.text-reddit-upvote]="comment.userVote === 'up'"
                [class.text-reddit-downvote]="comment.userVote === 'down'"
                [class.text-reddit-text]="!comment.userVote"
              >
                {{ comment.upvotes }}
              </span>
              <button
                class="hover:text-reddit-downvote transition-colors p-0.5 rounded hover:bg-blue-50"
                [class.text-reddit-downvote]="comment.userVote === 'down'"
                (click)="vote(comment.id, 'down'); $event.stopPropagation()"
              >
                <svg lucideChevronDown [size]="14"></svg>
              </button>
            </div>
            <button class="font-bold hover:underline">Reply</button>
            <button class="font-bold hover:underline">Share</button>
            <button class="font-bold hover:underline">Award</button>
          </div>
        </div>
      </div>

      <!-- Nested replies -->
      @if (comment.replies && comment.replies.length > 0) {
        @for (reply of comment.replies; track reply.id) {
          <ng-container *ngTemplateOutlet="commentThread; context: { $implicit: reply, depth: depth + 1 }"></ng-container>
        }
      }
    </ng-template>
  `,
})
export class ProjectCommentsComponent {
  comments = input.required<ProjectComment[]>();
  projectId = input.required<string>();

  private store = inject(PortfolioStore);

  vote(commentId: string, direction: 'up' | 'down'): void {
    this.store.toggleCommentVote(this.projectId(), commentId, direction);
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
