import styled from 'styled-components';

export default function SingUp(){
    return (
        <Container>
            <Infos>
                <h1>Linkr</h1>
                <p>save, share and discover<br/>the best links on the web</p>
            </Infos>
            <Auth></Auth>
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

const Auth = styled.div`
    width: 35%;
    min-height: 100vh;
    background-color: #333;
`;