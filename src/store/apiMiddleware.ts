import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';

const clients = {
  default: {
    client: axios.create({
      baseURL: 'https://cors-anywhere.herokuapp.com/https://api.stratascratch.com'
    }),
  }
};

const axiosMiddlewareOptions = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [{
      success: (state: any, req: any) => {
        const { StrataScratchReducer: { token } } = state.getState();

        if (token) { req.headers.Authorization = `Token ${token}`; }

        return req;
      },
    }]
  },
};

export default multiClientMiddleware(clients, axiosMiddlewareOptions);
