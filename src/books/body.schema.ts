export class BodySchema{
    static title = {
        transform: (value) => String(value),
        message: 'title must be a string',
    };

    static author = {
        transform: (value) => String(value),
        message: 'title must be a string',
    };

    static year = {
        transform:(value) => parseInt(value),
        message: 'year must be an int number',
    };

    static transform(body: object, toPartial: boolean = false): Partial<Record<keyof BodySchema, any >> {
        const transformedBody = Object.keys(BodySchema)
        .reduce(
            (acc, key) => {
                if(!toPartial && !body[key]) throw {
                    name: 'BodyParsingError',
                    message: BodySchema[key].message,
                };
              acc[key] = BodySchema[key].transform(body[key]);
              return acc;
            },
            {}
        );

        if (Object.keys(transformedBody).length === 0) throw {
            name: 'BodyParsingError',
            message: 'Body is empty',
        };

        return transformedBody;
    }
}
