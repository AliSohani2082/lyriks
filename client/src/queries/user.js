import { gql } from '@apollo/client'

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addClient(name: $name, email: $email, password: $password){
      id
      name
      email
      phone
    }
  }
`

export { ADD_USER }