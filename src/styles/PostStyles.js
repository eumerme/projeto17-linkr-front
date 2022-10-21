import styled from 'styled-components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useState } from 'react';
import { likes } from '../services/linkr';
import ReactTooltip from 'react-tooltip';

export default function PostStyles({id, img, user, text, likesUser, upload, setUpload}){

    const [clickLike, setClickLike] = useState({
        draw: <AiOutlineHeart color='#FFF' size='30px' />,
        type: false
    });

    function like(){
        if(clickLike.type === false){
            setClickLike({
                draw: <AiFillHeart color='red' size='30px' />,
                type: true
            });
            likes({
                id,
                type: 'like',
            }).then(() => {
                setUpload(!upload);
            }).catch((error) => {
                console.log(error.response.status);
            });

        }else{
            setClickLike({
                draw: <AiOutlineHeart color='#FFF' size='30px' />,
                type: false
            });
            likes({
                id,
                type: 'noLike',
            }).then(() => {
                setUpload(!upload);
            }).catch((error) => {
                console.log(error.response.status);
            });
        }
    };
    return (
        <>
        <Container>
            <Infos>
                <img src={img}/>
                <div onClick={() => like()}>
                    {clickLike.draw}
                </div>
                <p data-tip="hello word">{likesUser} likes</p><ReactTooltip backgroundColor='#FFFFFF' className='toopTip' place='bottom'/>
            </Infos>
            <Description>
                <h1>{user}</h1>
                <p>{text}</p>
                <div>
                
                </div>
            </Description>
        </Container>
        </>
    );
};

const Container = styled.div`
    margin-top: 30px;
    padding: 18px;
    width: 611px;
    background-color: #171717;
    height: 276px;
    border-radius: 16px;
    display: flex;

    @media screen and (max-width: 768px){
        width: 100%;
        border-radius: 0;
    }
`;

const Infos = styled.div`
    width: 50px;
    height: 100%;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
    }

    p{  
        margin-top: 5px;
        font-family: 'Lato', sans-serif;
        color: #FFFFFF;
        font-weight: 400;
        font-size: 11px;
    }

    .toopTip{
        border-radius: 3px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 11px;
        color: #505050;
    }
`;

const Description = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    h1{
        font-family: 'Lato', sans-serif;
        font-size: 22px;
        font-weight: 400;
        color: #FFFFFF;
        margin-bottom: 10px;
    }

    p{
        font-family: 'Lato', sans-serif;
        font-size: 17px;
        font-weight: 400;
        color: #B7B7B7;
        margin-bottom: 10px;
    }

    div{
        width: 100%;
        height: 100%;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
    }
`;