import styled from 'styled-components';

export default function SingUp(){
    return (
        <Container>
            <Infos>
                <h1>Linkr</h1>
                <p>save, share and discover<br/>the best links on the web</p>
            </Infos>
            <Form>
                <input placeholder='e-mail'/>
                <input placeholder='password'/>
                <input placeholder='username'/>
                <input placeholder='picture url'/>
                <button>Sign Up</button>
                <p>Switch back to log in</p>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
`;

const Infos = styled.div`
    width: 65%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 7%;
    background-color: #151515;
    color: #FFF;
    font-weight: 700;

    h1{
        font-family: 'Passion One', cursive;
        font-size: 106px;
    }

    p{
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
    }
`;

const Form = styled.form`
    width: 35%;
    min-height: 100vh;
    background-color: #333;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input{
        width: 100%;
        height: 65px;
        border-radius: 6px;
        background-color: #FFF;
        border: none;
        margin-bottom: 12px;
        padding-left: 15px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: 700;
        color: #9F9F9F;
        cursor: pointer;
    }

    input::placeholder{
        color: #9F9F9F;
        font-size: 27px;
    }

    button{
        width: 100%;
        height: 65px;
        background-color: #1877F2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: 700;
        color: #FFF;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        margin-bottom: 12px;
    }

    p{
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #FFF;
        text-decoration: underline;
        cursor: pointer;
    }
`;