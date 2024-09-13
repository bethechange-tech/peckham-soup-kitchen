
import { CollectionConfig } from "payload";

export const UserProfiles: CollectionConfig = {
    slug: 'user-profiles',
    admin: {
        useAsTitle: 'fullName',
    },
    fields: [
        {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true,
        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            required: true,
        },
        {
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            hooks: {
                beforeChange: [
                    ({ data }: any) => {
                        if (data.firstName && data.lastName) {
                            data.fullName = `${data.firstName} ${data.lastName}`;
                        }
                    },
                ],
            },
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone Number',
            required: true,
        },
        {
            name: 'city',
            type: 'text',
            label: 'City',
            required: true,
        },
        {
            name: 'jobTitle',
            type: 'text',
            label: 'Job Title',
            required: true,
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
            name: 'experience',
            type: 'textarea',
            label: 'Work Experience',
            required: true,
        },
        {
            name: 'education',
            type: 'textarea',
            label: 'Education',
            required: true,
        },
        {
            name: 'skills',
            type: 'textarea',
            label: 'Skills',
            required: true,
        },
        {
            name: 'bio',
            type: 'textarea',
            label: 'Bio',
            required: true,
        },
        {
            name: 'profilePicture',
            type: 'text',
            required: true,
        },
    ],
};

