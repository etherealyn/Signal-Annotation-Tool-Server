"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const project_service_1 = require("./project.service");
const project_entity_1 = require("./project.entity");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create() {
        const project = new project_entity_1.Project();
        project.title = 'My awesome title';
        project.description = 'My awesome description';
        project.modified = new Date();
        return this.projectService.create(project);
    }
    findAll(request) {
        return rxjs_1.of([]);
    }
    findOne(params) {
        return `This action returns a #${params.id} project`;
    }
};
__decorate([
    common_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProjectController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
ProjectController = __decorate([
    common_1.Controller('projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map