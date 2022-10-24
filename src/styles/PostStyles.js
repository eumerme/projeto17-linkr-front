import styled from 'styled-components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { likes, listLikes } from '../services/linkr';
import ReactTooltip from 'react-tooltip';
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import EditPost from "../components/ChangePosts/EditPost";
import DeleteModal from "../components/ChangePosts/DeletePost";
import axios from 'axios';

export default function PostStyles({id, img, user, text, upload, setUpload, url, userId, name}){

    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [urlData, setUrlData] = useState({});
    const [ListLikes, setListLikes] = useState([]);
    const [clickLike, setClickLike] = useState({});
    const [msg, setMsg] = useState('');

    function openModal() {
      setIsOpen(true);
    }

    useEffect(() => {
        console.log('ata');
        axios.get(`https://api.microlink.io/?url=${url}`)
        .then((data) =>  {
            const auxData = data.data.data;
            setUrlData({
                title: auxData.title,
                description: auxData.description,
                image: auxData.image.url,
                url: auxData.url
            });
        }).catch((error) => {
            console.log(error);
        });
        
        listLikes(
            id,
        ).then((data) => {
            
            setListLikes(data.data[0]);
            if(data.data[0].likeBy !== null){
                const nameLike = (data.data[0].users.filter(value => value === userId))[0];
                if(nameLike){
                    setClickLike({
                        draw: <AiFillHeart color='red' size='30px' />,
                        type: true
                    });
                    const names = data.data[0].likeBy.filter(value => value !== name);
                    if(names.length !== 0){
                        if(data.data[0].likeBy.length === 2){
                            setMsg(`Você e ${names[0]} curtiram!`);
                        }else{
                            setMsg(`Você, ${names[0]} e outras ${(names.length) - 1} pessoas`);
                        }
                    }else{
                        setMsg(`Você curtiu!`);
                    }
                }else{
                    setClickLike({
                        draw: <AiOutlineHeart color='#FFF' size='30px' />,
                        type: false
                    })
                    if(data.data[0].likeBy.length === 2){
                        setMsg(`${data.data[0].likeBy[0]} e ${data.data[0].likeBy[1]} curtiram!`);
                    }else if(data.data[0].likeBy.length === 1){
                        setMsg(`${data.data[0].likeBy[0]} curtiu!`);
                    }
                    else{
                        setMsg(`${data.data[0].likeBy[0]}, ${data.data[0].likeBy[1]} e outras ${(data.data[0].likes) - 2} pessoas`);
                    }
                }
            }else{
                setClickLike({
                    draw: <AiOutlineHeart color='#FFF' size='30px' />,
                    type: false
                })
                setMsg('0 curtidas');
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [upload]);

    function like(){
        if(clickLike.type === false){
            likes({
                id,
                userId,
                type: 'like',
            }).then(() => {
                setClickLike({
                    draw: <AiFillHeart color='red' size='30px' />,
                    type: true
                });
                setUpload(!upload);
            }).catch((error) => {
                console.log(error.response.status);
            });

        }else{
            likes({
                id,
                userId,
                type: 'noLike',
            }).then(() => {
                setClickLike({
                    draw: <AiOutlineHeart color='#FFF' size='30px' />,
                    type: false
                });
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
                <p data-tip={msg}>{ListLikes.likes} likes</p><ReactTooltip backgroundColor='#FFFFFF' className='toopTip' place='bottom'/>
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
          <UrlDatas onClick={() => window.open(url, "_blank")}>
            <div>
                <h1>{urlData.title}</h1>
                <p>{urlData.description}</p>
                <h2>{urlData.url}</h2>
            </div>
            <div className='UrlImage'>
                <img src={urlData.image}/>
            </div >
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
    cursor: pointer;

    div{
        padding: 20px;
        width: 65%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1{
            font-family: "Lato", sans-serif;
            font-weight: 400;
            font-size: 16px;
            color: #CECECE;
        }

        p{
            font-family: "Lato", sans-serif;
            font-weight: 400;
            font-size: 11px;
            color: #9B9595;
        }

        h2{
            font-family: "Lato", sans-serif;
            font-weight: 400;
            font-size: 11px;
            color: #CECECE;
        }
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

    @media screen and (max-width: 768px) {

        justify-content: space-between;

        .UrlImage{
            width: 25%;
        }
        
        .UrlImage img{
            width: 50%;
            height: 50%;
        }
    }

`;
