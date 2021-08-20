import { Injectable, NotFoundException } from '@nestjs/common';
import {TasksStatus} from './tasks.enum'
import { v4 as uuid } from 'uuid'
import { CreateTasksDto } from './DTOSTasks/create-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository:TasksRepository
    ){}


    public async getAllTasks():Promise<Tasks[]>{
        return await this.tasksRepository.find();
    }

    public async getRaksId(id:string):Promise<Tasks>{
        const found = await this.tasksRepository.findOne({
            where: id
        })

        if(!found){
            throw new NotFoundException(`Tasks id with ${id} not found`);
        }

        return found;
    }

    public async createTasksService(createTasksDto:CreateTasksDto):Promise<Tasks>{
        const {title,description} = createTasksDto
        const tasks: Tasks = {
            id: uuid(),
            title,
            description,
            status: TasksStatus.DONE
        }
        
        const created = this.tasksRepository.create(tasks)

        return await this.tasksRepository.save(created)
    }
    // public createTasksService(createTasksDto:CreateTasksDto):ITasks{

    //     const {title,description} = createTasksDto

    //     const tasks: ITasks = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TasksStatus.DONE
    //     }
    //     this.tasks.push(tasks)
    //     return tasks
    // }
}
