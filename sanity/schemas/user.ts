export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      hidden: true,
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'User Role',
      type: 'string',
      options: {
        list: [
          { title: 'Donor', value: 'donor' },
          { title: 'Agency Admin', value: 'agency_admin' },
          { title: 'Platform Admin', value: 'platform_admin' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'agencyId',
      title: 'Associated Agency',
      type: 'reference',
      to: [{ type: 'agency' }],
      hidden: true,
    },
    {
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'emailPreferences',
      title: 'Email Preferences',
      type: 'object',
      fields: [
        {
          name: 'donationConfirmations',
          title: 'Donation Confirmations',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'campaignUpdates',
          title: 'Campaign Updates',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'platformNews',
          title: 'Platform News & Features',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'recurringReminders',
          title: 'Monthly Subscription Reminders',
          type: 'boolean',
          initialValue: true,
        },
      ],
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
