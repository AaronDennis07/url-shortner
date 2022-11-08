import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TextField, Button, Paper, Link, Modal, Backdrop, CircularProgress } from '@mui/material'
import { useState } from 'react'
const Home: NextPage = () => {

  const [isloading, setLoading] = useState(false)
  const [url,seturl] = useState({
    long_url:'',
    short_url:''
  })
  const [ishidden,setIshidden] = useState(true)
  
  const handleChange = (e)=>{
    seturl({
      ...url,
      long_url: e.target.value
    })
  }

  const onClick = (e)=>{
    setLoading(true) 
    setIshidden(true)
    fetch(`/api/gu?url=${url.long_url}`)
    .then((data)=>data.json())
    .then((data)=>{
      console.log(data)
      seturl({
        ...url,
        short_url:data.short_url
      })
    })
    setLoading(false)
    setIshidden(false)
  }

  const copy = (e)=>{

  navigator.clipboard.writeText(url.short_url);


  alert("Copied the text: " + url.short_url);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>URL Shortner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 style={{ textAlign: 'center' }}>URL Shortner</h1>
      </header>
      <section style={{ textAlign: 'center' }} >
        <h3>Paste the URL to be shortened</h3>
        <TextField id="outlined-basic" onChange={handleChange} sx={{ width: '90vw' }} placeholder='Enter the link here' variant="outlined" />
        <Button sx={{ marginTop: "1.5rem" }} onClick={onClick} disabled={url.long_url ? false: true} variant="contained">Shorten URL</Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isloading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
       
          <Paper hidden={ishidden} sx={{ minHeight: '120px', marginTop: '2rem' }} elevation={3} >
            <p>Shortened URL</p>
            <Link href={url.short_url}>{url.short_url}</Link>
            <br />
            <Button onClick={copy} className="copy" sx={{ marginTop: "1rem" }} variant="contained">Copy</Button>
          </Paper>
   

      </section>


    </div>
  )
}

export default Home
