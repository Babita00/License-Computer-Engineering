// src/model/user.entity.ts
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { BaseEntity } from "../baseEntity/base.entity";
import { TABLE_NAME } from "../constants/tableName";

@Entity({ name: TABLE_NAME.USER })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Question, (question) => question.created_by)
  created_questions: Question[];

  @OneToMany(() => Question, (question) => question.submitted_by)
  submitted_questions: Question[];
}
