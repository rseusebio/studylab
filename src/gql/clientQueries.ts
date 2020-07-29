import { gql } from 'apollo-boost';

export const ZOOM = gql`
    query getZoom {
        zoom @client
    }
`;

export const MUTATE_ZOOM = gql`
    query mutateZoom (increment: Int!, operation: String!)
    {
        zoom (increment: $increment, operation: $operation) @client
    }
`;