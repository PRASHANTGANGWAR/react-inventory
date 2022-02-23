import axios from "axios";
import querystring from "querystring";
import { HOST } from "../../config/constants";

let config: any = {
  headers: { Accept: "application/json" },
};

class RestClient {
  /*************** POST Method ***********/
  static post(url: string, params = {}, token = null) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return new Promise(function (fulfill, reject) {
      axios
        .post(`${HOST}${url}`, params, config)
        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response && error.response.status === 401) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response && error.response.status === 403) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** PUT Method ***********/
  static put(url:string, params = {}, token = null) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return new Promise(function (fulfill, reject) {
      axios
        .put(`${HOST}${url}`, params, config)
        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response && error.response.status === 401) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response && error.response.status === 403) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** GET Method ***********/
  static get(url: string, params = {}, token = null) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    let query = querystring.stringify(params);
    return new Promise(function (fulfill, reject) {
      axios
        .get(`${HOST}${url}` + "?" + query, config)
        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response && error.response.status === 401) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response && error.response.status === 403) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** DELETE Method ***********/
  static delete(url: string, token = null) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return new Promise(function (fulfill, reject) {
      axios
        .delete(`${HOST}${url}`, config)
        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response && error.response.status === 401) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response && error.response.status === 403) {
            fulfill({ ...error.response.data, status: error.response.status });
          } else if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default RestClient;

