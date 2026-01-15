import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

export interface Project {
    id?: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    linkText: string;
}

export interface Skill {
    id?: number;
    name: string;
    icon: string;
    color: string;
}

export interface SkillCategory {
    id?: number;
    title: string;
    description: string;
    skills: Skill[];
}

export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private http = inject(HttpClient);
    private apiUrl = 'http://backend:3000/api';

    // General Info
    profile = signal({
        name: 'Abdullahi Muse Isse',
        role: 'Information Technology Professional',
        email: 'abdallaise877@gmail.com',
        phone: '+252 61 4163362',
        address: 'Mogadishu, Somalia',
        github: 'https://github.com/DDHDDHD3'
    });

    mission = signal('');

    // Projects
    projects = signal<Project[]>([]);

    // Skills
    skillCategories = signal<SkillCategory[]>([]);

    // Messages
    messages = signal<Message[]>([]);

    constructor() {
        this.loadAllData();
    }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    loadAllData() {
        this.fetchProfile();
        this.fetchProjects();
        this.fetchSkills();
        this.fetchMessages();
    }

    private fetchProfile() {
        this.http.get<any>(`${this.apiUrl}/profile`).subscribe(data => {
            if (data.name) {
                this.profile.set({
                    name: data.name,
                    role: data.role,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    github: data.github
                });
                this.mission.set(data.mission);
            }
        });
    }

    updateProfile(profile: any, mission: string) {
        const data = { ...profile, mission };
        return this.http.put(`${this.apiUrl}/profile`, data, { headers: this.getHeaders() }).pipe(
            tap(() => {
                this.profile.set(profile);
                this.mission.set(mission);
            })
        );
    }

    private fetchProjects() {
        this.http.get<any[]>(`${this.apiUrl}/projects`).pipe(
            map(data => data.map(p => ({
                id: p.id,
                title: p.title,
                description: p.description,
                imageUrl: p.image_url,
                link: p.link,
                linkText: p.link_text
            })))
        ).subscribe(mappedData => {
            this.projects.set(mappedData);
        });
    }

    addProject(project: Project) {
        const payload = {
            title: project.title,
            description: project.description,
            image_url: project.imageUrl,
            link: project.link,
            link_text: project.linkText
        };
        return this.http.post<any>(`${this.apiUrl}/projects`, payload, { headers: this.getHeaders() }).pipe(
            tap(p => {
                const newProject: Project = {
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    imageUrl: p.image_url,
                    link: p.link,
                    linkText: p.linkText
                };
                this.projects.update(projects => [...projects, newProject]);
            })
        );
    }

    updateProject(id: number, project: Project) {
        const payload = {
            title: project.title,
            description: project.description,
            image_url: project.imageUrl,
            link: project.link,
            link_text: project.linkText
        };
        return this.http.put(`${this.apiUrl}/projects/${id}`, payload, { headers: this.getHeaders() }).pipe(
            tap(() => {
                this.projects.update(projects => {
                    return projects.map(p => p.id === id ? { ...project, id } : p);
                });
            })
        );
    }

    deleteProject(index: number) {
        const id = this.projects()[index].id;
        return this.http.delete(`${this.apiUrl}/projects/${id}`, { headers: this.getHeaders() }).pipe(
            tap(() => {
                const current = this.projects();
                current.splice(index, 1);
                this.projects.set([...current]);
            })
        );
    }

    private fetchSkills() {
        this.http.get<SkillCategory[]>(`${this.apiUrl}/skills`).subscribe(data => {
            this.skillCategories.set(data);
        });
    }

    updateSkills(categories: SkillCategory[]) {
        return this.http.put(`${this.apiUrl}/skills`, categories, { headers: this.getHeaders() }).pipe(
            tap(() => {
                this.skillCategories.set(categories);
            })
        );
    }

    fetchMessages() {
        const token = localStorage.getItem('token');
        if (!token) return;

        this.http.get<Message[]>(`${this.apiUrl}/messages`, { headers: this.getHeaders() }).subscribe(data => {
            this.messages.set(data);
        });
    }

    sendMessage(message: { name: string, email: string, message: string }) {
        return this.http.post(`${this.apiUrl}/messages`, message);
    }

    deleteMessage(id: number) {
        return this.http.delete(`${this.apiUrl}/messages/${id}`, { headers: this.getHeaders() }).pipe(
            tap(() => {
                this.messages.update(m => m.filter(msg => msg.id !== id));
            })
        );
    }
}
