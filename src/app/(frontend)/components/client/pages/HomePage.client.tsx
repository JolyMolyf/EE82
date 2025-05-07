'use client'
import { Car } from '@/payload-types'
import CarCard from '../../CarCard/CarCard'

interface IHomePageClientProps {
  cars: Car[]
}

const HomePageClient = (props: IHomePageClientProps) => {
  const { cars } = props
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {cars.map((car) => (
          <div key={car.id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePageClient
