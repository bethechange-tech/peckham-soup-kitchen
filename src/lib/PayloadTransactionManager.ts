import { BasePayload, BulkOperationResult, CollectionSlug, DataFromCollectionSlug, PayloadRequest, Where } from 'payload';
import { Config } from '@/payload-types';

type ValueOf<T> = T[keyof T];

/**
 * Manages transactions for Payload CMS operations, ensuring data consistency.
 */
export class PayloadTransactionManager {
    private payload: BasePayload;
    private req: PayloadRequest;

    /**
     * Initializes a new instance of the PayloadTransactionManager class.
     * @param payload - The Payload instance to manage transactions for.
     * @example
     * const payload = await PayloadHandler.getPayload();
     * const transactionManager = new PayloadTransactionManager(payload);
     */
    constructor(payload: BasePayload) {
        this.payload = payload;
        this.req = {} as PayloadRequest;
    }

    /**
     * Begins a new transaction.
     * @returns A promise that resolves when the transaction is successfully started.
     * @example
     * await transactionManager.begin();
     */
    public begin = async (): Promise<void> => {
        console.log("Attempting to begin transaction...");
        if (this.payload?.db?.beginTransaction) {
            const transactionID = await this.payload?.db?.beginTransaction();
            console.log("Transaction ID received:", transactionID);
            if (transactionID !== null && transactionID !== undefined) {
                this.req.transactionID = transactionID;
                console.log("Transaction begun with ID:", transactionID);
            } else {
                console.warn("Transaction ID is null or undefined.");
            }
        } else {
            console.warn("beginTransaction method is unavailable.");
        }
    }

    /**
     * Commits the current transaction.
     * @returns A promise that resolves when the transaction is successfully committed.
     * @example
     * await transactionManager.commit();
     */
    public commit = async (): Promise<void> => {
        console.log("Attempting to commit transaction...");

        if (this.req.transactionID && this.payload?.db?.commitTransaction) {
            await this.payload?.db?.commitTransaction(this.req.transactionID);
            console.log("Transaction committed with ID:", this.req.transactionID);
        } else {
            console.warn("No transaction ID found or commitTransaction method is unavailable.");
        }
    }

    /**
     * Rolls back the current transaction.
     * @returns A promise that resolves when the transaction is successfully rolled back.
     * @example
     * await transactionManager.rollback();
     */
    public rollback = async (): Promise<void> => {
        console.log("Attempting to rollback transaction...");
        if (this.req.transactionID && this.payload?.db?.rollbackTransaction) {
            await this.payload?.db?.rollbackTransaction(this.req.transactionID);
            console.log("Transaction rolled back with ID:", this.req.transactionID);
        } else {
            console.warn("No transaction ID found or rollbackTransaction method is unavailable.");
        }
    }

    /**
     * Creates a new document in the specified collection.
     * @param collection - The slug of the collection to create the document in.
     * @param data - The data for the new document.
     * @returns A promise that resolves with the created document.
     * @example
     * const newDocument = await transactionManager.create('my-collection', { name: 'Example' });
     */
    public create = async <T>(collection: CollectionSlug, data: T): Promise<DataFromCollectionSlug<CollectionSlug>> => {
        console.log(`Creating new document in collection: ${collection} with data:`, data);
        const result = await this.payload?.create({
            req: this.req,
            collection,
            data: data as any,
        });
        console.log("Document created:", result);
        return result;
    }

    /**
     * Updates an existing document in the specified collection.
     * @param collection - The slug of the collection to update the document in.
     * @param id - The ID of the document to update.
     * @param data - The data to update the document with.
     * @returns A promise that resolves with the updated document.
     * @example
     * const updatedDocument = await transactionManager.update('my-collection', 'document-id', { name: 'Updated Example' });
     */
    public update = async (collection: CollectionSlug, id: string, data: any): Promise<BulkOperationResult<CollectionSlug>> => {
        console.log(`Updating document in collection: ${collection}, ID: ${id}, with data:`, data);
        const result = await this.payload?.update({
            req: this.req,
            collection,
            where: {
                id: {
                    equals: id
                }
            },
            data,
        });
        console.log("Document updated:", result);
        return result;
    }

    /**
     * Deletes a document from the specified collection.
     * @param collection - The slug of the collection to delete the document from.
     * @param id - The ID of the document to delete.
     * @returns A promise that resolves when the document is successfully deleted.
     * @example
     * await transactionManager.delete('my-collection', 'document-id');
     */
    public delete = async (collection: CollectionSlug, id: string): Promise<void> => {
        console.log(`Deleting document from collection: ${collection}, ID: ${id}`);
        await this.payload?.delete({
            req: this.req,
            collection,
            id,
        });
        console.log("Document deleted.");
    }

