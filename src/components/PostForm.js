import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm(){
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result){
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      proxy.writeQuery({ 
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts]
        }
      });
      values.body='';
    }
  });

  function createPostCallback(){
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='post text'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button
            type='submit'
            color='teal'
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {
        error && (
          <div className="ui errror message" style={{marginBottom: '20px'}}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )
      }
    </>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!){
    createPost(body: $body){
      id
      body
      createdAt
      username
      likeCount
      likes{
        id
        username
        createdAt
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`

export default PostForm;