import { Helmet } from 'react-helmet'
import { Landing } from './pages/Landing'
import { useEffect } from 'react'
import { useState } from 'react'
import { urlUser } from './utils/urlStore'
import "toastify-js/src/toastify.css"
import axios from 'axios'

function App() {
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    try {
      axios(urlUser)
        .then(res => {
          setUserInfo(res.data.Users[0]);
          console.log(res.data.Users[0])
        })
    } catch (error) {
      console.log(error);
    }
    console.log(userInfo);
  }, [])

  return (
    <>
      {
        userInfo && <Helmet>
          {/* HTML Meta Tags */}
          <title>{userInfo.name} Portfolio</title>
          <meta name="description" content={userInfo.info} />

          {/* Facebook Meta Tags */}
          <meta property="og:url" content={'https://melani-vera.vercel.app'} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${userInfo.name} Portfolio`} />
          <meta property="og:description" content={userInfo.info} />
          <meta property="og:image" content={userInfo.profileImage} />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="melani-vera.vercel.app" />
          <meta property="twitter:url" content={'https://melani-vera.vercel.app'} />
          <meta name="twitter:title" content={`${userInfo.name} Portfolio`} />
          <meta name="twitter:description" content={userInfo.info} />
          <meta name="twitter:image" content={userInfo.profileImage} />
        </Helmet>
      }
      <Landing />
    </>
  )
}

export default App
