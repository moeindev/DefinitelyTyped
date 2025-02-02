// Type definitions for multer-gridfs-storage 4.0
// Project: https://github.com/devconcept/multer-gridfs-storage
// Definitions by: devconcept <https://github.com/devconcept>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 4.1

import { EventEmitter } from "events";
import { Express } from "express";
import { Db, MongoClient } from "mongodb";
import { Connection, Mongoose } from "mongoose";
import * as Multer from "multer";

declare class Cache {
    initialize(opts: object): object;
    findUri(cacheName: string, url: string): string;
    has(cacheIndex: object): boolean;
    get(cacheIndex: object): object;
    set(cacheIndex: object, value: object): void;
    isPending(cacheIndex: object): boolean;
    isOpening(cacheIndex: object): boolean;
    resolve(cacheIndex: object, db: Db, client: MongoClient): void;
    reject(cacheIndex: object, err: Error): void;
    waitFor(cacheIndex: object): Promise<object>;
    connections(): number;
    remove(cacheIndex: object): void;
    clear(): void;
}

interface MulterGfsOptions {
    file?(req: Express.Request, file: Express.Multer.File): any;
}

declare class MulterGridfsStorage extends EventEmitter implements Multer.StorageEngine {
    db: Db;
    client: MongoClient;
    connected: boolean;
    connecting: boolean;
    configuration: MulterGridfsStorage.UrlStorageOptions | MulterGridfsStorage.DbStorageOptions;
    error: Error;
    caching: boolean;
    cacheName: string;
    cacheIndex: object;

    constructor(configuration: MulterGridfsStorage.UrlStorageOptions | MulterGridfsStorage.DbStorageOptions);

    _handleFile(
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error?: any, info?: Express.Multer.File) => void,
    ): void;

    _removeFile(req: Express.Request, file: Express.Multer.File, callback: (error: Error) => void): void;

    ready(): Promise<MulterGridfsStorage.ConnectionResult>;

    static cache: Cache;

    static generateBytes(): Promise<{ filename: string }>;
}

declare namespace MulterGridfsStorage {
    interface ConnectionResult {
        db: Db;
        client?: MongoClient | undefined;
    }

    interface UrlStorageOptions extends MulterGfsOptions {
        url: string;
        options?: any;
        cache?: boolean | string | undefined;
    }

    interface DbStorageOptions extends MulterGfsOptions {
        db: Mongoose | Connection | Db | Promise<Mongoose | Connection | Db>;
        client?: MongoClient | Promise<MongoClient> | undefined;
    }

    interface FileConfig {
        filename?: string | undefined;
        id?: any;
        metadata?: object | undefined;
        chunkSize?: number | undefined;
        bucketName?: string | undefined;
        contentType?: string | undefined;
        aliases?: string[] | undefined;
        disableMD5?: boolean | undefined;
    }
}

// Merge multer's file declaration with ours
declare global {
    namespace Express {
        namespace Multer {
            interface File {
                id: any;
                filename: string;
                metadata: any;
                contentType: string;
                chunkSize: number;
                bucketName: string;
                uploadDate: Date;
                md5: string;
                size: number;
            }
        }
    }
}

export = MulterGridfsStorage;
