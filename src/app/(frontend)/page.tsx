'use client'
import React, { useState } from 'react'
import './styles.css'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multiselect'

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'Ruby',
  'PHP',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('error')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  return (
    <div className="home">
      <h1 className="text-3xl font-bold underline text-red-500">Hello world!</h1>
      <div>
        <Button>Click me</Button>
      </div>
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
        <Progress value={90} />
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            className={cn(
              'transition-colors',
              error && 'border-destructive focus-visible:ring-destructive',
            )}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </Popover>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <MultiSelect
        options={skillOptions}
        selected={selectedSkills}
        onChange={setSelectedSkills}
        placeholder="Select skills..."
      />
    </div>
  )
}
