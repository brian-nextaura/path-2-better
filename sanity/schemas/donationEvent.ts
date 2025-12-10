import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'donationEvent',
  title: 'Donation Event',
  type: 'document',
  fields: [
    defineField({
      name: 'sessionId',
      title: 'Stripe Session ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campaignSlug',
      title: 'Campaign Slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountCents',
      title: 'Amount (cents)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'donationType',
      title: 'Donation Type',
      type: 'string',
      options: {
        list: [
          { title: 'One-Time', value: 'one-time' },
          { title: 'Monthly', value: 'monthly' },
        ],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'campaignSlug',
      subtitle: 'sessionId',
    },
  },
});
