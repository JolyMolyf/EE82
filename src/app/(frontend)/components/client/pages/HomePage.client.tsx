'use client'
import { Car } from '@/payload-types'
import CarCard from '../../carCard/CarCard'

interface IHomePageClientProps {
  cars: Car[]
}

const HomePageClient = (props: IHomePageClientProps) => {
  const { cars } = props
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {cars.map((car) => (
          <div key={car.id} className="">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePageClient
