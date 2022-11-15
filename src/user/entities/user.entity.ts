import { BossRaidEntity } from 'src/boss-raid/entities/boss-raid.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'total_score', default: 0 })
  totalScore: number;

  @OneToMany(() => BossRaidEntity, (bossRaid) => bossRaid.user)
  bossRaid: BossRaidEntity;
}
