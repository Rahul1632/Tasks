// eslint-disable-next-line react/display-name
import { useForm } from 'react-hook-form';

// eslint-disable-next-line react/display-name
const withUseFormHook = (WrappedComponent) => (props) => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'all' });
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <WrappedComponent {...props} register={register} errors={errors} />
  );
};
export default withUseFormHook;
