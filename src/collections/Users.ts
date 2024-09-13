import { CollectionConfig } from "payload";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import adminsAndUser from "./hooks/adminsAndUser";
import { admins } from "./hooks/admins";

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  access: {
    read: adminsAndUser,
    // create: admins,
    update: admins,
    delete: admins,
  },
  auth: {
    tokenExpiration: 28800, // 8 hours
    cookies: {
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      defaultValue: ["user"],
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "user",
          value: "user",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
  typescript: {
    interface: "users",
  },
};

export default Users;