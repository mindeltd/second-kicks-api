import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class TokenEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  refreshToken: string;

  @Column()
  accessToken: string;
}
