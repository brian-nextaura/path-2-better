export default {
  name: 'agency',
  title: 'Agency',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Agency Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
    },
    {
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Agency Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Pending Verification', value: 'pending' },
          { title: 'Inactive', value: 'inactive' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'verificationDate',
      title: 'Verification Date',
      type: 'datetime',
    },
    {
      name: 'campaignCount',
      title: 'Active Campaigns',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'totalRaised',
      title: 'Total Raised',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
