import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimePicker from './TimePicker';

interface DialogBoxProps {
    open: boolean,
    setOpen: Function,
    selectedStartTime: Date,
    setSelectedStartTime: Function,
    selectedEndTime: Date,
    setSelectedEndTime: Function
}

export default function DialogBox(props:DialogBoxProps) {
  const [localStartTime, setLocalStartTime] = useState<Date | null>();
  const [localEndTime, setLocalEndTime] = useState<Date | null>();

  useEffect(() => {
	setLocalStartTime(props.selectedStartTime);
	setLocalEndTime(props.selectedEndTime);
  }, [props.selectedStartTime, props.selectedEndTime])
  
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = () => {
    if (localStartTime && localEndTime) {
		props.setSelectedStartTime(localStartTime)
		props.setSelectedEndTime(localEndTime);
		handleClose();
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Your Task Time</DialogTitle>
        <TimePicker label="Start Time" selectedTime={localStartTime} setSelectedTime={setLocalStartTime}/>
        <TimePicker label="End Time" selectedTime={localEndTime} setSelectedTime={setLocalEndTime}/>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}