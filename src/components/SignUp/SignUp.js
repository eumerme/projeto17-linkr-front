import AuthSyles from "../../styles/AuthStyles";

export default function SingUp(){

    return (
        <>
            <AuthSyles>
                <input placeholder='e-mail'/>
                <input placeholder='password'/>
                <input placeholder='username'/>
                <input placeholder='picture url'/>
                <button>Sign Up</button>
                <p>Switch back to log in</p>
            </AuthSyles>
        </>
    );
}