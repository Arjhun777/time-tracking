import React, { useState, useEffect } from 'react';
import { Button, CardContent, makeStyles, Card } from '@material-ui/core';
import { getDifference, getTime } from '../../utils/timer';

interface CardProps {
    index: number,
    id?: number,
    title?: string,
    startTime: Date,
    endTime: Date,
    tags: any,
    deleteTask: Function,
    queryTasks?: any,
    editCurrentTask: Function
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 500
    }
});

const CardComponent = (props:CardProps) => {
    const classes = useStyles();
    const [intervalIndex, setIntervalIndex] = useState(null);
    const [toggleTimer, setToggleTimer] = useState(false);

    useEffect(() => {
        clearInterval(intervalIndex);
        const timeDiff = getDifference(props.startTime, props.endTime);
        setIntervalIndex(getTime(timeDiff, `timer-wrapper-${props.id}`));
    }, [props.startTime, props.endTime]);

    const updatehandle = () => {
        props.editCurrentTask(props.index);
    }

    const deleteSelectedTask = () => {
        props.deleteTask({variables: {id: props.id}}).then((res:any) => {
            props.queryTasks.refetch();
        });
    }

    const handleToggleTimer = () => {
        const stateToChange = !toggleTimer;
        if(stateToChange) clearInterval(intervalIndex);
        else {
            // @ts-ignore
            const timeDiff = window?.timer[`timer-wrapper-${props.id}`];
            setIntervalIndex(getTime(timeDiff, `timer-wrapper-${props.id}`));
        }
        setToggleTimer(stateToChange);
    }

    return (
        <React.Fragment>
            <div className="card-wrapper">
                <Card className={classes.root}>
                    <CardContent className="card-content-wrapper">
                        <div className="card-section">
                            <div className="card-title-content">
                                <div className="card-content-title">Title: </div>
                                <div className="card-title">{props.title?.length ? props.title : '--'}</div>
                            </div>
                            <div className="card-title-content">
                                <div className="card-content-title">Tag: </div>
                                <div className="card-title">{props.tags?.name?.length ? props.tags.name : '--'}</div>
                            </div>
                            <Button variant="outlined" color="primary" onClick={updatehandle}>
                                EDIT
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={deleteSelectedTask}>
                                DELETE
                            </Button>
                            {props.startTime && props.endTime && 
                                <Button variant="outlined" color={toggleTimer ? "primary" : "secondary"} onClick={handleToggleTimer}>
                                    {toggleTimer ? 'START' : 'STOP'}
                                </Button>
                            }
                        </div>
                        <div className="timer-section">
                            <div>
                                <div className="card-content-title">Timer </div>
                                <div id={`timer-wrapper-${props.id}`}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default CardComponent;