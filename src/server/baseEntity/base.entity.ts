import { CreateDateColumn, Index, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: true,
    default: null,
  })
  @Index()
  created_at?: Date;

  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: true,
    default: null,
  })
  @Index()
  updated_at?: Date;
}
