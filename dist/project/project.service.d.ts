import { Project } from './project.entity';
import { Repository } from 'typeorm';
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: Repository<Project>);
    findAll(): Promise<Project[]>;
    create(project: Project): Promise<Project>;
}
