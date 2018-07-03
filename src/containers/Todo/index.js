import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Mutation, Query } from 'react-apollo';

import {
  getTokenFromLocalStorage,
  deleteTokenFromLocalStorage,
} from '../../utils/authorization';
import query from './graphql/query.gql';
import checkMutation from './graphql/checkMutation.gql';
import uncheckMutation from './graphql/uncheckMutation.gql';
import addTodoMutation from './graphql/addTodoMutation.gql';
import deleteMutation from './graphql/deleteMutation.gql';
import Status from '../../components/Status';

@withRouter
class Todo extends Component {
  state = {
    value: '',
  };

  static get token() {
    return getTokenFromLocalStorage();
  }

  componentDidMount() {
    if (!Todo.token) {
      this.redirect();
    }
  }

  componentDidUpdate() {
    if (!Todo.token) {
      this.redirect();
    }
  }

  handleInputChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  redirect() {
    const { history } = this.props;

    history && history.push('/');
  }

  render() {
    return (
      <div>
        <Query query={query}>
          {queryProps => {
            const { loading, error, data } = queryProps;

            if (loading || error) {
              return <Status error={error} />;
            }

            return (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    deleteTokenFromLocalStorage();
                    this.redirect();
                  }}
                >
                  logout
                </button>
                <br />
                <input
                  value={this.state.value}
                  onChange={this.handleInputChange}
                />
                <Mutation
                  mutation={addTodoMutation}
                  update={(cache, { data: { createTodo } }) => {
                    const { todos } = cache.readQuery({ query });
                    cache.writeQuery({
                      query,
                      data: { todos: todos.concat([createTodo]) },
                    });
                  }}
                >
                  {(addTodo, { loading: muationLoading }) => {
                    if (muationLoading) {
                      return <Status />;
                    }

                    return (
                      <button
                        type="button"
                        onClick={() => {
                          addTodo({
                            variables: {
                              title: this.state.value,
                            },
                          });
                        }}
                      >
                        submit Todo
                      </button>
                    );
                  }}
                </Mutation>
                <ul>
                  {data.todos.map((todo, index) => (
                    <li key={`todo-${index}`}>
                      <span>
                        {todo.title}{' '}
                        {todo.checked ? (
                          <Mutation mutation={uncheckMutation}>
                            {(uncheck, { loading: muationLoading }) => {
                              if (muationLoading) {
                                return <Status />;
                              }

                              return (
                                <button
                                  type="button"
                                  onClick={() =>
                                    uncheck({
                                      variables: {
                                        id: todo.id,
                                      },
                                    })
                                  }
                                >
                                  <span role="img" aria-label="check">
                                    ✅
                                  </span>
                                </button>
                              );
                            }}
                          </Mutation>
                        ) : (
                          <Mutation mutation={checkMutation}>
                            {(check, { loading: muationLoading }) => {
                              if (muationLoading) {
                                return <Status />;
                              }

                              return (
                                <button
                                  type="button"
                                  onClick={() =>
                                    check({
                                      variables: {
                                        id: todo.id,
                                      },
                                    })
                                  }
                                >
                                  <span role="img" aria-label="check">
                                    ☑️
                                  </span>
                                </button>
                              );
                            }}
                          </Mutation>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <br />
                <Mutation
                  mutation={deleteMutation}
                  update={(cache, { data: { deleteTodos } }) => {
                    cache.writeQuery({
                      query,
                      data: { todos: deleteTodos },
                    });
                  }}
                >
                  {(deleteTodos, { loading: muationLoading }) => {
                    if (muationLoading) {
                      return <Status />;
                    }

                    return (
                      <button
                        type="button"
                        onClick={() =>
                          deleteTodos({
                            variables: {
                              ids: data.todos
                                .filter(todo => todo.checked)
                                .map(todo => todo.id),
                            },
                          })
                        }
                      >
                        <span role="img" aria-label="del">
                          ❌
                        </span>
                      </button>
                    );
                  }}
                </Mutation>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Todo;
