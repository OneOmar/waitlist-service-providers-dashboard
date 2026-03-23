import type { WaitlistRow } from '@/types/waitlist'

const templates: WaitlistRow[] = [
  {
    id: '1',
    email: 'jonesadam@gmail.com',
    phone: '+44 20 7946 0958',
    postcode: 'SW1A 1AA',
    vendorType: 'Independent',
    serviceOffering: 'Housekeeping',
    signupDate: '15/03/2024',
    status: 'Onboarded',
  },
  {
    id: '2',
    email: 'sarah.mitchell@outlook.com',
    phone: '+44 161 496 0356',
    postcode: 'M1 1AE',
    vendorType: 'Company',
    serviceOffering: 'Window Cleaning',
    signupDate: '02/03/2024',
    status: 'Rejected',
  },
  {
    id: '3',
    email: 'david.oconnor@yahoo.com',
    phone: '+44 121 496 0123',
    postcode: 'B1 1AA',
    vendorType: 'Independent',
    serviceOffering: 'Car Valet',
    signupDate: '28/02/2024',
    status: 'Onboarded',
  },
  {
    id: '4',
    email: 'emma.watson@gmail.com',
    phone: '+44 20 7123 4567',
    postcode: 'E1 6AN',
    vendorType: 'Company',
    serviceOffering: 'Housekeeping',
    signupDate: '20/02/2024',
    status: 'none',
  },
  {
    id: '5',
    email: 'liam.brown@icloud.com',
    phone: '+44 131 496 0100',
    postcode: 'EH1 1YZ',
    vendorType: 'Independent',
    serviceOffering: 'Window Cleaning',
    signupDate: '12/02/2024',
    status: 'Onboarded',
  },
  {
    id: '6',
    email: 'olivia.taylor@proton.me',
    phone: '+44 20 7555 0199',
    postcode: 'N1 9GU',
    vendorType: 'Independent',
    serviceOffering: 'Housekeeping',
    signupDate: '05/02/2024',
    status: 'Rejected',
  },
]

export const WAITLIST_PAGE_SIZE = 5

export const waitlistMockRows: WaitlistRow[] = Array.from(
  { length: 25 },
  (_, i) => {
    const t = templates[i % templates.length]!
    return {
      ...t,
      id: String(i + 1),
      email: i < templates.length ? t.email : `user${i + 1}@example.com`,
    }
  },
)
