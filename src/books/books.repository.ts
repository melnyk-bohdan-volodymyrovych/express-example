import {PrismaClient} from "@prisma/client";

export class BooksRepository {
    async findMany() {
        const client = new PrismaClient({log: [
                {
                    emit: 'stdout',
                    level: 'query',
                },
                {
                    emit: 'stdout',
                    level: 'error',
                },
                {
                    emit: 'stdout',
                    level: 'info',
                },
                {
                    emit: 'stdout',
                    level: 'warn',
                },
            ],})
        await client.$connect();
        const result = await client.book.findMany();
        await client.$disconnect()
        return result;
    }
}