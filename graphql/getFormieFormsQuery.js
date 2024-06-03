import { gql } from 'graphql-tag'

export const GetFormieFormsQuery = gql`
  query GetFormieForms {
    formieForms {
      id
      handle
      uid
      title
    }
  }
`
