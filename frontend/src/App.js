import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // usestate
  const [media, setMedia] = useState([]);
  const [userId, setUserId] = useState();

  // store data in backend
  const storeData = async (media) => {
    const { media_url, caption } = media;
    const res = await fetch("http://localhost:5000/media/postData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        img_url: media_url,
        caption,
      }),
    });
    console.log(res);
  };

  // get all photos
  const mediaAuth = async () => {
    const res = await fetch("http://localhost:5000/media/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      setMedia(data.message.data);
    } else {
      console.log("error");
    }
  };

  const Login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      sessionStorage.setItem("token", data.token);
      mediaAuth();
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    if (media.length === 0 && sessionStorage.getItem("token")) {
      mediaAuth();
    }
  }, []);

  return (
    <>
      {/* <div className="href"> */}
      {/* <a
        href='https://www.instagram.com/oauth/authorize?client_id=1159022101394813&redirect_uri=https%3A%2F%2Fhttpstat.us%2F200&scope=user_profile%2Cuser_media&response_type=code&logger_id=d6522885-a729-4336-b951-8f8ee34ef486'
        target='_blank'
        rel='noreferrer'
      
      >
        If User is not login first take auth (give access from your account)
      </a> */}
      {/* </div> */}
      <br />
      <br />

      <div>
        <form action=''>
          <label htmlFor=''>Enter user id</label>
          <br />
          <input type='text' placeholder='enter the access_key' onChange={(e) => setUserId(e.target.value)} /> <br />
          <button onClick={Login}>Login</button> <br />
        </form>
      </div>

      <div className='pictures'>
        {media.map((media) => (
          <img src={media.media_url} alt='zeeshan' width={300} height={300} onClick={() => storeData(media)} />
        ))}
      </div>
    </>
  );
}

export default App;
