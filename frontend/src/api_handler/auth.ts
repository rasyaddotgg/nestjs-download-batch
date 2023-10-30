import { auth } from 'src/config';
import { axiosInstanceUam } from 'src/utils/axios';

export function preauthenticate(code: string) {
  const data = {
    ...auth,
    code: code,
  };
  return axiosInstanceUam.post('/addon/composite/user/preauthenticate', {
    data: JSON.stringify(data),
  });
}

export type loginType = {
  username: string;
  password: string;
  //   code: string;
  //   application?: string;
  //   secret?: string;
};

export function login(params: loginType) {
  let data: any = params;
  data = {
    // "code" : params.code,
    username: params.username,
    password: params.password,
    // "application":auth.application,
    // "secret":auth.secret
  };
  //   return axiosInstanceUam.post('/addon/composite/user/authenticate', {
  //     data: JSON.stringify(data),
  //   });
  return axiosInstanceUam.post('', {
    data: JSON.stringify(data),
  });
}

// export function login(params :  loginType){
//     let data = {
//         "code" : params.code,
//         "password": params.password,
//         "application":auth.application,
//         "secret":auth.secret
//     }

//     const form = new FormData();
//     form.append("data",JSON.stringify(data))
//     return axiosInstanceUam.post('/addon/composite/user/authenticate',form);
// }
