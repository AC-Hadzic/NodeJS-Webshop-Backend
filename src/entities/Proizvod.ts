/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import ProizvodKupac from './ProizvodKupac'
import Slika from './Slika'
import StringToFloatTransformer from '../utils/stringToFloatTransformer'
import ProductResponse from '../models/response/ProductResponse'

@Index('Proizvod_pkey', ['proizvodId'], { unique: true })
@Entity('Proizvod', { schema: 'public' })
export default class Proizvod extends BaseEntity {
  @Generated()
  @PrimaryColumn({ type: 'integer', name: 'proizvod_id' })
  proizvodId!: number

  @Column('character varying', {
    name: 'ime_proizvoda',
    nullable: true,
    length: 255,
  })
  imeProizvoda!: string | null

  @Column('character varying', {
    name: 'proizvodjac',
    nullable: true,
    length: 255,
  })
  proizvodjac!: string | null

  @Column('character varying', { name: 'opis', nullable: true, length: 2048 })
  opis!: string | null

  @Column('numeric', {
    name: 'cijena',
    precision: 10,
    scale: 2,
    transformer: new StringToFloatTransformer(),
  })
  cijena!: number

  @Column('integer', { name: 'kolicina', nullable: true })
  kolicina!: number | null

  @Column('integer', { name: 'kategorija', nullable: true })
  kategorija!: number | null

  
  @Column('character varying', { name: 'spec1', nullable: true, length: 255 })
  spec1!: string | null

  @Column('character varying', { name: 'spec2', nullable: true, length: 255 })
  spec2!: string | null

  @Column('character varying', { name: 'spec3', nullable: true, length: 255 })
  spec3!: string | null

  @Column('character varying', { name: 'spec4', nullable: true, length: 255 })
  spec4!: string | null


  @Column('timestamp with time zone', {
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt!: Date | null

  @OneToMany(
    () => ProizvodKupac,
    (proizvodKupac: ProizvodKupac) => proizvodKupac.proizvod,
  )
  proizvodKupacs!: ProizvodKupac[]

  @OneToMany(() => Slika, (slika: Slika) => slika.proizvod)
  slikas!: Slika[]

  updateQuantityAndPrice(quantity: number, price: number) {
    this.cijena = price
    this.kolicina = quantity
  }

  updateExistingProduct(updatedData: Proizvod) {
    this.cijena = updatedData.cijena
    this.kolicina = updatedData.kolicina
    this.imeProizvoda = updatedData.imeProizvoda
    this.opis = updatedData.opis
    this.proizvodjac = updatedData.proizvodjac
    this.deletedAt = updatedData.deletedAt ?? null
    this.kategorija = updatedData.kategorija
    this.spec1 = updatedData.spec1
    this.spec2 = updatedData.spec2
    this.spec3 = updatedData.spec3
    this.spec4 = updatedData.spec4
  }

  toProductResponse(): ProductResponse {
    const productResponse = new ProductResponse()
    productResponse.productId = this.proizvodId
    productResponse.description = this.opis
    productResponse.manufacturer = this.proizvodjac
    productResponse.price = this.cijena
    productResponse.productName = this.imeProizvoda
    productResponse.quantity = this.kolicina
    productResponse.category = this.kategorija
    productResponse.spec1 = this.spec1
    productResponse.spec2 = this.spec2
    productResponse.spec3 = this.spec3
    productResponse.spec4 = this.spec4
    const thumbnailImages =
      this.slikas && this.slikas.length > 0
        ? this.slikas.filter((s) => s.isThumbnail)
        : []
    if (thumbnailImages.length > 0) {
      productResponse.thumbnailDescription = thumbnailImages[0].opis
      productResponse.thumbnailLink = thumbnailImages[0].link
      productResponse.thumbnailName = thumbnailImages[0].naziv
    }
    return productResponse
  }
}
