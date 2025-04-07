import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({
  buttonTitle = 'Open Modal',
  modalTitle = 'Modal Title',
  modalSubtitle = 'This is a dynamic modal.',
  primaryAction = { label: 'Confirm', onClick: () => {} },
  secondaryAction = { label: 'Cancel', onClick: () => {} },
  setOpen = () => {},
  open
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalSubtitle}
          </Typography>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={() => { secondaryAction.onClick(); handleClose(); }}>
              {secondaryAction.label}
            </Button>
            <Button variant="contained" color="primary" onClick={() => { primaryAction.onClick(); handleClose(); }}>
              {primaryAction.label}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
