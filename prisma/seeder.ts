import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const bookData: Prisma.BookCreateInput[] = [{
    title: "The Golden Bug",
    author: "E.A. Poe",
    year: 2014
}];

async function main() {
    console.log(`Start seeding ...`)
    for (const book of bookData) {
        const user = await prisma.book.create({
            data: book,
        })
        console.log(`Created book with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });