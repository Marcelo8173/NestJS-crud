import { Injectable, NotFoundException } from '@nestjs/common';
import {ITasks,TasksStatus} from './tasks.model'
import { v4 as uuid } from 'uuid'
import { CreateTasksDto } from './DTOSTasks/create-tasks.dto';

@Injectable()
export class TasksService {
    private tasks:ITasks[]  = []

    public getAllTasks():ITasks[]{
        return this.tasks
    }

    public getRaksId(id:string):ITasks{
        const taksId = this.tasks.find(item => item.id === id)
        
        if(!taksId){
            throw new NotFoundException(`Tasks id with ${id} not found`);
        }

        return taksId
    }

    public createTasksService(createTasksDto:CreateTasksDto):ITasks{

        const {title,description} = createTasksDto

        const tasks: ITasks = {
            id: uuid(),
            title,
            description,
            status: TasksStatus.DONE
        }
        this.tasks.push(tasks)
        return tasks
    }
}
