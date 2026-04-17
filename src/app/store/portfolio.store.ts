import { Injectable, signal, computed } from '@angular/core';
import { Project, ProjectComment } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  readonly projects = signal<Project[]>([
    {
      id: 'basepoint',
      title: 'BasePoint — Real-time Data Pipeline for Sports Analytics & Metrics',
      author: 'u/Keith',
      subreddit: 'r/DataPipelines',
      subredditColor: '#0079D3',
      timestamp: new Date('2026-04-10T14:30:00'),
      content:
        'Built a complete real-time data pipeline that ingests live sports metrics, processes them through a Go backend, runs statistical analysis in R, and presents everything in a sleek Angular dashboard. The system handles thousands of events per second with sub-100ms latency from ingestion to visualization. Supabase powers auth and persistent storage, while Go channels handle the concurrent stream processing.',
      upvotes: 0,
      commentCount: 5,
      awards: ['🏆', '🚀', '💡'],
      summaryComments: [
        {
          id: 'bp-1',
          author: 'u/Keith',
          phase: 'The Backend',
          content:
            'The core pipeline is written in Go, leveraging goroutines and channels for concurrent stream processing. Each data source gets its own ingestion worker that normalizes events into a common schema before pushing to the processing queue. Built custom middleware for rate limiting and circuit breaking.',
          techTags: [
            { name: 'Go', color: '#00ADD8', severity: 'info', tooltip: 'Go 1.23 — Concurrent pipeline workers using goroutines and channels' },
            { name: 'gRPC', color: '#244C5A', severity: 'secondary', tooltip: 'gRPC for low-latency internal service communication' },
          ],
          timestamp: new Date('2026-04-10T14:35:00'),
          upvotes: 0,
          replies: [
            {
              id: 'bp-1-1',
              author: 'u/Keith',
              phase: 'Stream Processing',
              content:
                'Implemented a sliding window aggregation engine that computes rolling averages, percentiles, and anomaly detection in real-time. The engine uses a custom ring buffer for memory efficiency.',
              techTags: [
                { name: 'Go Channels', color: '#00ADD8', severity: 'info', tooltip: 'Buffered channels with fan-out/fan-in patterns' },
              ],
              timestamp: new Date('2026-04-10T14:40:00'),
              upvotes: 0,
            },
          ],
        },
        {
          id: 'bp-2',
          author: 'u/Keith',
          phase: 'The Analysis Engine',
          content:
            'R handles the heavy statistical lifting — time series decomposition, regression models, and predictive analytics. Integrated with the Go backend via a REST bridge that serializes data frames efficiently.',
          techTags: [
            { name: 'R', color: '#276DC3', severity: 'contrast', tooltip: 'R 4.4 — Statistical computing with tidyverse and forecast packages' },
            { name: 'Plumber API', color: '#7B4F9D', severity: 'contrast', tooltip: 'Plumber for exposing R models as REST endpoints' },
          ],
          timestamp: new Date('2026-04-10T14:45:00'),
          upvotes: 0,
        },
        {
          id: 'bp-3',
          author: 'u/Keith',
          phase: 'Data & Auth Layer',
          content:
            'Supabase handles user authentication (OAuth + JWT), real-time subscriptions for live dashboard updates, and PostgreSQL storage for historical data. Row-level security ensures multi-tenant data isolation.',
          techTags: [
            { name: 'Supabase', color: '#3ECF8E', severity: 'success', tooltip: 'Supabase — Auth, Realtime subscriptions, and PostgreSQL storage' },
            { name: 'PostgreSQL', color: '#336791', severity: 'info', tooltip: 'PostgreSQL 16 with TimescaleDB extension for time-series data' },
          ],
          timestamp: new Date('2026-04-10T14:50:00'),
          upvotes: 0,
        },
        {
          id: 'bp-4',
          author: 'u/Keith',
          phase: 'The Frontend',
          content:
            'Angular powers the dashboard with Signal-based reactive state, real-time chart updates via WebSocket subscriptions, and a responsive layout built with Tailwind CSS. PrimeNG provides the data tables and chart components.',
          techTags: [
            { name: 'Angular', color: '#DD0031', severity: 'danger', tooltip: 'Angular 21 — Signal-based state management and zoneless rendering' },
            { name: 'Tailwind CSS', color: '#06B6D4', severity: 'info', tooltip: 'Tailwind CSS v4 — Utility-first styling with CSS-first config' },
            { name: 'PrimeNG', color: '#DD0031', severity: 'danger', tooltip: 'PrimeNG — Rich UI component library for data visualization' },
          ],
          timestamp: new Date('2026-04-10T14:55:00'),
          upvotes: 0,
        },
        {
          id: 'bp-5',
          author: 'u/Keith',
          phase: 'DevOps & Deployment',
          content:
            'Containerized with Docker, orchestrated via Docker Compose for local dev. CI/CD pipeline with GitHub Actions runs tests, builds images, and deploys to a VPS. Monitoring with Prometheus and Grafana dashboards.',
          techTags: [
            { name: 'Docker', color: '#2496ED', severity: 'info', tooltip: 'Docker — Multi-stage builds for optimized container images' },
            { name: 'GitHub Actions', color: '#2088FF', severity: 'info', tooltip: 'CI/CD with automated testing and deployment pipelines' },
          ],
          timestamp: new Date('2026-04-10T15:00:00'),
          upvotes: 0,
        },
      ],
      articles: [
        {
          platform: 'medium',
          title: 'Learning R Through Baseball: Understanding Vectors One Hit at a Time',
          url: 'https://medium.com/@keithkarani/phlearning-r-through-baseball-understanding-vectors-one-hit-at-a-time-fca141a7a1dc',
          readTime: '4 min read',
        },
        {
          platform: 'medium',
          title: 'From Dugout to Data: Understanding Matrices in R Through Baseball',
          url: 'https://medium.com/@keithkarani/from-dugout-to-data-understanding-matrices-in-r-through-baseball-11a2bf5df9ef',
          readTime: '4 min read',
        },
      ],
    },
    {
      id: 'feedflow',
      title: 'Feed Flow — Full-Stack Agricultural Management Platform for Livestock Farmers',
      author: 'u/Keith',
      subreddit: 'r/FarmTech',
      subredditColor: '#46A508',
      timestamp: new Date('2026-04-08T09:00:00'),
      content:
        'Designed and built a comprehensive farm management system that tracks livestock inventory, feed schedules, health records, and financial analytics. The platform helps small-scale farmers digitize their operations with an intuitive mobile-first interface. Features include real-time inventory tracking, automated feed cost calculations, and visual analytics dashboards with Chart.js.',
      upvotes: 0,
      commentCount: 5,
      awards: ['🌱', '💪', '🔥'],
      summaryComments: [
        {
          id: 'ff-1',
          author: 'u/Keith',
          phase: 'The Backend',
          content:
            'Go REST API with clean architecture — handlers, services, and repository layers. JWT authentication middleware, input validation, and structured logging. The API follows RESTful conventions with proper error handling and pagination.',
          techTags: [
            { name: 'Go', color: '#00ADD8', severity: 'info', tooltip: 'Go 1.23 — Clean architecture REST API with Chi router' },
            { name: 'Chi Router', color: '#00ADD8', severity: 'info', tooltip: 'Lightweight, composable HTTP router for Go' },
          ],
          timestamp: new Date('2026-04-08T09:10:00'),
          upvotes: 0,
          replies: [
            {
              id: 'ff-1-1',
              author: 'u/Keith',
              phase: 'Database Schema',
              content:
                'Designed a normalized schema for farms, animals, feed records, health events, and financial transactions. Supabase migrations handle schema evolution.',
              techTags: [
                { name: 'Supabase', color: '#3ECF8E', severity: 'success', tooltip: 'Supabase — Managed PostgreSQL with auto-generated APIs' },
              ],
              timestamp: new Date('2026-04-08T09:15:00'),
              upvotes: 0,
            },
          ],
        },
        {
          id: 'ff-2',
          author: 'u/Keith',
          phase: 'The Analysis Layer',
          content:
            'R scripts handle the financial forecasting and feed optimization algorithms. Linear programming models suggest optimal feed mixes based on cost and nutritional requirements. Time series analysis predicts livestock weight gain trajectories.',
          techTags: [
            { name: 'R', color: '#276DC3', severity: 'contrast', tooltip: 'R 4.4 — Statistical modeling and optimization with lpSolve' },
            { name: 'Shiny', color: '#7B4F9D', severity: 'contrast', tooltip: 'Shiny dashboards for farmer-facing analytics reports' },
          ],
          timestamp: new Date('2026-04-08T09:20:00'),
          upvotes: 0,
        },
        {
          id: 'ff-3',
          author: 'u/Keith',
          phase: 'The Frontend',
          content:
            'Angular SPA with NgRx Signal Store for state management. Mobile-first responsive design with PrimeNG components. Features include drag-and-drop feed scheduling, interactive inventory grids, and Chart.js powered financial dashboards.',
          techTags: [
            { name: 'Angular', color: '#DD0031', severity: 'danger', tooltip: 'Angular 21 — NgRx Signal Store for predictable state management' },
            { name: 'Chart.js', color: '#FF6384', severity: 'danger', tooltip: 'Chart.js — Interactive financial and livestock analytics charts' },
            { name: 'PrimeNG', color: '#DD0031', severity: 'danger', tooltip: 'PrimeNG — Data tables, calendars, and form components' },
          ],
          timestamp: new Date('2026-04-08T09:25:00'),
          upvotes: 0,
        },
        {
          id: 'ff-4',
          author: 'u/Keith',
          phase: 'Auth & Security',
          content:
            'Supabase Auth with email/password and Google OAuth. Row Level Security (RLS) policies ensure farmers can only access their own farm data. JWT interceptor in Angular for automatic token attachment.',
          techTags: [
            { name: 'Supabase Auth', color: '#3ECF8E', severity: 'success', tooltip: 'Supabase Auth — OAuth providers and JWT-based session management' },
            { name: 'RLS', color: '#336791', severity: 'info', tooltip: 'PostgreSQL Row Level Security for multi-tenant data isolation' },
          ],
          timestamp: new Date('2026-04-08T09:30:00'),
          upvotes: 0,
        },
        {
          id: 'ff-5',
          author: 'u/Keith',
          phase: 'Mobile Experience',
          content:
            'PWA-ready with service workers for offline feed entry. Responsive layouts adapt from desktop dashboards to mobile card views. Touch-optimized interactions for field use — farmers can log data with one hand.',
          techTags: [
            { name: 'PWA', color: '#5A0FC8', severity: 'contrast', tooltip: 'Progressive Web App — Offline-capable with service worker caching' },
            { name: 'Tailwind CSS', color: '#06B6D4', severity: 'info', tooltip: 'Tailwind CSS v4 — Mobile-first responsive utility classes' },
          ],
          timestamp: new Date('2026-04-08T09:35:00'),
          upvotes: 0,
        },
      ],
      articles: [
        {
          platform: 'medium',
          title: 'Architecting a Data-Driven Meritocracy for Kenyan Baseball',
          url: 'https://medium.com/@keithkarani/architecting-a-data-driven-meritocracy-for-kenyan-baseball-b3a8f9f6b399',
          readTime: '4 min read',
        },
        {
          platform: 'medium',
          title: 'Engineering a Reproducible Data Pipeline for High-Entropy Sports Metrics',
          url: 'https://medium.com/@keithkarani/engineering-a-reproducible-data-pipeline-for-high-entropy-sports-metrics-08799491b0cd',
          readTime: '5 min read',
        },
      ],
    },
  ]);

  readonly selectedProjectId = signal<string | null>(null);
  readonly searchQuery = signal<string>('');

  // Mobile Sidebar Visibility
  readonly isNavVisible = signal(false);
  readonly isRightSidebarVisible = signal(false);

  readonly filteredProjects = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.projects();
    return this.projects().filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.subreddit.toLowerCase().includes(query)
    );
  });

  readonly selectedProject = computed(() => {
    const id = this.selectedProjectId();
    if (!id) return null;
    return this.projects().find((p) => p.id === id) ?? null;
  });

  selectProject(id: string | null): void {
    this.selectedProjectId.set(id);
    // Auto-close sidebars on navigation
    this.isNavVisible.set(false);
    this.isRightSidebarVisible.set(false);
  }

  toggleNav(): void {
    this.isNavVisible.update(v => !v);
  }

  toggleRightSidebar(): void {
    this.isRightSidebarVisible.update(v => !v);
  }

  closeSidebars(): void {
    this.isNavVisible.set(false);
    this.isRightSidebarVisible.set(false);
  }

  toggleVote(projectId: string, direction: 'up' | 'down'): void {
    this.projects.update((projects) =>
      projects.map((p) => {
        if (p.id !== projectId) return p;

        const currentVote = p.userVote ?? null;
        let newVote: 'up' | 'down' | null = direction;
        let scoreChange = 0;

        if (currentVote === direction) {
          // Toggle off
          newVote = null;
          scoreChange = direction === 'up' ? -1 : 1;
        } else if (currentVote === null) {
          // New vote
          scoreChange = direction === 'up' ? 1 : -1;
        } else {
          // Switch vote (e.g. up to down)
          scoreChange = direction === 'up' ? 2 : -2;
        }

        return { ...p, upvotes: p.upvotes + scoreChange, userVote: newVote };
      })
    );
  }

  toggleCommentVote(projectId: string, commentId: string, direction: 'up' | 'down'): void {
    const updateRecursive = (comments: ProjectComment[]): ProjectComment[] => {
      return comments.map((c) => {
        if (c.id === commentId) {
          const currentVote = c.userVote ?? null;
          let newVote: 'up' | 'down' | null = direction;
          let scoreChange = 0;

          if (currentVote === direction) {
            newVote = null;
            scoreChange = direction === 'up' ? -1 : 1;
          } else if (currentVote === null) {
            scoreChange = direction === 'up' ? 1 : -1;
          } else {
            scoreChange = direction === 'up' ? 2 : -2;
          }
          return { ...c, upvotes: c.upvotes + scoreChange, userVote: newVote };
        }

        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: updateRecursive(c.replies) };
        }

        return c;
      });
    };

    this.projects.update((projects) =>
      projects.map((p) =>
        p.id === projectId
          ? { ...p, summaryComments: updateRecursive(p.summaryComments) }
          : p
      )
    );
  }
}
