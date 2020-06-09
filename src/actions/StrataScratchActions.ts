export const FETCH_MODULES = 'FETCH_MODULES';
export const FETCH_MODULES_SUCCESS = 'FETCH_MODULES_SUCCESS';
export const FETCH_MODULES_FAIL = 'FETCH_MODULES_FAIL';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAIL = 'FETCH_QUESTIONS_FAIL';

export const FILTER_TABLE_TOKEN = 'FILTER_TABLE_AUTH_TOKEN';
export const FILTER_TABLE_MODULE = 'FILTER_TABLE_MODULE';
export const FILTER_TABLE_STATUS = 'FILTER_TABLE_STATUS';

export const fetchModules = () => ({
  types: [FETCH_MODULES, FETCH_MODULES_SUCCESS, FETCH_MODULES_FAIL],
  payload: {
    request: {
      method: 'GET',
      url: '/modules/',
    },
  },
});

export const fetchQuestions = (module: any) => ({
  types: [FETCH_QUESTIONS, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAIL],
  payload: {
    request: {
      method: 'GET',
      url: `/questions/?module=${module}&page_size=100`,
    },
  },
});

export const filterTable = (filterType: string, filterValue: string | number) => ({
  type: filterType,
  filterValue,
});
