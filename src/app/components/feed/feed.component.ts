import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  LucideFlame,
  LucideSparkles,
  LucideTrendingUp,
} from '@lucide/angular';
import { PortfolioStore } from '../../store/portfolio.store';
import { ProjectPostComponent } from '../project-post/project-post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    LucideFlame,
    ProjectPostComponent,
  ],
  template: `
    <div class="flex-1 min-w-0 max-w-2xl mx-auto w-full space-y-3 pb-16 lg:pb-4">
      <!-- Sort Bar -->
      <div class="bg-reddit-card border border-reddit-border rounded-md px-3 py-2 flex items-center gap-2">
        @for (tab of sortTabs; track tab.label) {
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-colors"
            [class.bg-reddit-bg]="activeSort === tab.label"
            [class.text-reddit-blue]="activeSort === tab.label"
            [class.text-reddit-meta]="activeSort !== tab.label"
            [class.hover:bg-reddit-bg]="activeSort !== tab.label"
            (click)="activeSort = tab.label"
          >
            @switch (tab.icon) {
              @case ('flame') { <svg lucideFlame [size]="16"></svg> }
              <!-- @case ('sparkles') { <svg lucideSparkles [size]="16"></svg> }
              @case ('trending') { <svg lucideTrendingUp [size]="16"></svg> }
              @case ('bar') { <svg lucideBarChart3 [size]="16"></svg> } -->
            }
            <span class="hidden sm:inline">{{ tab.label }}</span>
          </button>
        }
      </div>

      <!-- Posts Feed -->
      @for (project of store.filteredProjects(); track project.id) {
        <div class="feed-item animate-fade-in-up">
          <app-project-post [project]="project" />
        </div>
      } @empty {
        <div class="bg-reddit-card border border-reddit-border rounded-md p-8 text-center">
          <p class="text-reddit-meta text-lg font-medium mb-2">No posts found</p>
          <p class="text-reddit-meta text-sm">Try adjusting your search query</p>
        </div>
      }
    </div>
  `,
})
export class FeedComponent implements OnInit, OnDestroy {
  readonly store = inject(PortfolioStore);
  private route = inject(ActivatedRoute);
  private routeSub?: Subscription;

  activeSort = 'Hot';

  sortTabs = [
    { label: 'Hot', icon: 'flame' },
    { label: 'New', icon: 'sparkles' },
    { label: 'Top', icon: 'trending' },
    { label: 'Rising', icon: 'bar' },
  ];

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      if (postId) {
        this.store.selectProject(postId);
        // Scroll to the post after a short delay
        setTimeout(() => {
          const el = document.getElementById('post-' + postId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
