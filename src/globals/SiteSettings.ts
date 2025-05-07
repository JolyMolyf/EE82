import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'financingSettings',
      type: 'group',
      fields: [
        {
          name: 'defaultFinancingType',
          type: 'select',
          defaultValue: 'credit',
          options: [
            { label: 'Credit', value: 'credit' },
            { label: 'Leasing', value: 'leasing' },
          ],
        },
        {
          name: 'months',
          type: 'select',
          defaultValue: '24',
          options: [
            { label: '6 months', value: '6' },
            { label: '12 months', value: '12' },
            { label: '24 months', value: '24' },
            { label: '36 months', value: '36' },
          ],
        },
        {
          name: 'percentage',
          type: 'number',
          min: 15,
          max: 100,
          defaultValue: 15,
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          validate: (value: string | null | undefined) => {
            if (value && !value.includes('instagram.com')) {
              return 'Please enter a valid Instagram URL'
            }
            return true
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
          validate: (value: string | null | undefined) => {
            if (value && !value.includes('tiktok.com')) {
              return 'Please enter a valid TikTok URL'
            }
            return true
          },
        },
      ],
    },
    {
      name: 'contactMethods',
      type: 'group',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
          label: 'Phone Number',
          validate: (value: string | null | undefined) => {
            if (value && !/^\+?[\d\s-()]+$/.test(value)) {
              return 'Please enter a valid phone number'
            }
            return true
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Contact Email',
          validate: (value: string | null | undefined) => {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return 'Please enter a valid email address'
            }
            return true
          },
        },
      ],
    },
  ],
}

export default SiteSettings
