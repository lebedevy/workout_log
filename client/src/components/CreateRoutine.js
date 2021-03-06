import React, { Component } from 'react';
import {
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Fab,
    Stepper,
    Step,
    StepLabel,
} from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddExerciseBar from '../components/AddExerciseBar';

import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import FitnessCenterRoundedIcon from '@material-ui/icons/FitnessCenterRounded';
import DragHandleIcon from '@material-ui/icons/DragHandle';

const Styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        margin: '5px',
    },
    title: {
        textAlign: 'center',
    },
    input: {
        background: '#ffffff',
    },
    setInput: {
        maxWidth: '140px',
    },
    exerciseRow: {
        display: 'flex',
        alignItems: 'center',
    },
    formControl: {
        minWidth: '120px',
        background: '#ffffff',
    },
    exerciseName: {
        flex: 1,
        margin: '0 10px',
        fontSize: '1.3em',
        fontWeight: '500',
    },
    noEntry: {
        width: '100%',
        margin: '20px 0',
        textAlign: 'center',
        width: '80%',
    },
    stepperButtons: {
        display: 'flex',
        justifyContent: 'center',
    },
});

const steps = ['Name Routine', 'Add Exercises'];

class CreateRoutine extends Component {
    state = { step: 0, routine: { name: '', weekday: '' } };

    updateField(field, value) {
        let { routine } = this.state;
        routine[field] = value;
        console.log(routine);
        this.setState({ routine });
    }

    handleBack() {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    handleNext() {
        const { step } = this.state;
        const { routine } = this.state;
        if (step === 0) {
            if (routine.name === '') return this.setState({ inputError: 'Name cannot be empty.' });
        }
        if (step === 1) {
            // Ensure at least one exercise
            // Ensure all exercises have a name
            // Ensuer all exercies have a min of 1 set
        }
        if (step === 2) {
        }
        this.setState({ step: step + 1, inputError: null });
    }

    render() {
        const { classes } = this.props;
        const { step, routine, inputError } = this.state;
        return (
            <div>
                <h1 className={classes.title}>Create new Routine</h1>
                {step === 0 ? (
                    <FirstStep
                        inputError={inputError}
                        classes={classes}
                        routine={routine}
                        updateField={(field, value) => this.updateField(field, value)}
                    />
                ) : null}
                {step === 1 ? (
                    <AddExercises
                        inputError={inputError}
                        classes={classes}
                        routine={routine}
                        updateField={(field, value) => this.updateField(field, value)}
                    />
                ) : null}
                {step < 2 ? (
                    <React.Fragment>
                        <Stepper activeStep={step}>
                            {steps.map((label, index) => {
                                return (
                                    <Step>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div className={classes.stepperButtons}>
                            <Button
                                disabled={step === 0}
                                onClick={() => this.handleBack()}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handleNext()}
                                className={classes.button}
                            >
                                {step === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <label>You have successfully created a new routine</label>
                        <div className={classes.stepperButtons}>
                            <Button
                                variant="contained"
                                color="primary"
                                href="/users/routines"
                                className={classes.button}
                            >
                                Done
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

class AddExercises extends Component {
    state = {
        exercises: [
            /*{ name: 'Test', type: 'weights' }*/
        ],
        addType: true,
    };

    deleteExercise(ind) {
        const { exercises } = this.state;
        if (exercises.length > 1) {
            let temp = exercises.slice();
            temp.splice(ind, 1);
            this.setState({ exercises: temp });
        }
    }

    addExercise(name, type) {
        const { exercises } = this.state;
        let temp = exercises.slice();
        temp.push({ name: name, sets: '', type });
        this.setState({ exercises: temp });
    }

    updateField(ind, field, value) {
        const { exercises } = this.state;
        if (field === 'sets') {
            console.log(value.split(''));
            if (value.split('').every(el => el.charCodeAt(0) > 47 && el.charCodeAt(0) < 58)) {
                console.log(true);
                exercises[ind][field] = value;
            }
        } else {
            console.log('here');
            exercises[ind][field] = value;
        }
        this.setState({ exercises });
    }

    render() {
        const { classes, routine } = this.props;
        const { exercises, addType } = this.state;
        const last = exercises.length === 1 ? true : false;
        return (
            <div>
                <h2 className={classes.title}>{`${routine.name}${
                    routine.weekday ? ` (${routine.weekday})` : ''
                }`}</h2>
                {exercises.length === 0 ? (
                    <label className={classes.noEntry}>
                        Add at least one exercise to your routine
                    </label>
                ) : null}
                {exercises.map((el, ind) => (
                    <div className={classes.exerciseRow}>
                        {/* <DragHandleIcon /> MAKE DRAGABLE */}
                        <label className={classes.exerciseName}>{el.name}</label>
                        {el.type === 'weights' ? (
                            <FitnessCenterRoundedIcon />
                        ) : (
                            <DirectionsRunRoundedIcon />
                        )}
                        <TextField
                            className={clsx(classes.input, classes.setInput)}
                            value={el.sets}
                            variant="outlined"
                            onChange={e => this.updateField(ind, 'sets', e.target.value)}
                            placeholder="Number of sets"
                            margin="dense"
                        />
                        <Button
                            disabled={last ? true : false}
                            onClick={() => this.deleteExercise(ind)}
                            startIcon={<DeleteIcon />}
                        ></Button>
                    </div>
                ))}
                <AddExerciseBar addExercise={(name, type) => this.addExercise(name, type)} />
            </div>
        );
    }
}

class FirstStep extends Component {
    render() {
        const { classes, inputError, routine, updateField } = this.props;
        const { name, weekday } = routine;
        console.log(inputError);
        return (
            <div className={classes.container}>
                <TextField
                    className={classes.input}
                    value={name}
                    onChange={e => updateField('name', e.target.value)}
                    error={!!inputError}
                    helperText={inputError}
                    label="Routine Name"
                    // variant="filled"
                    required
                />
                <FormControl className={classes.formControl} /*variant="filled"*/>
                    <InputLabel>Weekday</InputLabel>
                    <Select value={weekday} onChange={e => updateField('weekday', e.target.value)}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="mon">Monday</MenuItem>
                        <MenuItem value="tue">Tuesday</MenuItem>
                        <MenuItem value="wed">Wednesday</MenuItem>
                        <MenuItem value="thur">Thursday</MenuItem>
                        <MenuItem value="fri">Friday</MenuItem>
                        <MenuItem value="sat">Saturday</MenuItem>
                        <MenuItem value="sun">Sunday</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(Styles)(CreateRoutine);
