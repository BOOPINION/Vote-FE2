import axios from 'axios';

type User = {
    userid: number;
    email: string;
    personalInfo: {
        gender: string;
        age: number;
    }
 };
 export const getUser = async <T = User>(): Promise<T> => {
	const { data } = await axios.get<T>('api');
  	return data;
};

export const patchUser = async <T = User>(updatedUserData: Partial<User>): Promise<T> => {
    const { data } = await axios.patch<T>('api', updatedUserData);
    return data;
};
