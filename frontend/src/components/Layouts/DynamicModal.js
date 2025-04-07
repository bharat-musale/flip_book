import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DynamicModal = ({ open, onClose=()=>{}, title, children, actions=true, onDownload=()=>{}, download }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
      {download && (
          <>
            <Button onClick={onDownload} color="primary">
              Download
            </Button>
          </>
        )}
        {actions && (
          <>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DynamicModal;
