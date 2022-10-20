import styled from 'styled-components';

export default function PostStyles({img, user, text}){
    return (
        <>
        <Container>
            <Infos>
                <img src={img}/>
            </Infos>
            <Description>
                <h1>{user}</h1>
                <p>{text}</p>
                <div></div>
            </Description>
        </Container>
        </>
    );
};

const Container = styled.div`
    padding: 18px;
    width: 611px;
    background-color: #171717;
    height: 276px;
    border-radius: 16px;
    display: flex;
`;

const Infos = styled.div`
    width: 50px;
    height: 100%;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`;

const Description = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1{
        font-family: 'Lato', sans-serif;
        font-size: 22px;
        font-weight: 400;
        color: #FFFFFF;
    }

    p{
        font-family: 'Lato', sans-serif;
        font-size: 17px;
        font-weight: 400;
        color: #B7B7B7;
    }

    div{
        width: 100%;
        height: 155px;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
    }
`;