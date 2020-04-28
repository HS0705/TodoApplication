import axios from 'axios';

export const register = (newUser) => {
      return axios.post('http://localhost:5000/tasks/users/register', {
        fname:newUser.fname,
        lname:newUser.lname,
        email:newUser.email,
        password:newUser.password
    })
    .then((res) => {
        console.log("Registered!", res.data)
    })
    .catch((err) => {
        console.log(err.res)
    })
}


export const login = (user) => {
     return axios.post('http://localhost:5000/tasks/users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        console.log(res.data)
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err.res)
    })
}
