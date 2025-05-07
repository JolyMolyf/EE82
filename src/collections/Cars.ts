import { CollectionConfig } from 'payload'

const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: 'model',
    defaultColumns: ['brand', 'model', 'year', 'price', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brand',
      type: 'text',
      required: true,
    },
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'generation',
      type: 'text',
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'promotion_price',
      type: 'number',
      min: 0,
    },
    {
      name: 'vin',
      type: 'text',
      unique: true,
    },
    {
      name: 'mileage',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'engine_power',
      type: 'number',
      min: 0,
    },
    {
      name: 'fuel_type',
      type: 'select',
      required: true,
      options: [
        { label: 'Petrol', value: 'petrol' },
        { label: 'Diesel', value: 'diesel' },
        { label: 'Electric', value: 'electric' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'LPG', value: 'lpg' },
      ],
    },
    {
      name: 'transmission_type',
      type: 'select',
      required: true,
      options: [
        { label: 'Manual', value: 'manual' },
        { label: 'Automatic', value: 'automatic' },
        { label: 'Semi-automatic', value: 'semi-automatic' },
      ],
    },
    {
      name: 'engine_capacity',
      type: 'number',
      min: 0,
    },
    {
      name: 'technical_inspection_date',
      type: 'date',
    },
    {
      name: 'color',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'is_new',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'car-categories',
      required: true,
    },
    {
      name: 'view_count',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'is_promoted',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'car_main_image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the car',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        return {
          ...data,
          updated_at: new Date(),
        }
      },
    ],
  },
  timestamps: true,
}

export default Cars
