// @flow

declare type QueryProps<Data> = {
  data: Data,
  loading: boolean,
  error: Error,
};

declare type MutationProps<Data> = {
  data: Data,
  loading: boolean,
  error: Error,
};

declare type MutationFunction<Data> = ({ variables: Data }) => void;

declare type MutationResult = {
  success: boolean,
  errorMessage: string,
  errorCode: number,
  count: number,
};
