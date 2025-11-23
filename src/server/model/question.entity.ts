import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_NAME } from "../constants/tableName";
import { User } from "./user.entity";
import { IOption } from "../interface/interfaces";
import { BaseEntity } from "../baseEntity/base.entity";

@Entity({ name: TABLE_NAME.QUESTION })
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  chapter: string;

  @Column("text")
  question_text: string;

  @Column("jsonb")
  options: IOption[];

  @Column("text")
  explanation: string;

  @Column({ nullable: true })
  explanation_image_url: string;

  @Column({
    type: "enum",
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  })
  status: "pending" | "approved" | "rejected";

  @ManyToOne(() => User, (user) => user.created_questions, { nullable: true })
  created_by: User;

  @Column({ type: "uuid", nullable: true })
  created_by_id: string | null;

  @ManyToOne(() => User, (user) => user.submitted_questions, { nullable: true })
  submitted_by: User;

  @Column({ type: "uuid", nullable: true })
  submitted_by_id: string | null;

  // APPROVER
  @Column({ type: "uuid", nullable: true })
  approved_by_id: string | null;

  @Column({ type: "timestamp", nullable: true })
  approved_at: Date | null;
}
