import ApiManager from './ApiManager';

export const user_login = async data => {
    //intentamos hacer la peticion post 
    try {
        const result = await ApiManager('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });
        return result;
    } 
    
    catch (error) {
       return error.response.data;
    }
};