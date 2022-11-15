import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('boss_raid')
export class BossRaidEntity {
  @PrimaryGeneratedColumn('increment', { name: 'raidRecordId' })
  id: number;

  @Column()
  level: number;

  @Column({ default: 0 })
  score: number;

  @Column({ type: 'timestamp', name: 'enter_time' })
  enterTime: Date;

  @Column({
    type: 'timestamp',
    name: 'end_time',
    nullable: true,
    default: null,
  })
  endTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.bossRaid)
  user: UserEntity;
}
