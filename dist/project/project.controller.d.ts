import { Observable } from 'rxjs';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    create(): Promise<Project>;
    findAll(request: any): Observable<Project[]>;
    findOne(params: any): string;
}
