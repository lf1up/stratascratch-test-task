import React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    loading: {
      marginTop: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }),
);

function MainTable(props: any) {
  const classes = useStyles();

  if (props.isFetching) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Question</TableCell>
            <TableCell align="right">Attempts</TableCell>
            <TableCell align="right">Is Correct?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.questions.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.question_short}
              </TableCell>
              <TableCell align="right">{row.attempts_count}</TableCell>
              <TableCell align="right">{row.is_correct_solution ? 'True' : 'False'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state: any) => ({
  ...state.StrataScratchReducer
});

export default connect(mapStateToProps, null)(MainTable);
