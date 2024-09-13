import { CollectionConfig } from "payload";
import adminsAndUser from "./hooks/adminsAndUser";
import { admins } from "./hooks/admins";

const Tags: CollectionConfig = {
  slug: "tags",
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
      index: true
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
    interface: "tags",
  },
};

export default Tags;