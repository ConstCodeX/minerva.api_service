import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('articles') // Asegúrate de que el nombre de la tabla coincida (e.g., articles)
export class Article {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @Column()
  source: string; // Columna 'source' (medio de comunicación)

  @Column({ name: 'publication_date' })
  publicationDate: Date;
  
  @Column({ name: 'author_id' })
  authorId: number;
  
  // No necesitamos mapear Author e Image, ya que usaremos una consulta RAW (JOIN)
}