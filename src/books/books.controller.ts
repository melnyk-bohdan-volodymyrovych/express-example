import {NextFunction, Request, Response} from "express";
import {BooksRepository} from "./books.repository";
import {BodySchema} from "@/books/body.schema";

let repository: BooksRepository;

export class BooksController {

    constructor(
        repositoryConstructor: {new(): BooksRepository}
    ) {
        repository = new repositoryConstructor();
        console.log(`[BooksController] loaded`);
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            let books = await repository.findMany();
            return res.status(200).send({books});
        } catch (err) {
            return next(err);
        }
    }

    async post({body}: Request, res: Response, next: NextFunction) {
        try {
            body = BodySchema.transform(body, );
            const book = await repository.create(body);
            return res
                .status(200).send({book});
        } catch (err) {
            return next(err);
        }
    }

    async put({params, body}: Request, res: Response, next: NextFunction) {
        const {bookId} = params;
        try {
            body = BodySchema.transform(body, false);
            let book = await repository.update(parseInt(bookId), body);
            return res
                .status(200).send({book});
        } catch (err) {
            return next(err);
        }
    }

    async del({params}: Request, res: Response, next: NextFunction) {
        const {bookId} = params;
        try {
            let book = await repository.delete(parseInt(bookId));
            return res
                .status(200).send({book});
        } catch (err) {
            return next(err);
        }
    }
};