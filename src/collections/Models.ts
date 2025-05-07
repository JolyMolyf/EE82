import { CollectionConfig } from 'payload'

const Models: CollectionConfig = {
  slug: 'car-models' as const,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand'],
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
      name: 'brand',
      type: 'relationship',
      relationTo: 'car-brands',
      required: true,
    },
    {
      name: 'Available generations',
      type: 'relationship',
      relationTo: 'car-generations',
      hasMany: true,
    },
  ],
  timestamps: true,
}

export default Models
