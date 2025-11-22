// src/model/user.entity.ts
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../src/server/baseEntity/base.entity";
import { Question } from "./question.entity";

@Entity({ name: "users" })
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
