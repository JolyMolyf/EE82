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
      type: 'relationship',
      relationTo: 'car-brands' as const,
      required: true,
    },
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'car-models' as const,
      required: true,
      admin: {
        condition: (data) => Boolean(data.brand),
      },
      filterOptions: ({ data }) => {
        if (!data.brand) return true

        return {
          brand: {
            equals: data.brand,
          },
        }
      },
    },
    {
      name: 'generation',
      type: 'relationship',
      relationTo: 'car-generations' as const,
      admin: {
        condition: (data) => Boolean(data.model),
      },
      filterOptions: async ({ data, req }) => {
        if (!data.model) return true

        // Fetch the selected model to get its available generations
        try {
          const model = await req.payload.findByID({
            collection: 'car-models',
            id: data.model,
            depth: 0, // We don't need to populate the relationships
          })

          if (
            model &&
            model['Available generations'] &&
            model['Available generations'].length > 0
          ) {
            return {
              id: {
                in: model['Available generations'],
              },
            }
          }
        } catch (error) {
          console.error('Error filtering generations:', error)
        }

        return true
      },
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
