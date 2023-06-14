import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
  @Column
  title!: string;

  @Column
  completed!: boolean;
}

