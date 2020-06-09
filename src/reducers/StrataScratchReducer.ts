import {
  FETCH_MODULES, FETCH_MODULES_FAIL, FETCH_MODULES_SUCCESS,
  FETCH_QUESTIONS, FETCH_QUESTIONS_FAIL, FETCH_QUESTIONS_SUCCESS,
  FILTER_TABLE_TOKEN, FILTER_TABLE_MODULE, FILTER_TABLE_STATUS
} from '../actions/StrataScratchActions';

const initialState = {
  token: '',
  isFetching: false,
  selectedModule: 56,
  selectedStatus: '',
  modules: [],
  questions: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MODULES: {
      return { ...state, isFetching: true };
    }

    case FETCH_MODULES_FAIL: {
      return { ...state, isFetching: false };
    }

    case FETCH_MODULES_SUCCESS: {
      const modules = action.payload.data.data;

      return {
        ...state,
        modules: modules,
        isFetching: false,
      };
    }

    case FETCH_QUESTIONS: {
      return { ...state, isFetching: true };
    }

    case FETCH_QUESTIONS_FAIL: {
      return { ...state, isFetching: false };
    }

    case FETCH_QUESTIONS_SUCCESS: {
      let questions = action.payload.data.results;

      if (state.selectedStatus === '0') {
        questions = questions.filter((question: any) => question.is_correct_solution === false);
      } else if (state.selectedStatus === '1') {
        questions = questions.filter((question: any) => question.is_correct_solution === true);
      } else {
        questions = questions.filter((question: any) => question.is_correct_solution === true || question.is_correct_solution === false);
      }

      return {
        ...state,
        questions: questions,
        isFetching: false,
      };
    }

    case FILTER_TABLE_TOKEN: {
      return {
        ...state,
        token: action.filterValue
      };
    }

    case FILTER_TABLE_MODULE: {
      return {
        ...state,
        selectedModule: action.filterValue
      };
    }

    case FILTER_TABLE_STATUS: {
      return {
        ...state,
        selectedStatus: action.filterValue
      };
    }

    default:
      return state;
  }
};
