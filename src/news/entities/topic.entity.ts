import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ name: 'main_image_url', nullable: true })
  mainImageUrl: string;

  @Column()
  priority: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column({ name: 'topic_theme', nullable: true })
  topicTheme: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true, type: 'text' })
  tags: string;

  @Column({ name: 'event_date', nullable: true, type: 'date' })
  eventDate: Date;

  @Column({ name: 'article_links', type: 'jsonb', nullable: true })
  articleLinks: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
