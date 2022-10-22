import styled from 'styled-components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { likes } from '../services/linkr';
import ReactTooltip from 'react-tooltip';
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import EditPost from "../components/ChangePosts/EditPost";
import DeleteModal from "../components/ChangePosts/DeletePost";
import axios from 'axios';

export default function PostStyles({id, img, user, text, likesUser, upload, setUpload, url}){

    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [urlData, setUrlData] = useState({});

    function openModal() {
      setIsOpen(true);
    }

    useEffect(() => {
        axios.get(`https://api.microlink.io/?url=${url}`)
        .then((data) =>  {
            const auxData = data.data.data;
            setUrlData({
                title: auxData.title,
                description: auxData.description,
                image: auxData.image.url
            });
        }).catch((error) => {
            console.log(error);
        });
    }, []);

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
                <span>
                    <h1>{user}</h1>
                    <h3>
                    <TiPencil
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsEditing(!isEditing)}
                    />
                    <FaTrash style={{ cursor: "pointer" }} onClick={openModal} />
                    </h3>
                </span>
          {isEditing ? (
            <EditPost
              id={id}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              text={text}
              upload={upload}
              setUpload={setUpload}
            />
          ) : (
            <p>{text}</p>
          )}
          <UrlDatas>
            <div>a</div>
            <div className='UrlImage'>
                <img src={urlData.image}/>
            </div >
            {/* <p>{urlData.title}</p>
            <p>{urlData.description}</p>
            <img src={urlData.image}/> */}
          </UrlDatas>
            </Description>
        </Container>
        <DeleteModal
        upload={upload}
        setUpload={setUpload}
        id={id}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        />
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

  @media screen and (max-width: 768px) {
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
        object-fit: cover;
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

  span {
    font-family: "Lato", sans-serif;
    font-size: 22px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    h3 {
      width: 50px;
      display: flex;
      justify-content: space-between;
    }
  }

  p {
    font-family: "Lato", sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: #b7b7b7;
    margin-bottom: 10px;
  }

`;

const UrlDatas = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    display: flex;

    div{
        padding: 20px 0 20px 20px;
        width: 65%;
    }

    .UrlImage{
        width: 35%;
        border-left: 1px solid #4D4D4D;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;

        img{
            width: 150px;
            height: 150px;
        }
    }
`;
