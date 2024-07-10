import { ApiProperty } from '@nestjs/swagger';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { User } from 'src/modules/user/entity/user.entiy';
import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToMany } from 'typeorm';

@Entity()
export class Cryptocurrency  {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    assetId: string

    @ApiProperty()
    @ManyToMany(() => User, user => user.cryptocurrencies,  {onDelete:"CASCADE", onUpdate:'CASCADE'})
    users: User[];
}

