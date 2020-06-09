import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { FILTER_TABLE_TOKEN, FILTER_TABLE_MODULE, FILTER_TABLE_STATUS } from '../../actions/StrataScratchActions'
import { fetchModules, fetchQuestions, filterTable } from '../../actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginBottom: 15
    },
    filter: {
      minWidth: 250,
      marginTop: 15,
      marginRight: 15
    },
    button: {
      marginTop: 15,
      height: 56
    }
  }),
);

function TableFilters(props: any) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Auth Token"
        variant="outlined"
        className={classes.filter}
        value={props.token}
        onChange={(event) => props.filterTable(FILTER_TABLE_TOKEN, event.target.value)}
        disabled={props.isFetching}
      />
      <FormControl variant="outlined" className={classes.filter} disabled={props.isFetching}>
        <InputLabel id="demo-simple-select-outlined-label">Module</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.selectedModule}
          onChange={(event) => props.filterTable(FILTER_TABLE_MODULE, event.target.value)}
          label="Module"
        >
          {props.modules.map((module: any) => (
            <MenuItem key={module.id} value={module.id}>{module.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.filter} disabled={props.isFetching}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.selectedStatus}
          onChange={(event) => props.filterTable(FILTER_TABLE_STATUS, event.target.value)}
          label="Status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"1"}>Sovled</MenuItem>
          <MenuItem value={"0"}>Incorrect</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        className={classes.button}
        disabled={props.isFetching}
        onClick={() => props.fetchQuestions(props.selectedModule)}
      >
        Refresh
      </Button>
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  ...state.StrataScratchReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchModules: () => dispatch(fetchModules()),
  fetchQuestions: (module: any) => dispatch(fetchQuestions(module)),
  filterTable: (filterType: string, filterValue: string) => dispatch(filterTable(filterType, filterValue)),
  dispatch: (action: any) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(TableFilters);
