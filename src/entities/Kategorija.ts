/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CategoryResponse from '../models/response/CategoryResponse'

@Index('kategorija_pkey', ['kategorijaId'], { unique: true })
@Entity('Kategorija', { schema: 'public' })
export default class Kategorija extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_kategorije' })
  kategorijaId!: number

  @Column('character varying', {
    name: 'ime_kategorije',
    nullable: true,
    length: 255,
  })
  kategorijaIme!: string | null

  toCategoryResponse(): CategoryResponse {
    const categoryResponse = new CategoryResponse()
    categoryResponse.categoryId = this.kategorijaId
    categoryResponse.categoryName = this.kategorijaIme
    
    return categoryResponse
  }
}