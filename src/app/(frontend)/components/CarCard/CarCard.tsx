'use client'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Car, Media } from '@/payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ICarCardProps {
  car: Car
}

const CarCard = (props: ICarCardProps) => {
  const { car } = props
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/car/${car.id}`)
  }

  return (
    <Card className="w-xs h-[450px] m-[10px] p-[0] rounded-lg shadow-lg">
      <Image
        className="w-[350px] h-[300px] object-cover rounded-t-lg"
        src={(car.car_main_image as Media)?.url ?? (car?.images?.[0]?.image as Media)?.url ?? ''}
        width={350}
        height={300}
        alt={`${car.title} main image`}
      />
      <CardHeader className="py-2 px-3">
        <CardTitle>{car.title}</CardTitle>
        <CardDescription className="text-xs">
          {car.year} / {car.fuel_type} / {car.mileage} km / {car.engine_power} KM /{' '}
          {car.transmission_type} / {car.drive}
        </CardDescription>
      </CardHeader>
      <CardFooter className="py-2 px-3 flex justify-between items-center">
        <Button onClick={handleViewDetails}>View Details</Button>
        <p className="text-m font-bold">{car.price} PLN</p>
      </CardFooter>
    </Card>
  )
}

export default CarCard
