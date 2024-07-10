import { Cryptocurrency } from 'src/modules/wathlist/entity/wathlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Cryptocurrency, cryptocurrency => cryptocurrency.users, {onDelete:"CASCADE", onUpdate:'CASCADE'})
    @JoinTable()
    cryptocurrencies: Cryptocurrency[];
}