import {useContext, useEffect, useState} from 'react';
import FirebaseContext from 'context/firebase';

export default function useAuthListener() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')));
    const { authService } = useContext(FirebaseContext)

    useEffect(() => {
        const listener = authService.onAuthStateChanged(authUser => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        })
        return () => listener();
    }, [authService])

    return { user };

}
