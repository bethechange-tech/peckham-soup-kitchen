import { getPayload } from "payload";
import { Config } from "payload";
import configPromise from "@payload-config";
import { cookies, headers } from "next/headers";
import { ControllerUtils } from "./controller-utils";

type ValueOf<T> = T[keyof T];

/**
 * Class responsible for handling payload-related operations.
 * Extends ControllerUtils for additional controller utilities.
 */
export class PayloadHandler extends ControllerUtils {
    constructor() {
        super();
    }

    /**
     * Retrieves payload using a provided configuration.
     *
     * @returns {Promise<BasePayload<GeneratedTypes>>} The payload obtained from the getPayload function.
     */
    static async getPayload() {
        return getPayload({ config: configPromise });
    }

    /**
     * Retrieves the 'payload-token' from cookies.
     *
     * @returns {string | undefined} The value of the 'payload-token' cookie, or undefined if not found.
     */
    static getToken() {
        const headersList = headers()
        const cookieStore = cookies();

        let token

        if (headersList?.get('authorization') && headersList?.get('authorization')?.startsWith('JWT')) {
            token = headersList?.get('authorization')?.split(' ')[1];
            console.info('Token extracted from authorization header', { token: token?.substring(0, 10) });
        }

        if (cookieStore.get("payload-token")?.value) {
            token = cookieStore.get("payload-token")?.value;
            console.info('Token extracted from cookies', { token: token?.substring(0, 10) });
        }

        return token;
    }

    /**
     * Retrieves a list of options from a specified collection based on a query matching a specific field.
     * This method is used to filter and format data from a dynamic database collection, where the items
     * are expected to contain a property that can be matched against a provided query string.
     *
     * @param {Object} params - The parameters for fetching options.
     * @param {keyof Config["collections"]} params.collection - The collection key from Config to query within.
     * @param {string} params.query - The query string used to match items in the specified collection.
     * @param {ValueOf<Config["collections"][typeof params.collection]>} params.field - The specific field within the collection to search against.
     * @returns {Promise<{label: string, value: string}[]>} Returns a promise that resolves to an array of objects, each containing a label and value based on the field specified.
     *
     * @example
     * // Assuming 'users' is a valid collection in Config with items having a 'username' field
     * PayloadHandler.queryOptions({
     *   collection: 'users',
     *   query: 'johndoe',
     *   field: 'username'
     * }).then(options => {
     *   console.log(options);
     *   // Output might be [{ label: 'johndoe', value: 'johndoe' }]
     * });
     */
    static async queryOptions({
        collection,
        query,
        field,
    }: {
        collection: keyof Config["collections"];
        query: string;
        field: ValueOf<Config["collections"][typeof collection]>;
    }): Promise<{ label: string; value: string }[]> {
        const payload = await PayloadHandler.getPayload();
        const data = await payload.find({
            collection,
            where: {
                or: [{ [field]: { like: `${query}%` } }],
            },
            limit: 10,
        });

        return (data.docs as any[])
            .sort((a, b) => {
                // Calculate similarity or closeness to the query and sort accordingly
                const regex = new RegExp(`^${query}`, "i"); // Case insensitive matching
                const isAStartsWith = regex.test(a[field]);
                const isBStartsWith = regex.test(b[field]);

                if (isAStartsWith && !isBStartsWith) {
                    return -1; // 'a' is closer to query, sort 'a' before 'b'
                } else if (!isAStartsWith && isBStartsWith) {
                    return 1; // 'b' is closer to query, sort 'b' before 'a'
                } else {
                    return a[field].localeCompare(b[field]); // Alphabetical sort if both are equal
                }
            })
            .reduce((acc, item) => {
                if (item?.[field]) {
                    acc.push({
                        label: item[field],
                        value: item[field],
                    });
                }
                return acc;
            }, [] as { label: string; value: string }[]);
    }

    static async createMany() { }
}