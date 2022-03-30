import {gql, GraphQLClient} from 'graphql-request'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Section from '../components/Section'
import Image from 'next/image'
import disneylogo from '../public/d.png'
import marvellogo from '../public/marvel.svg'
import nglogo from '../public/ng.svg'
import pixarlogo from '../public/pixar.svg'
import swlogo from '../public/sw.svg'



export const getStaticProps = async() =>{
  const url =process.env.ENDPOINT
  const graphQLClient =new GraphQLClient(url,{
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  })
const videosQuery =gql `
query{
  videos{
    createdAt,
    id,
    title,
    description,
    seen,
    slug,
    tags,
    thumbnail{
      url
    },
    mp4{
      url
    }
  }
}`

const accountQuery=gql `
query {
  account(where:{id:"cl1bpz2m40mqy0aodrjywynqj"}){
    username,
    avatar{
      url
    }
  }
}`


const data =await graphQLClient.request(videosQuery)
const videos=data.videos
const accountData = await graphQLClient.request(accountQuery)
const account =accountData.account
return {
  props:{
    videos,
    account
  }
}
}


const Home=({videos,account})=> {

  const randomVideo =(videos)=>{
    return videos[Math.floor(Math.random()*videos.length)]
  }

  const filterVideos =(videos,genre)=>{
    return videos.filter((video)=>video.tags.includes(genre))
  }

  const unSeenVideos =(videos)=>{
    return videos.filter(video => video.seen == false || video.seen == null)
  }


  return (
    <>
    <Navbar account={account}/>
    <div className="app">
      <div className="main-video">
        <img src={randomVideo(videos).thumbnail.url} 
        alt={randomVideo(videos).title} />
      </div>
      <div className="video-feed">
        <Link href="#disney"><div className="franchise" id="disney">
        <Image src={disneylogo} height={160} width={350}/></div></Link>
        <Link href="#pixar"><div className="franchise" id="pixar"><Image src={pixarlogo} height={160} width={350}/></div></Link>
        <Link href="#star-wars"><div className="franchise" id="star-wars"><Image src={swlogo} height={160} width={350}/></div></Link>
        <Link href="#nat-geo"><div className="franchise" id="nat-geo"><Image src={nglogo} height={160} width={350}/></div></Link>
        <Link href="#marvel"><div className="franchise" id="marvel"><Image src={marvellogo} height={160} width={350}/></div></Link>
      </div>
        <Section genre={'Recomended for you'} videos={unSeenVideos(videos)}/>
        <Section genre={'classic'} videos={filterVideos(videos,'classic')}/>
        <Section id="marvel" genre={'Marvel'} videos={filterVideos(videos,'marvel')}/>
        <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos,'pixar')}/>
        <Section id="disney"genre={'Disney'} videos={filterVideos(videos,'disney')}/>
        <Section id="star-wars"genre={'Star Wars'} videos={filterVideos(videos,'star-wars')}/>
        <Section id="nat-geo"genre={'National Geographic'} videos={filterVideos(videos,'nat-geo')}/>
    </div>
    </>
   )
}

export default Home;