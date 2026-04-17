import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  LucideChevronUp,
  LucideChevronDown,
} from '@lucide/angular';
import { Project } from '../../models/portfolio.models';
import { PortfolioStore } from '../../store/portfolio.store';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    LucideChevronUp,
    LucideChevronDown,
  ],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  project = input.required<Project>();
  private store = inject(PortfolioStore);

  vote(commentId: string, direction: 'up' | 'down'): void {
    this.store.toggleCommentVote(this.project().id, commentId, direction);
  }

  getTagStyle(tag: string): { [key: string]: string } {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('go')) return { 'background-color': 'var(--color-tag-go)', color: '#fff' };
    if (lowerTag.includes('r ') || lowerTag === 'r') return { 'background-color': 'var(--color-tag-r)', color: '#fff' };
    if (lowerTag.includes('supabase')) return { 'background-color': 'var(--color-tag-supabase)', color: '#fff' };
    if (lowerTag.includes('angular')) return { 'background-color': 'var(--color-tag-angular)', color: '#fff' };
    return {};
  }
}
