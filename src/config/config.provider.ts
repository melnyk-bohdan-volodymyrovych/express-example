import * as process from 'process';
import { resolve } from 'path';
import {configDotenv} from 'dotenv';

export class ConfigProvider {
    private constructor() {}

    private static isInitialized: boolean = false;
    private static init() {
        configDotenv({ path: resolve(process.cwd(), '.env') });

        ConfigProvider.isInitialized = true;
        console.log('[ConfigProvider] config loaded')
    }

    private static getEnvValue (value: string, defaultValue: string | null = null): string {
        if (!ConfigProvider.isInitialized) ConfigProvider.init()

        if (!(value in process.env) && !defaultValue) throw new Error(`Undefined dotenv value: ${value}`);

        return process.env[value] ?? defaultValue as string;
    }

    static get port(): string {
        return ConfigProvider.getEnvValue('PORT', '3000') ;
    }

    static get jwtSecret(): string {
        return ConfigProvider.getEnvValue('JWT_SECRET') ;
    }

    static get jwtTtl(): string {
        return ConfigProvider.getEnvValue('JWT_TTL') ;
    }
}