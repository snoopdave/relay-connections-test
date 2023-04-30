# relay-connections-test

Example project that shows how to test that a GraphQL API conforms to the Relay Connection pagination/cursor spec.

Currently a work in progress!

This project was generated almost entirely with ChatGPT 4. This is the prompt that I used to start the project:

I want to create a Typescript project that is a example of how to test a GraphQL server and verify that the server supports the Relay-Connections specification here: https://relay.dev/graphql/connections.htm

The project must meet these requirements:

It must provide a Jest test:
- The Jest test must start an Apollo server before running test
- The first Jest test must verify that all 100 users can be retrieved by the Relay React client which can be used as shown here https://relay.dev/docs/getting-started/step-by-step-guide/#step-5-fetching-a-query-with-relay  and must use `loadQuery` and `usePreloadedQuery` from `react-relay/hooks`
- There must also be a series of tests that verify that the getUsers query fully-conforms to the Relay-Connections specification
- Create a test plan for testing Relay-Connections conformance and provide complete implementations of every test in the plan
- The tests must verify that the cursors returned by the `getUsers` query are correct

The Apollo Server started by the Jest test:
- Must be started as shown here: https://github.com/snoopdave/blogql/blob/main/server/src/integration.test.ts#L48
- Must provide a GraphQL schema that defines a `User`  type with id, name, email address properties. The GraphQL schema must be read from a separate file called `schema.graphql` 
- Must provide a GraphQL query called `getUsers`  that returns a collection of users with Relay-Connection paging, by default this query returns  a maximum of 10 users at a time. Both forward and backward paging must be supported.
- When the Apollo Server starts, it must create a collection of 100 random users in-memory using Faker and these users must be returned when the getUsers query is called.
- Provide complete implementation of all GraphQL resolvers needed

The project must include a complete `package.json` file:
- The project must use `graphql@^15.0.0` 
- The project's `pacakge.json` file must include targets for running the tests and for running the relay compiler to generate TypeScript for the GraphQL queries and types using the schema from the `schema.graphql`
- The project must include Jest
- The `package.json` file must define a run script that will run a GraphQL linter on the `schema.graphql` file, and the linter must be configured to check for Relay-Connection conformance
- Review every import in the project and ensure there is a matching dependency for it in `package.json`

Next, generate a complete project by first displaying the project's directory structure and then providing the contents of each file. Try to minimize the number of files and directories.
