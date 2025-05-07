'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Car, Media } from '@/payload-types'
import Image from 'next/image'
interface ICarCardProps {
  car: Car
}

const CarCard = (props: ICarCardProps) => {
  const { car } = props
  console.log(car)
  return (
    <Card>
      <Image
        src={(car.car_main_image as Media)?.url ?? (car?.images?.[0]?.image as Media)?.url ?? ''}
        width={300}
        height={300}
        alt={`${car.brand} ${car.model} ${car.generation} main image`}
      />
      <CardHeader>
        <CardTitle>{car.brand}</CardTitle>
        <CardDescription>
          {car.model} {car.generation}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  )
}

export default CarCard
