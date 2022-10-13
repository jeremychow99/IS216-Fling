import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";


export function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.email = "";
            this.password = "";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ":" + errorMessage);
        });
}

export function logout() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
        })
        .catch((error) => {
            console.log(error);
        });
}