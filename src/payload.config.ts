// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import Users from './collections/Users'
import Tags from './collections/Tags'
import Images from './collections/Images'
import Articles from './collections/Articles'
import Categories from './collections/Categories'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const initAdmin = () => {
  if (
    process.env.DEFAULT_ADMIN_USERNAME &&
    process.env.DEFAULT_ADMIN_PASSWORD
  ) {
    return {
      async onInit(payload: any) {
        const existingUsers = await payload.find({
          collection: "users",
          limit: 1,
        });

        // portalPermissionsTravellerTracker
        if (existingUsers.docs.length === 0) {
          await payload.create({
            collection: "users",
            data: {
              email: process.env.DEFAULT_ADMIN_USERNAME,
              password: process.env.DEFAULT_ADMIN_PASSWORD,
              name: "Admin",
            },
          });
        }
      },
    };
  }

  return {};
};

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Tags,
    Images,
    Articles,
    Categories
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  // ...initAdmin(),
  onInit: async (payload) => {
    // if (
    //   process.env.DEFAULT_ADMIN_USERNAME &&
    //   process.env.DEFAULT_ADMIN_PASSWORD
    // ) {
    //   return;
    // };

    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    });

    // portalPermissionsTravellerTracker
    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: process.env.DEFAULT_ADMIN_USERNAME!,
          password: process.env.DEFAULT_ADMIN_PASSWORD,
          name: "Admin",
          roles: []
        },
      });
    }
  },
  plugins: [],
})