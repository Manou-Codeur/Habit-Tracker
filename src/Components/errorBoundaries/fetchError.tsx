import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface MyState {
  error: boolean;
  errorMsg: string;
}

class FetchError extends Component<Props, MyState> {
  state: MyState = {
    error: false,
    errorMsg: "",
  };

  static getDerivedStateFromError(err: any) {
    return { error: true, errorMsg: err.message };
  }

  render() {
    const { error, errorMsg } = this.state;

    return error ? (
      <h1 style={{ textAlign: "center", marginTop: "3em" }}>{errorMsg}</h1>
    ) : (
      this.props.children
    );
  }
}

export default FetchError;
