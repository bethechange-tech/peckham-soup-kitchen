import { CollectionConfig } from "payload";
import { admins } from "./hooks/admins";

const Articles: CollectionConfig = {
    slug: "articles",
    access: {
        read: () => true,
        create: admins,
        update: admins,
        delete: admins,
    },
    fields: [
        {
            name: "id",
            type: "text",
            required: false,
        },
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
        },
        {
            name: "author",
            type: "text",
            required: true,
        },
        {
            name: "image",
            type: "text",
            required: true,
        },
        {
            name: "link",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
        },
        {
            name: "extendedDescription",
            type: "textarea",
            required: false,
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories", // Assume there is a collection named "categories"
            required: true,
        },
        {
            name: "date",
            type: "date",
            required: true,
        },
        {
            name: "published",
            type: "checkbox",
            label: "Published",
            defaultValue: false,
        },
    ],
    timestamps: true,
    typescript: {
        interface: "Articles",
    },
};

export default Articles;
