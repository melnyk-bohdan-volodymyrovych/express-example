import {NextFunction, Request, Response} from "express";
import {BooksRepository} from "./books.repository";

export class BooksResolverFactory {
    private repository: BooksRepository;

    constructor(
        repositoryConstructor: {new(): BooksRepository}
    ) {
        this.repository = new repositoryConstructor();
    }

    get(req: Request, res: Response, next: NextFunction) {
        return this.repository.findMany()
            .then(books => res.status(200).send({books}))
            .catch(err => next(err))
    }

    post({body}: Request, res: Response, next: NextFunction) {
        return this.repository.create(body).then(book => res
            .status(200).send({book}))
            .catch(err => next(err));
    }

    put({body}: Request, res: Response, next: NextFunction) {
        return this.repository.update(body).then(book => res
            .status(200).send({book}))
            .catch(err => next(err));
    }

    del({body}: Request, res: Response, next: NextFunction) {}
}