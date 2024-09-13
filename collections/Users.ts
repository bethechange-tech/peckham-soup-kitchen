import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enables authentication on this collection
  admin: {
    useAsTitle: 'email', // The field used as the title in the admin panel
  },
  typescript: {
    interface: "users",
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true, // Optional: Prevent users from changing their email
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'applications',
      type: 'relationship',
      relationTo: 'applications',  // Referencing the Categories collection
      required: false,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'user-profiles',
      type: 'relationship',
      relationTo: 'user-profiles',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};