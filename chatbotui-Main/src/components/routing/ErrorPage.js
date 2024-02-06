import React from 'react';
import { APP_ENV } from '../../clientConfig';

class ErrorPage extends React.Component {
  render() {
    const { error, errorInfo } = this.props;
    return (
      <div>
        <h1>Something Went Wrong! Please contact administrator</h1>
        <h4>URL: {window.location.href}</h4>
        {APP_ENV === 'development' && (
          <>
            <p>{error && error.toString()}</p>
            <pre>{errorInfo && errorInfo.componentStack}</pre>
          </>
        )}
      </div>
    );
  }
}

export default ErrorPage;
