import './styles.css'
import { Car } from '../../payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import HomePageClient from './components/client/pages/HomePage.client'

async function getCars(): Promise<Car[]> {
  const payload = await getPayload({
    config: config,
  })
  const { docs: cars } = await payload.find({
    collection: 'cars',
    where: {
      status: {
        equals: 'active',
      },
    },
    sort: '-createdAt',
    limit: 10,
  })
  return cars as Car[]
}

export default async function HomePage() {
  const cars = await getCars()

  return (
    <div>
      <h1>Hello World</h1>
      <HomePageClient cars={cars} />
    </div>
  )
}
