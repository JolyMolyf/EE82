import { CollectionConfig } from 'payload'

const CarCategories: CollectionConfig = {
  slug: 'car-categories',
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
      name: 'description',
      type: 'textarea',
    },
  ],
}

export default CarCategories
