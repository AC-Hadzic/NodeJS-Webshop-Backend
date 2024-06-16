import { DataSource } from 'typeorm'
import Kosarica from './entities/Kosarica'
import Proizvod from './entities/Proizvod'
import ProizvodKupac from './entities/ProizvodKupac'
import Racun from './entities/Racun'
import Slika from './entities/Slika'
import Kupac from './entities/Kupac'
import Grad from './entities/Grad'
import Adresa from './entities/Adresa'
import FileImportTracker from './entities/FileImportTracker'
import Kategorija from './entities/Kategorija'

export default new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
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
    synchronize: false,
    logging: false,
  // ssl: {
  //   rejectUnauthorized: false, // For testing purposes; should be handled securely in production
  // },
})

