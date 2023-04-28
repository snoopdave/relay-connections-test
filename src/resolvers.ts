import {connectionFromArraySlice, cursorToOffset} from 'graphql-relay';
import {users} from "./users";

const resolvers = {
    Query: {
        getUsers: (
            _: any,
            { first, after, last, before }: { first?: number; after?: string; last?: number; before?: string },
        ) => {
            const afterOffset = after ? cursorToOffset(after) + 1 : 0;
            const beforeOffset = before ? cursorToOffset(before) : undefined;

            const sliceStart = afterOffset;
            const sliceEnd = beforeOffset || users.length;

            const slice = users.slice(sliceStart, sliceEnd);

            const connection = connectionFromArraySlice(slice, { first, after, last, before }, {
                sliceStart,
                arrayLength: users.length,
            });

            console.log(`getUsers first=${first}`);
            return connection;
        },
    },
};

export { resolvers };
