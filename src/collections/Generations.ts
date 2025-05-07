import { CollectionConfig } from 'payload'

const Generations: CollectionConfig = {
  slug: 'car-generations' as const,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'model'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'yearStart',
      type: 'number',
    },
    {
      name: 'yearEnd',
      type: 'number',
    },
  ],
  timestamps: true,
}

export default Generations
