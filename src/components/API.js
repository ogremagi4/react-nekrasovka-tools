import axios from "axios";

function kebabCaseToCamel(str) {
  return str.replace(/(\-\w)/g, (matches) => matches[1].toUpperCase());
}

class API {
    constructor({ url }) {
      this.url = url;
      this.endpoints = {};
    }
  
    /**
     * Create and store a single entity's endpoints
     * @param {A entity Object} entity
     */
    createEntity(entity) {
      /**
       * If there is a - in the entity.name, then change it
       * to camelCase. E.g
       * ```
       * myApi.createEntity({ name : 'foo-bar'})
       * myApi.endpoints.fooBar.getAll(...)
       */
  
      const name = kebabCaseToCamel(entity.name);
      this.endpoints[name] = this.createBasicCRUDEndpoints(entity);
    }
  
    createEntities(arrayOfEntity) {
      arrayOfEntity.forEach(this.createEntity.bind(this));
    }
    /**
     * Create the basic endpoints handlers for CRUD operations
     * @param {A entity Object} entity
     */
    login = (username, password) => {
      return axios.post(
        `${this.url}/login`,
        {},
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
    };
    createBasicCRUDEndpoints({ name }) {
      var endpoints = {};
  
      const resourceURL = `${this.url}/${name}`;
  
      const headers = {}; //Authorization : `Bearer ${localStorage.id_token}`
  
      const config = {
        timeout: 120000,
      };
  
      endpoints.getAll = (params) => {
        return axios.get(resourceURL, { params: params, headers: headers });
      };
  
      endpoints.getOne = (id, params) =>
        axios.get(`${resourceURL}/${id}`, { params: params, headers: headers });
  
      endpoints.create = (params) => axios.post(resourceURL, params, {});
      endpoints.uploadFile = (formData) => axios.post(resourceURL, formData,{responseType:'blob'},
        {
          'Content-Type': 'multipart/form-data'
        }
    )
  
      endpoints.createOne = (id, params) =>
        axios.post(`${resourceURL}/${id}`, params, config);
  
      endpoints.update = (id, params) =>
        axios.put(`${resourceURL}/${id}`, params, config);
  
      endpoints.patch = ({ id }, toPatch, config = {}) =>
        axios.patch(`${resourceURL}/${id}`, toPatch, config);
  
      endpoints.delete = (id) => axios.delete(`${resourceURL}/${id}`, config);
  
      return endpoints;
    }
  }
  export default API;
  