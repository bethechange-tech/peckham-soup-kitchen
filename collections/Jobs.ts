import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
    slug: 'jobs',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'description',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'category',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        // {
        //     name: 'category',
        //     type: 'relationship',
        //     relationTo: 'categories',  // Referencing the Categories collection
        //     required: true,
        //     admin: {
        //         position: 'sidebar',
        //     },
        // },
        {
            name: 'price',
            type: 'number',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'city',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'years',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'image',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'applicants',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};



// charge per shortlist