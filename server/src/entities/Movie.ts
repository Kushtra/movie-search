/*
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Producer } from './Producer';

@Entity()
export class Movie {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  name!: string;

  @Property()
  termsAccepted: boolean;

  @ManyToOne(() => Producer)
  producer: Producer;
}

*/
