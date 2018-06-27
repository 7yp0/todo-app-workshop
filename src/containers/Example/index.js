// @flow
import React, { Component, type Node } from 'react';
import { Mutation, Query } from 'react-apollo';
import { connect } from 'react-redux';

import { doExampleOne as doExampleOneAction } from '../../actions/example';
import query from './graphql/query.gql';
import mutation from './graphql/mutation.gql';
import Status from '../../components/Status';

import type { AppState } from '../../reducers';
import type { Example } from '../../reducers/example';

type Props = {
  example?: Example,
  doExampleOne?: (test: string) => void,
};

type QueryData = {
  id: string,
  example: string,
  filter: {
    id: string,
    usw: string,
  },
};

type MutationData = {
  id: string,
  example: string,
  usw: string,
};

const mapStateToProps = (state: AppState) => ({
  example: state.example,
});

const mapDispatchToProps = {
  doExampleOne: doExampleOneAction,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ExampleContainer extends Component<Props> {
  render(): Node {
    // eslint-disable-next-line no-unused-vars
    const { example, doExampleOne } = this.props;

    return (
      <div>
        <span>here comes a query:</span>
        <Query query={query} variables={{ test: 'test' }}>
          {(queryProps: QueryProps<QueryData>) => {
            const { loading, error, data } = queryProps;

            if (loading || error) {
              return <Status error={error} />;
            }

            // eslint-disable-next-line no-console
            console.log(data);

            return (
              <div>
                <Mutation
                  mutation={mutation}
                  onCompleted={() => {}}
                  onError={() => {}}
                >
                  {(
                    myMutation: MutationFunction<{ test: string }>,
                    {
                      loading: mutationLoading,
                      error: mutationError,
                    }: MutationProps<MutationData>,
                  ) => {
                    if (mutationLoading || mutationError) {
                      return <Status error={mutationError} />;
                    }

                    return (
                      <button
                        type="button"
                        onClick={() => {
                          myMutation({ variables: { test: 'test' } });
                        }}
                      >
                        mutate
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

export default ExampleContainer;
