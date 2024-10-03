import { CollectionConfig } from "payload";
import { admins } from "./hooks/admins";

const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        read: () => true,
        create: admins,
        update: admins,
        delete: admins,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            unique: true,
        },
        {
            name: "description",
            type: "textarea",
            required: false,
        },
    ],
    timestamps: true,
    typescript: {
        interface: "Categories",
    },
};

export default Categories;
