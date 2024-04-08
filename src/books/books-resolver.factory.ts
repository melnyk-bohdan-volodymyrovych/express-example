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
        res.send({id: 1, ...body})
    }

    put(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({message: 'ok'})
    }

    del(req: Request, res: Response, next: NextFunction) {}
}