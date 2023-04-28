import {join} from "path";
import {readFileSync} from "fs";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {resolvers} from "./resolvers";

interface MyContext {}

let apolloServerUrl: string = '';
const schemaPath = join(__dirname, '..', 'schema.graphql');
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' });
let apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});
(async () => {
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 5001 }
    });
    console.log(`🚀  Server ready at ${url}`);
    apolloServerUrl = url;
})();