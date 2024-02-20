import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { UserLocation } from '../types/location.type'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    id: number

    @Column({ name: 'user_firstname' })
    firstName: string

    @Column({ name: 'user_lastname' })
    lastName: string

    @Column({ name: 'user_password' })
    password: string

    @Column({ name: 'user_avatar' })
    avatar: string

    @Column({ name: 'user_location', type: 'json' })
    location: UserLocation

    @Column({ name: 'user_email' })
    email: string

    @Column({ name: 'user_phone' })
    phone: string
}
