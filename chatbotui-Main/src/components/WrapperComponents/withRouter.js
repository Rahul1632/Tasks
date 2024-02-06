// eslint-disable-next-line react/display-name
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

// eslint-disable-next-line react/display-name
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const location = useLocation();
  // const params = param && JSON.parse(param || {});
  const history = useNavigate();
  // etc... other react-router-dom v6 hooks

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <WrappedComponent {...props} history={history} params={params} location={location} />
  );
};
export default withRouter;
