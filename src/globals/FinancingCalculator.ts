import { GlobalConfig } from 'payload'

const FinancingCalculator: GlobalConfig = {
  slug: 'financing-calculator',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'calculatorSettings',
      type: 'group',
      fields: [
        {
          name: 'minDownPaymentPercentage',
          label: 'Minimum Down Payment Percentage',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          defaultValue: 15,
        },
        {
          name: 'maxFinancingPeriod',
          label: 'Maximum Financing Period (months)',
          type: 'number',
          required: true,
          min: 6,
          defaultValue: 36,
        },
        {
          name: 'interestRate',
          label: 'Annual Interest Rate (%)',
          type: 'number',
          required: true,
          min: 0,
          max: 30,
          defaultValue: 5.99,
          validate: (value: number | null | undefined) => {
            if (value && (value < 0 || value > 30)) {
              return 'Interest rate must be between 0% and 30%'
            }
            return true
          },
        },
        {
          name: 'type',
          label: 'Default Financing Type',
          type: 'select',
          required: true,
          defaultValue: 'credit',
          options: [
            { label: 'Credit', value: 'credit' },
            { label: 'Leasing', value: 'leasing' },
          ],
        },
      ],
    },
  ],
}

export default FinancingCalculator