    /**
     * Creates multiple documents in the specified collection.
     * @param collection - The slug of the collection to create documents in.
     * @param dataArray - An array of data for the new documents.
     * @returns A promise that resolves with the created documents.
     * @example
     * const newDocuments = await transactionManager.createMany('my-collection', [{ name: 'Example 1' }, { name: 'Example 2' }]);
     */
    public createMany = async (collection: CollectionSlug, dataArray: any[]): Promise<any[]> => {
        console.log(`Creating multiple documents in collection: ${collection} with data array:`, dataArray);
        const results = await Promise.all(dataArray.map(data => this.create(collection, data)));
        console.log("Multiple documents created:", results);
        return results;
    }

    /**
     * Updates multiple documents in the specified collection.
     * @param collection - The slug of the collection to update documents in.
     * @param updates - An array of objects containing the ID and data for each document to update.
     * @returns A promise that resolves with the updated documents.
     * @example
     * const updatedDocuments = await transactionManager.updateMany('my-collection', [{ id: 'doc1', data: { name: 'Updated 1' } }, { id: 'doc2', data: { name: 'Updated 2' } }]);
     */
    public updateMany = async (collection: CollectionSlug, updates: { id: string, data: any }[]): Promise<any[]> => {
        console.log(`Updating multiple documents in collection: ${collection} with updates:`, updates);
        const results = await Promise.all(updates.map(update => this.update(collection, update.id, update.data)));
        console.log("Multiple documents updated:", results);
        return results;
    }

    /**
     * Upserts a document in the specified collection.
     * If the document exists (based on the provided criteria), it updates the document with the provided data.
     * If the document does not exist, it creates a new document.
     * 
     * @param collection - The slug of the collection to upsert the document in.
     * @param criteria - The criteria to find the document by (e.g., { email: 'user@example.com' }).
     * @param data - The data to upsert (create or update). Note that this should be partial data to prevent overwriting fields.
     * @returns A promise that resolves with the upserted document.
     */
    public upsert = async <T>(
        collection: CollectionSlug,
        criteria: Where,
        data: Partial<T> // Use Partial to ensure only certain fields are updated
    ) => {
        console.log(`Upserting document in collection: ${collection} with criteria:`, criteria);

        // Search for the existing document
        const existingDocument = await this.payload.find({
            req: this.req,
            collection,
            where: criteria,
            limit: 1, // We only need to check for the existence of one document
        });

        if (existingDocument && existingDocument.docs && existingDocument.docs.length > 0) {
            // Document exists, so we update it
            const docId = existingDocument.docs[0].id as any;
            console.log(`Document found with ID: ${docId}, updating...`);
            delete (data as any)?.name

            // Perform a partial update to ensure existing fields aren't overwritten unless intended
            return this.payload.update({
                req: this.req,
                collection,
                id: docId,
                data: { ...existingDocument.docs[0], ...data } // Merge existing doc with new data
            });
        } else {
            // Document does not exist, so we create a new one
            console.log(`No document found matching criteria, creating a new document...`);
            return this.payload.create({
                req: this.req,
                collection,
                data,
            });
        }
    };


    /**
     * Deletes multiple documents from the specified collection.
     * @param collection - The slug of the collection to delete documents from.
     * @param ids - An array of IDs of the documents to delete.
     * @returns A promise that resolves when the documents are successfully deleted.
     * @example
     * await transactionManager.deleteMany('my-collection', ['doc1', 'doc2']);
     */
    public deleteMany = async (collection: CollectionSlug, ids: string[]): Promise<void[]> => {
        console.log(`Deleting multiple documents from collection: ${collection} with IDs:`, ids);
        const results = await Promise.all(ids.map(id => this.delete(collection, id)));
        console.log("Multiple documents deleted:", results);
        return results;
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
    async queryOptions({
        collection,
        query,
        field,
    }: {
        collection: CollectionSlug
        query: string;
        field: ValueOf<Config["collections"][typeof collection]>;
    }): Promise<{ label: string; value: string }[]> {
        console.log(`Querying options in collection: ${collection} with query: ${query} on field: ${field}`);
        const data = await this.payload?.find({
            collection,
            where: {
                or: [{ [field]: { like: `${query}%` } }],
            },
            limit: 10,
        });

        const options = (data.docs as any[])
            .sort((a, b) => {
                const regex = new RegExp(`^${query}`, "i");
                const isAStartsWith = regex.test(a[field]);
                const isBStartsWith = regex.test(b[field]);

                if (isAStartsWith && !isBStartsWith) return -1;
                if (!isAStartsWith && isBStartsWith) return 1;
                return a[field].localeCompare(b[field]);
            })
            .reduce((acc, item) => {
                if (item?.[field]) {
                    acc.push({
                        label: item[field],
                        value: item['id'],
                    });
                }
                return acc;
            }, [] as { label: string; value: string }[]);

        console.log("Options retrieved:", options);
        return options;
    }
}