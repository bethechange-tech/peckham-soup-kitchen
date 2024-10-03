import { uploadFiles } from '../services/adapters';

/**
 * Class representing a file processor to handle file streaming and uploading.
 */
export class FileHandler {
    /**
     * Converts a ReadableStream into a Buffer.
     * @param {ReadableStream} stream - The stream to convert to a buffer.
     * @returns {Promise<Buffer>} A promise that resolves to the buffer containing the stream data.
     */
    async streamToBuffer(stream: ReadableStream): Promise<Buffer> {
        const reader = stream.getReader();
        const chunks: any[] = [];

        let done = false;
        let value: Uint8Array | undefined;

        while (!done) {
            ({ done, value } = await reader.read());
            if (value) {
                chunks.push(value);
            }
        }
        return Buffer.concat(chunks);
    }

    /**
     * Converts an array of File objects into an array of Buffers.
     * @param {File[]} fileData - An array of File objects to be processed.
     * @returns {Promise<Buffer[]>} A promise that resolves to an array of buffers.
     */
    async buildBuffer(fileData: File[]): Promise<Buffer[]> {
        const files: Buffer[] = [];

        for (const file of fileData) {
            const fileStream = file?.stream();
            const fileBuffer = await this.streamToBuffer(fileStream);
            files.push(fileBuffer);
        }

        return files;
    }

    /**
     * Generates files by uploading them.
     * @param {Buffer[]} files - An array of Buffers representing the files to be uploaded.
     * @returns {Promise<any>} A promise that resolves when the files are uploaded.
     */
    async generateFiles(files: Buffer[]): Promise<any> {
        return this.uploadFiles(files);
    }

    /**
     * Uploads files represented as buffers.
     * @private
     * @param {Buffer[]} files - An array of Buffers representing the files to be uploaded.
     * @returns {Promise<any>} A promise that resolves when the files are uploaded.
     */
    private async uploadFiles(files: Buffer[]): Promise<any> {
        // Assuming uploadFiles is defined here
        // Implementation of file upload logic
        return uploadFiles({ files })
    }
}

// // Example usage
// (async () => {
//     const processor = new FileHandler();
//     const fileData: File[] = [/* your files here */];
//     const buffers = await processor.buildBuffer(fileData);
//     const result = await processor.generateFiles(buffers);
//     console.log(result);
// })();
