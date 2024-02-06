import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SuccessAlert = ({ successAlert, handleAlertClose }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      handleAlertClose();
    }, 5000);

    return () => clearTimeout(id);
  }, [handleAlertClose]);

  return (
    <>
      {successAlert?.showAlert && (
        <Snackbar open={successAlert.showAlert} autoHideDuration={6000} onClose={handleAlertClose}>
          <MuiAlert severity={successAlert.alertSeverity} onClose={handleAlertClose} elevation={6} variant='filled'>
            {successAlert.alertMessage}
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
};

export default SuccessAlert;
