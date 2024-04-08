import {Prisma, PrismaClient} from "@prisma/client";
import {prisma} from "@/prisma/prisma.client";


export class BooksRepository {
    constructor(private readonly client: PrismaClient = prisma) {
        console.log(`[BooksRepository] loaded`);
    }

    async findMany() {
        const result = await this.client.book.findMany({where: {deletedAt: null}});
        await this.client.$disconnect()
        return result;
    }

    async create({author, year, title}) {
        const result = await this.client.book.create({
            data: {author, year, title}
        });
        return result;
    }

    async update(bookId: number, {author, year, title}: Partial<Prisma.BookCreateInput>) {
        const result = await this.client.book.update({
            where: {id: bookId, deletedAt: null},
            data: {author, year, title, updatedAt: new Date()}
        });
        return result;
    }

    async delete(bookId: number) {
        const result = await this.client.book
            .update({
                where: {id: bookId, deletedAt: null},
                data:{deletedAt: new Date()}
            });
        return result;
    }
}