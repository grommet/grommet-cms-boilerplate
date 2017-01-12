class Requests {
  static async makeRequest(url, method, headers, body = {}) {
    let request = {
      mode: 'cors',
      method,
      headers
    };
    if (body !== {}) {
      request = {
        ...request,
        body
      };
    }
    const res = await fetch(url, request);
    return await res.json();
  }
  static makeHeaders(sessionToken) {
    const headers = new Headers();
    headers.append('sessionToken', sessionToken);
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  static get(url, sessionToken) {
    return new Promise(async (res, rej) => {
      const headers = Requests.makeHeaders(sessionToken);
      const json = await Requests.makeRequest(url, 'GET', headers);
      res(json);
    });
  }
  static post(url, sessionToken, body) {
    return new Promise(async (res, rej) => {
      const headers = Requests.makeHeaders(sessionToken);
      const json = await Requests.makeRequest(url, 'POST', headers, body);
      res(json);
    });
  }
  static put(url, sessionToken, body) {
    return new Promise(async (res, rej) => {
      const headers = Requests.makeHeaders(sessionToken);
      const json = await Requests.makeRequest(url, 'PUT', headers, body);
      res(json);
    });
  }
  static delete(url, sessionToken, body) {
    return new Promise(async (res, rej) => {
      const headers = Requests.makeHeaders(sessionToken);
      const json = await Requests.makeRequest(url, 'DELETE', headers, body);
      res(json);
    });
  }
}

export default Requests;
