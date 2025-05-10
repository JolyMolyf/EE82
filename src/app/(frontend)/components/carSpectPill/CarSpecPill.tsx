import React from 'react'
import { Car } from '@/payload-types'
import moment from 'moment'
interface ICarSpecPillProps {
    specName: keyof Car;
    specValue: string;
}

const labelMap = {
    'fuel_type': 'Paliwo',
    'transmission_type': 'Skrzynia biegów',
    'drive': 'Napęd',
    'engine_power': 'Moc',
    'mileage': 'Przebieg',
    'color': 'Kolor',
    'engine_capacity': 'Pojemność silnika',
    'technical_inspection_date': 'Badanie Techniczne',
    'brand': 'Marka',
    'generation': 'Generacja',
    'year': 'Rok produkcji',
}

export const CarSpecPill = (props: ICarSpecPillProps) => {
    const { specName, specValue } = props;
    if (!specValue) return null;
    return (
        <div className='flex flex-row gap-2 bg-gray-100 rounded-xl p-[10px] w-fit my-2 mr-4'>
            <p className='capitalize'>{labelMap?.[specName as keyof typeof labelMap] || specName}:</p>
            <p>{ specName === 'technical_inspection_date' ? moment(specValue).format('DD.MM.YYYY') : specValue}</p>
        </div>
    )
}
