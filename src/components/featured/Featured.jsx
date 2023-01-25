import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import "./featured.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Featured({ type ,setGenre}) {
  const [content,setContent]= useState({});

  useEffect(()=>{
    let cancel = false;// doing this to prevent React memory leak warning
    const getRandomContent = async()=>{
      try{
        const res = await axios.get(`https://netflix-api-nurw.onrender.com/api/movie/random?type=${type}`,
          {headers:{
            token: "Bearer "+  JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        return res;
      }catch(err){
        console.log(err);
      }
    }
    getRandomContent().then((res)=>{
      if(cancel){
        return;
      }else{
        setContent(res.data[0]);
      }
    });
    return ()=>{
      cancel = true;
    }
  },[type]);

  return (
    <div className="featured">
      {type && (
        <div className="category" style={{zIndex:999}}>
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={(e)=>setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">adventure</option>
            <option value="comedy">comedy</option>
            <option value="crime">crime</option>
            <option value="fantasy">fantasy</option>
            <option value="historical">historical</option>
            <option value="horror">horror</option>
            <option value="romance">romance</option>
            <option value="sci-fi">sci-fi</option>
            <option value="thriller">thriller</option>
            <option value="western">western</option>
            <option value="animation">animation</option>
            <option value="drama">drama</option>
            <option value="documentary">documentary</option>
          </select>
        </div>
      )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
        <img
          src={content.imgTitle}
          alt=""
        />
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <Link to={{      pathname: "/watch",
      search: "?"+content?.video,
      hash: "#the-hash",
      data:{"data":"certain"},
      state:"hello from state",}} style={{textDecoration:"none"}}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
