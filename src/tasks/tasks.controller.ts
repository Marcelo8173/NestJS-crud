import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTasksDto } from './DTOSTasks/create-tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks()
    }

    @Post()
    public createTasks(@Body() createTasksDto: CreateTasksDto) {
        return this.tasksService.createTasksService(createTasksDto)
    }

    @Get('/:id')
    public getTaksId(@Param('id') id: string){
        return this.tasksService.getRaksId(id)
    }

}
