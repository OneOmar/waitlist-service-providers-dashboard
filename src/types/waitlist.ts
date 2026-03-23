export type WaitlistRecordType = 'serviceProviders' | 'customers'

export type WaitlistStatus = 'Onboarded' | 'Rejected' | 'none'

export type VendorType = 'Independent' | 'Company'

export type WaitlistRow = {
  id: string
  email: string
  phone: string
  postcode: string
  vendorType: VendorType
  serviceOffering: string
  signupDate: string
  status: WaitlistStatus
}
