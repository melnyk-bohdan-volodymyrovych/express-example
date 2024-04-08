import {PrismaClient} from "@prisma/client";



export class BooksRepository {
    constructor() {}


    async findMany() {
        const client = new PrismaClient();
        const result = await client.book.findMany({});
        await client.$disconnect()
        return result;
    }

    async create({author, year, title}) {
        const client = new PrismaClient();
        const result = await client.book.create({data: {author, year, title}});
        await client.$disconnect()
        return result;
    }

    async update({author, year, title}) {
        const client = new PrismaClient();
        const result = await client.book.update({data: {author, year, title}});
        await client.$disconnect()
        return result;
    }
}