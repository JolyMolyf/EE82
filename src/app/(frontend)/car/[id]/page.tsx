import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import CarPageClient from './CarPage.client'

export const SingleCarPage = async ({ params }: { params: { id: string } }) => {
    const { id } =await params;
    const payload = await getPayload({config})
    const car = await payload.find({
        collection: 'cars',
        where: {
            id: { equals: id }
        }
    }).then((res) => res.docs[0])

    const interestRate = await payload.findGlobal({
        slug: 'site-settings'
    }).then((res) => res.financingSettings?.percentage)

    return (
        <div>
            <CarPageClient car={car} interestRate={interestRate ?? 30} />
        </div>
    )
}

export default SingleCarPage
