import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(120),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      description: 'Agency-approved story (200-300 words)',
      validation: (Rule) => Rule.required().min(100).max(1000),
    }),
    defineField({
      name: 'goals',
      title: 'Goals',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'budgetBreakdown',
      title: 'Budget Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'amount',
              title: 'Amount',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'fundingGoal',
      title: 'Funding Goal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'amountRaised',
      title: 'Amount Raised',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Funded', value: 'funded' },
          { title: 'Graduated', value: 'graduated' },
        ],
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'housingStatus',
      title: 'Housing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unstable', value: 'unstable' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Stable', value: 'stable' },
        ],
      },
      description: 'Agency-verified housing stability status for impact reporting',
    }),
    defineField({
      name: 'employmentStatus',
      title: 'Employment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unemployed', value: 'unemployed' },
          { title: 'Training/Placement', value: 'training' },
          { title: 'Employed', value: 'employed' },
        ],
      },
      description: 'Agency-verified employment status for impact reporting',
    }),
    defineField({
      name: 'graduationDate',
      title: 'Graduation Date',
      type: 'datetime',
      description: 'Set when the pathway is considered completed/graduated',
    }),
    defineField({
      name: 'verifiedBy',
      title: 'Verified By',
      type: 'string',
      description: 'Agency staff member who verified the latest status/outcomes',
    }),
    defineField({
      name: 'verificationNotes',
      title: 'Verification Notes',
      type: 'text',
      rows: 3,
      description: 'Short notes about verification, safeguards, or concerns',
    }),
    defineField({
      name: 'agency',
      title: 'Agency',
      type: 'string',
      description: 'e.g., YES Shelter, Brock Mission, Fourcast',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updates',
      title: 'Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Update Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'firstName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Housing', value: 'Housing' },
          { title: 'Education', value: 'Education' },
          { title: 'Medical', value: 'Medical' },
          { title: 'Employment', value: 'Employment' },
          { title: 'Basic Needs', value: 'Basic Needs' },
        ],
      },
      description: 'Primary category for this campaign',
    }),
    defineField({
      name: 'daysLeft',
      title: 'Days Left',
      type: 'number',
      initialValue: 30,
      validation: (Rule) => Rule.required().min(0),
      description: 'Number of days remaining for this campaign',
    }),
    defineField({
      name: 'supportersCount',
      title: 'Supporters Count',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      description: 'Number of people who have donated to this campaign',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Campaign card cover image',
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'agency',
      media: 'profileImage',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: `${title} - ${status}`,
        subtitle,
        media,
      };
    },
  },
});
