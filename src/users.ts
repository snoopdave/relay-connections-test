import {faker} from "@faker-js/faker";

export type Users = {
    id: string;
    name: string;
    email: string;
};

export const users: Users[] = Array.from({ length: 100 }, () => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
}));

