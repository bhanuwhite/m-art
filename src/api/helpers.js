import axios from 'axios'
const url = process.env.REACT_APP_API_ENDPOINT
export const getApprovedPaintings = async() => {
    return await axios({
        method: 'GET',
        url: `${url}/collection/searchArt`
    }).then(res => res).catch(err => err)
}

export const signIn = async ({email, password}) => {
    return await axios({
      method: "post",
      url: `${url}/auth/login`,
      data: {
        userName: email,
        password: password,
      },
    });
  };
