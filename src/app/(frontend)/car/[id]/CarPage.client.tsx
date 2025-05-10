'use client'
import { Car, Media } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import { CarSpecPill } from '../../components/carSpectPill/CarSpecPill'
import { CreditCalculator } from '../../components/creditCalculator/CreditCalculator'

interface ICarPageClientProps {
    car: Car;
    interestRate: number;
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    blocks: {
      // myTextBlock is the slug of the block
      myTextBlock: ({ node }: { node: any }) => <div style={{ backgroundColor: 'red' }}>{node.fields.text}</div>,
    },
  })
  
const CAR_KEYS_TO_IGNORE = ['id', 'createdAt', 'updatedAt', 'status', 'images', 'description', 'title', 'price', 'is_promoted', 'view_count', 'is_new', 'car_main_image'];
export const CarPageClient = (props: ICarPageClientProps) => {
    const { car, interestRate } = props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [api, setApi] = useState<any>(null);

    // Handle thumbnail click to navigate to specific slide
    const handleThumbnailClick = (index: number) => {
        if (api) {
            api.scrollTo(index);
            setCurrentSlide(index);
        }
    };

    // Update current slide when carousel changes
    useEffect(() => {
        if (!api) return;
        
        const onSelect = () => {
            setCurrentSlide(api.selectedScrollSnap());
        };
        
        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api]);
    return (
        <div className='container mx-auto px-4 py-8 max-w-[1440px]'>
            <div>
                <div>
                    <Carousel 
                        className="w-18/20 m-auto"
                        setApi={setApi}
                    >
                        <CarouselContent>
                            {car.images?.map((carImage, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <img src={(carImage.image as Media).url ?? ''} alt={'some'} className='w-full aspect-video object-cover rounded-lg' />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                    </Carousel>
                    
                    {/* Image miniatures */}
                    <div className="w-18/20 m-auto flex flex-wrap gap-2 justify-start mt-2 px-1">
                        {car.images?.map((carImage, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className={cn(
                                    "p-0 h-10 w-12 overflow-hidden border-2",
                                    currentSlide === index ? "border-primary" : "border-transparent"
                                )}
                                onClick={() => handleThumbnailClick(index)}
                            >
                                <img 
                                    src={(carImage.image as Media).url ?? ''} 
                                    alt={`Thumbnail ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </Button>
                        ))}
                    </div>
                </div>
                <div className='w-18/20 m-auto'>
                    <div className='flex justify-between items-center mt-5'>
                        <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
                        <p className='text-2xl font-bold mb-2'>{car.price} PLN</p>
                    </div>
                    <div>
                        <p className='text-lg font-bold mt-2 mb-2'>Specyfikacja</p>
                        <div className='text-sm text-gray-800 prose flex flex-wrap'>
                            {Object.entries(car).map((spec) => {
                                const [key, value] = spec;
                                if(typeof spec[1] === 'object') {
                                    return [ key, value?.name];
                                }
                                return spec;
                            }).filter(([key, value]) => !['array', 'object'].includes(typeof value) && !CAR_KEYS_TO_IGNORE.includes(key)).map(([key, value]) => {
                                return (
                                    <CarSpecPill key={key} specName={key as keyof Car} specValue={value} />
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <p className='text-lg font-bold mt-2 mb-2'>Opis</p>
                        <div className='text-sm text-gray-800 prose'>
                            <RichTextWithoutBlocks converters={jsxConverters} data={car.description as SerializedEditorState} />
                        </div>
                    </div>
                    <div>
                        <p className='text-lg font-bold mt-2 mb-2'>Kalkulator kredytowy</p>
                        <div className='text-sm text-gray-800 prose'>
                            <CreditCalculator price={car.price} serverInterestRate={interestRate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarPageClient
