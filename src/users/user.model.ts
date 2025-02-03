import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate:{
        isEmail:true
    }
  })
  email: string;

  @Column({
    type:DataType.STRING,
    allowNull:false,
  })
  password:string
}
