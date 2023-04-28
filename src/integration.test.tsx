import fetch from 'cross-fetch';
import {Environment, Network, RecordSource, Store,} from 'relay-runtime';
import {QueryRenderer} from 'react-relay';
import {GET_USERS_QUERY} from './getUsers';
import {getUsersQuery, getUsersQuery$data} from './__generated__/getUsersQuery.graphql';
import React from 'react';
import {renderToString} from "react-dom/server";

const apolloServerUrl = 'http://localhost:5001';

describe('Testing GraphQL server with Relay-Connections', () => {

    test('Check if all 100 users are retrieved', async () => {
        const props = await renderTestComponent({first: 100});
        expect(props.getUsers.edges.length).toBe(100);
    });

    // test('Check if default 10 users are retrieved', async () => {
    //     const props = await renderTestComponent({});
    //     expect(props.getUsers.edges.length).toBe(10);
    // });

    function renderTestComponent({ first, after, last, before, }: {
        first?: number;
        after?: string;
        last?: number;
        before?: string;
    }): Promise<any> {
        return new Promise<getUsersQuery$data | null>(async (resolve, _) => {
            let results: getUsersQuery$data | null = null;

            const element = <QueryRenderer<getUsersQuery>
                environment={environment}
                query={GET_USERS_QUERY}
                variables={{first, after, last, before}}
                fetchPolicy={'store-and-network'}
                cacheConfig={{force: true}}

                render={({error, props, _}) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    if (props) {
                        results = props;
                        return <div>success</div>;
                    }
                    return <div>loading</div>;
                }}/>;

            renderToString(element);
            resolve(results);
        });
    }

    const environment: Environment = new Environment({
        configName: 'relay-connections-test',
        network: Network.create(fetchQuery),
        store: new Store(new RecordSource()),
    });

    async function fetchQuery(
        operation: any,
        variables: Record<string, any>,
    ): Promise<any> {
        const response = await fetch(apolloServerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: operation.text,
                variables,
            }),
        });
        console.log(`Response status ${response.status}`);
        return await response.json();
    }
});



