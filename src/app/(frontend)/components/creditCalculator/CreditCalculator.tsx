import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Content } from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"

interface CreditCalculatorProps {
    price: number;
    serverInterestRate: number;
}

export const CreditCalculator = ({ price, serverInterestRate }: CreditCalculatorProps) => {
    const [downPayment, setDownPayment] = useState(price * 0.2);
    const [loanTerm, setLoanTerm] = useState(24);
    const [interestRate, setInterestRate] = useState<number>(serverInterestRate);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleCalculate = () => {
        const totalAmount = price - downPayment;
        const percentInterestRate:number = interestRate / 100;
        const monthlyPayment = totalAmount * (percentInterestRate / 12) * Math.pow(1 + percentInterestRate / 12, loanTerm) / (Math.pow(1 + percentInterestRate / 12, loanTerm) - 1);
        setMonthlyPayment(monthlyPayment);
        setTotalPayment(monthlyPayment * loanTerm);
        setTotalInterest(totalPayment - totalAmount);
    }

    useEffect(() => {
        handleCalculate();
    }, [price, downPayment, loanTerm, interestRate]);

    return (
        <div>
            <Card className='px-0 py-7'>
                <CardContent className='flex flex-row flex-wrap gap-5 justify-between items-center px-5 m-auto w-full'>
                    <div className=''>
                        <p className='text-2xl font-bold mb-2'>Parametry finansowania</p>
                        <div className='w-2xs mt-5'>
                            <p className='mb-2 text-lg font-bold'>Cena pojazdu</p>
                            {/* <p className='text-m'>{price} PLN</p> */}
                            <Input type="number" value={price} disabled />
                        </div>
                        <div className='w-2xs mt-5 '>
                            <p className='mb-2 text-lg font-bold'>Oprocentowanie</p>
                            <Input type="number" disabled value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                        </div>
                        <div className='w-2xs mt-5'>
                            <p className='mb-2 text-lg font-bold'>Kwota własna</p>
                            <Input type="number" min={price * 0.2} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
                        </div>
                        <div className='w-2xs mt-5'>
                            <p className='mb-2 text-lg font-bold'>Okres finansowania: <span className='text-3xs font-normal'>{loanTerm} miesięcy</span></p>
                            <Slider defaultValue={[12]} min={6} max={24} step={6} onValueChange={(value) => setLoanTerm(value[0])} />

                        </div>
                    </div>
                    <div className='h-fit text-center'>
                        <Card className='p-10 w-2xs'>
                            <p className='mb-2 text-2xl font-bold'>Rata Miesięczna</p>
                            <p className='text-xl'>{monthlyPayment.toFixed(2)} PLN brutto</p>
                        </Card>
                        
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
