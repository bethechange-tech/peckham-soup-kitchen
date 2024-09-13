import { CollectionConfig } from "payload";

export const Applications: CollectionConfig = {
    slug: 'applications',
    admin: {
        useAsTitle: 'id',  // Use the unique application ID as the title in the admin panel
    },
    fields: [
        {
            name: 'job',
            type: 'relationship',
            relationTo: 'jobs',
            required: true,
        },
        {
            name: 'applicant',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    label: 'Pending',
                    value: 'pending',
                },
                {
                    label: 'Accepted',
                    value: 'accepted',
                },
                {
                    label: 'Rejected',
                    value: 'rejected',
                },
            ],
            defaultValue: 'pending',
        },
        {
            name: 'applicationDate',
            type: 'date',
            required: true,
            admin: {
                date: { pickerAppearance: 'dayOnly' },
            },
        },
    ],
};

