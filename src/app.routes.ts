import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGeneralComponent } from './pages/admin/general/general.component';
import { AdminProjectsComponent } from './pages/admin/projects/projects.component';
import { AdminSkillsComponent } from './pages/admin/skills/skills.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'general',
        loadComponent: () => import('./pages/admin/general/general.component').then(m => m.AdminGeneralComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./pages/admin/projects/projects.component').then(m => m.AdminProjectsComponent)
      },
      {
        path: 'skills',
        loadComponent: () => import('./pages/admin/skills/skills.component').then(m => m.AdminSkillsComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./pages/admin/messages/messages.component').then(m => m.AdminMessagesComponent)
      },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
