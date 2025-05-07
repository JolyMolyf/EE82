import { CollectionConfig } from 'payload'

const Brands: CollectionConfig = {
  slug: 'car-brands' as const,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'Available models',
      type: 'relationship',
      relationTo: 'car-models',
      hasMany: true,
    },
  ],
  timestamps: true,
}

export default Brands
