import {Router} from "express";
import {authGuard} from "@/auth";
import {JwtAuthStrategy} from "@/auth/jwt-auth.strategy";
import {BooksController} from "./books.controller";
import {BooksRepository} from "./books.repository";


export const booksRouter = Router();

const resolver = new BooksController(BooksRepository);

/**
* @openapi
* /books/:
*   get:
*     tags:
*       - "Books"
*     summary:
*       Returns a list of all the books.
*     responses:
*        '200':
*           description: OK
*        '500':
*           description: Internal server error
*/
booksRouter.get('/', resolver.get)

/**
 * @openapi
 * /books/:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "Books"
 *     summary:
 *       Post a book.
 *     parameters:
 *       - name: author
 *         description: Author of the book.
 *         required: true
 *         in: formData
 *         type: string
 *         default: "E.A. Poe"
 *       - name: title
 *         description: Title of the book.
 *         required: true
 *         in: formData
 *         type: string
 *         default: "The Golden Bug"
 *       - name: year
 *         description: Year when the book was published.
 *         required: true
 *         in: formData
 *         type: number
 *         default: 2024
 *     responses:
 *       '201':
 *          description: Created
 *       '400':
 *          description: Bad request
 *       '401':
 *          description: Unauthorized
 *       '500':
 *          description: Internal server error
 */

booksRouter.post('', authGuard(JwtAuthStrategy),  resolver.post)

/**
 * @openapi
 * /books/{bookId}:
 *  put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "Books"
 *     summary:
 *       Update a book.
 *     parameters:
 *       - name: bookId
 *         description: Id of book to delete
 *         in: path
 *         required: true
 *         type: number
 *       - name: author
 *         description: Author of the book.
 *         required: false
 *         in: formData
 *         type: string
 *         default: "E.A. Poe"
 *       - name: title
 *         description: Title of the book.
 *         required: false
 *         in: formData
 *         type: string
 *         default: "The Golden Bug"
 *       - name: year
 *         description: Year when the book was published.
 *         required: false
 *         in: formData
 *         type: number
 *         default: 2024
 *     responses:
 *       '200':
 *          description: Ok
 *       '204':
 *          description: Record to update not found.
 *       '400':
 *          description: Bad request
 *       '401':
 *          description: Unauthorized
 *       '500':
 *          description: Internal server error
 */
booksRouter.put('/:bookId', authGuard(JwtAuthStrategy),  resolver.put)

/**
 * @openapi
 * /books/{bookId}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "Books"
 *     summary:
 *       Delete a book.
 *     parameters:
 *       - name: bookId
 *         description: Id of book to delete
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *          description: Ok
 *       '204':
 *          description: Record to update not found
 *       '401':
 *          description: Unauthorized
 *       '500':
 *          description: Internal server error
 */
booksRouter.delete('/:bookId', authGuard(JwtAuthStrategy), resolver.del);
