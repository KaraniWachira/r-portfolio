import { Component, inject, OnInit, OnDestroy, computed } from '@angular/core';
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
import { FeaturedPostComponent } from '../featured-post/featured-post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    LucideFlame,
    LucideSparkles,
    LucideTrendingUp,
    ProjectPostComponent,
    FeaturedPostComponent,
  ],
  template: `
    <div class="flex-1 min-w-0 w-full space-y-3 sm:space-y-4 pb-20 md:pb-6">
      <!-- Sort Bar -->
      <div class="bg-reddit-card border-y sm:border border-reddit-border rounded-none sm:rounded-md px-2 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-sm overflow-x-auto no-scrollbar">
        @for (tab of sortTabs; track tab.label) {
          <button
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
            [class.bg-reddit-bg]="activeSort === tab.label"
            [class.text-reddit-blue]="activeSort === tab.label"
            [class.text-reddit-meta]="activeSort !== tab.label"
            [class.hover:bg-reddit-bg]="activeSort !== tab.label"
            (click)="activeSort = tab.label"
          >
            @switch (tab.icon) {
              @case ('flame') { <svg lucideFlame [size]="14"></svg> }
              @case ('sparkles') { <svg lucideSparkles ></svg> }
              @case ('trending') { <svg lucideTrendingUp ></svg> }
            }
            <span>{{ tab.label }}</span>
          </button>
        }
      </div>

      <!-- Featured Post (Pinned) -->
      @if (featuredProject()) {
        <div class="feed-item mb-4 sm:scale-[1.02] origin-center">
          <app-featured-post [project]="featuredProject()!" />
        </div>
      }

      <!-- Posts Feed -->
      @for (project of regularProjects(); track project.id) {
        <div class="feed-item animate-fade-in-up">
          <app-project-post [project]="project" />
        </div>
      } @empty {
        @if (!featuredProject()) {
          <div class="bg-reddit-card border border-reddit-border rounded-md p-8 text-center mx-2 sm:mx-0">
            <p class="text-reddit-meta text-lg font-medium mb-2">No posts found</p>
            <p class="text-reddit-meta text-sm">Try adjusting your search query</p>
          </div>
        }
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

  featuredProject = computed(() => {
    return this.store.filteredProjects().find(p => p.id === 'autocare-towing');
  });

  regularProjects = computed(() => {
    return this.store.filteredProjects().filter(p => p.id !== 'autocare-towing');
  });

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







