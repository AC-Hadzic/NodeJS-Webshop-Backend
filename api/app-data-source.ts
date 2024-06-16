import { DataSource } from 'typeorm'
import Kosarica from '../src/entities/Kosarica'
import Proizvod from '../src/entities/Proizvod'
import ProizvodKupac from '../src/entities/ProizvodKupac'
import Racun from '../src/entities/Racun'
import Slika from '../src/entities/Slika'
import Kupac from '../src/entities/Kupac'
import Grad from '../src/entities/Grad'
import Adresa from '../src/entities/Adresa'
import FileImportTracker from '../src/entities/FileImportTracker'
import Kategorija from '../src/entities/Kategorija'

export default new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: false,
  entities: [ 
    ProizvodKupac,
    Racun,
    Slika,
    Grad,
    Adresa,
    Kosarica,
    Kupac,
    Proizvod,
    FileImportTracker,
    Kategorija,
  ],
  // ssl: {
  //   rejectUnauthorized: false, // For testing purposes; should be handled securely in production
  // },
})

