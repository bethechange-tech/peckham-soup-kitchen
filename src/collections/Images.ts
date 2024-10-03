import { CollectionConfig } from "payload";
import adminsAndUser from "./hooks/adminsAndUser";
import { admins } from "./hooks/admins";

const Images: CollectionConfig = {
  slug: "images",
  access: {
    read: adminsAndUser,
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
      name: "name",
      type: "text",
      unique: true
    },
    {
      name: "tag",
      type: "relationship",
      relationTo: 'tags',
      hasMany: true,
      required: false,
    },
    {
      name: "urls",
      type: "array",
      fields: [{
        name: "url",
        type: "text",
      }]
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
  ],
  timestamps: true,
  typescript: {
    interface: "images",
  },
};

export default Images;