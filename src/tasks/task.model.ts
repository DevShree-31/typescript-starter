import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    title:string
    @Column({
        type:DataType.TEXT,
        allowNull:false
    })
    description:string
    @Column({
        type:DataType.ENUM('pending','in-progress','compeleted'),
        defaultValue:'pending'
    })
    status:string
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        references:{
            model:'User',
            key:'id'
        }
    })
    assignedTo:number
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    assignedBy:number
}