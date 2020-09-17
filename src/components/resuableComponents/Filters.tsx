import { Button, Dialog, DialogActions, Input, DialogTitle, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import TimePicker from './TimePicker';

interface FilterProps {
    open: boolean
    setFilterOpen: Function
    filterSubmit: Function,
    tags: any
}

export default function Filters(props:FilterProps) {
    const [localStartTime, setLocalStartTime] = useState<Date | null>();
    const [localEndTime, setLocalEndTime] = useState<Date | null>();
    const [filterTitle, setFilterTitle] = useState('');
    const [filterTag, setFilterTag] = useState<{name?: string, id?: number}>({});

    const handleClose = () => {
        props.setFilterOpen(false);
    }
    
    const handleSubmit = () => {
        props.filterSubmit({start_time: localStartTime, end_time: localEndTime, title: filterTitle, tags: filterTag});
        handleClose();
    }

    const queryTagsHandle = (event:any, options:Object) => {
        setFilterTag(options);
    }

    return (
        <React.Fragment>
            <Dialog className="filter-dialog" open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xl'}>
                <DialogTitle id="form-dialog-title">Apply your filter here</DialogTitle>
                <Input placeholder="Filter By Name" onChange={(e:any) => setFilterTitle(e.target.value)} value={filterTitle} />
                <Autocomplete
                    id="combo-box"
                    options={props.tags.data?.tags || []}
                    getOptionLabel={(option:any) => option.name}
                    style={{ width: 250 }}
                    onChange={queryTagsHandle}
                    value={filterTag}
                    renderInput={(params:any) => <TextField {...params} label="Tags" variant="outlined" />}
                />
                <TimePicker label="Start Time" selectedTime={localStartTime} setSelectedTime={setLocalStartTime}/>
                <TimePicker label="End Time" selectedTime={localEndTime} setSelectedTime={setLocalEndTime}/>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}