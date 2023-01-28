import  Image  from 'next/image';
import { Select, Space } from 'antd';
import { Carousel } from 'antd'
import React, { useEffect, useState, useRef } from "react";
import clock from '../public/clock.png';
import main1 from '../public/main1.png'
import main2 from '../public/main2.png'
import main3 from '../public/main3.png'
import main4 from '../public/main4.png'
import {VscSearch} from 'react-icons/vsc'
import slider2 from '../public/slidernew.webp'
import bish from '../public/bish.png'
import nomad from '../public/nomad.jpg'
import isyklake from '../public/isyklake.jpg'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';


// export const getServerSideProps = async () => {
//     const req = await fetch('https://jsonplaceholder.typicode.com/users')
//     const res = await req.json()

//     if (!res) {
//         return {
//             notFound: true
//         }
//     }
//     return {
//         props: { users: res }
//     }
// }




const  Main = ({messages}) => {

    
    const onCategoryChange = (value) => {
    console.log(`selected ${value}`);
    };
    
    const router = useRouter(),
     locale = router.locale;
    const [search, setSearch] = useState('')
    const [oneDay, setOneDay] = useState('')
    const [searchCategory, setSearchCategory] = useState('')

        const [tours, setTours] = useState()
        const [places, setPlaces] = useState([])
        const [categories, setCategories] = useState([])
    useEffect(()=>{
        const fetchdata = async () => {
            const req = await fetch(`http://127.0.0.1:8000/${locale }/api/v1/tours/?is_draft=false&is_top=true`)
            const res = await req.json()
            setTours(res.data)
        }
        fetchdata()
        const fetchCategories = async () => {
            const req = await fetch(`http://127.0.0.1:8000/${locale || 'ru'}/api/v1/categories/`)
            const res = await req.json()
            setCategories(res?.data)
        }
        fetchCategories()
        const fetchPlaces = async () => { 
            const req = await fetch(`http://127.0.0.1:8000/${locale || 'ru'}/api/v1/places/?limit=3`)
            const res = await req.json()
            setPlaces(res.data.results)
        }

        fetchPlaces()
    },[])
    console.log(categories);

    const videoBg = '/ktour.mp4'

    return(
        <>
        <Head>
            <title> Boogoo || Главная страница</title>
        </Head>
        <div className="main">
        <div className='home'>
            <div className='home__banner'>
                <video src={videoBg}  autoPlay loop muted  playsInline style={{zIndex:'-1', width: '100%'}}/>
                <form onSubmit={(e) => e.preventDefault()} className='home__form' >
                    <div className={'home__form-inputs'}>
                        <Select
                        size='large'
                        dropdownMatchSelectWidth={true}
                            defaultValue="Категория"
                            onChange={e => setSearchCategory(e)}
                            options={categories?.map(c => (
                                {
                                    value: c.name,
                                    label: c.name
                                }
                            ))}
                            />
                        <Select
                        size='large'
                        dropdownMatchSelectWidth={true}
                            defaultValue={true}
                            // style={{width: 200}}
                            onChange={e => setOneDay(e)}
                            options={[
                                {
                                value: true,
                                label: 'однодневные',
                                },
                                {
                                    value: false,
                                    label: 'многодневные',
                                },
                            ]}
                            />
                    </div>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className='home__form-input' type="text" placeholder="City, place" />
                    <Link href={{pathname:'/allTours', query: {search: search, is_one_day: oneDay, category: searchCategory}}} className='home__form-btn' >Найти <VscSearch/></Link>
                </form>
            </div>
        </div>
        

        <section className=" sectionservice works">
            <h2 className="section_title">Наши туры</h2>

        </section>
        <div className="container">
            
         
            <div className="prc card-blur"> 
                
            {
                tours?.map(t => {
                    const src = t.image
                    return (
                    <Link href={{ pathname: '/tours',  query: { id: t.id, comment: 'asdsa'},
                    }} key={t?.id} className=" card card__best">
                        <div className='card__imgBox'>
                            <Image className='card__img' width={300} height={400} loader={() => src} unoptimizied src={src} alt="bish"/>
                        </div>
                        {/* <span  className="card__icon card__geo" data-title={t.tags.join(', ')}>
                            <img className="card__icon" src={'/gps.png'}/>
                        </span> */}
                        <div className='card__inf'>
                            <div className="best">
                                <p>Best</p>
                            </div>
                            <h3 className="card__title">{t.name}</h3>
                            {/* <p className="card__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, repellat.</p> */}
                            <div className="card__bot">
                                <span className="card__tags">
                                    {
                                        t.tags.map((str , idx)=> (
                                            <Link href={{pathname:'/gallery', query: {tag:str}}} key={idx}> #{str} </Link>
                                        ))
                                    }
                                </span>
                                <span className="card__time">
                                    <Image width={50} className="card__icon" src={clock}  unoptimized alt="time"/>
                                    <span>{t.days} days</span>
                                </span>
                            </div> 
                        </div>
                </Link>
                )})
            }
              {
                tours?.map(t => {
                    const src = t.image
                    return (
                    <Link href={{ pathname: '/tours',  query: { id: t.id, comment: 'asdsa'},
                    }} key={t?.id} className="card card__best">
                        <div className='card__imgBox'>
                            <Image className='card__img' width={300} height={400} loader={() => src}   loading="lazy" src={src} alt="bish"/>
                        </div>
                        <div className='card__inf'>
                            <div className="best">
                                <p>Best</p>
                            </div>
                            <h3 className="card__title">{t.name}</h3>
                            <div className="card__bot">
                                <span className="card__tags">
                                    {
                                        t.tags.map((str , idx)=> (
                                            <Link href={{pathname:'/gallery', query: {tag:str}}} key={idx}> #{str} </Link>
                                        ))
                                    }
                                </span>
                                <span className="card__time">
                                    <Image width={50} className="card__icon" loading="lazy" src={clock} alt="time"/>
                                    <span>{t.days} days</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                )})
            }
            {
                tours?.map(t => {
                    const src = t.image
                    return (
                    <Link href={{ pathname: '/tours',  query: { id: t.id, comment: 'asdsa'},
                    }} key={t?.id} className="card card__best">
                        <div className='card__imgBox'>
                            <Image className='card__img' width={300} height={400} loading="lazy"  loader={() => src} src={src} alt="bish"/>
                        </div>
                        <div className='card__inf'>
                            <div className="best">
                                <p>Best</p>
                            </div>
                            <h3 className="card__title">{t.name}</h3>
                            <div className="card__bot">
                                <span className="card__tags">
                                    {
                                        t.tags.map((str , idx)=> (
                                            <Link href={{pathname:'/gallery', query: {tag:str}}} key={idx}> #{str} </Link>
                                        ))
                                    }
                                </span>
                                <span className="card__time">
                                    <Image width={50} className="card__icon"loading="lazy"  src={clock} alt="time"/>
                                    <span>{t.days} days</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                )})
            }
                
                
                

                

            </div>
            <Link href={{pathname: '/allTours', query:{search: ''}}}>
                <button className="downprice">Все туры</button>
            </Link>
            
        </div>

      

        <div className='home__parallax'>
            
        </div>

        <section className="sectionservice">
            <h2 className="section_title ">Почему у нас</h2>
            <div className="container">
                <div className="group">
                    <div className="group1">
                        <Image width={120} height={120} className="group__img" loading="lazy"  src={main1} alt="Туризм по духу"/>
                        <p className="ptext1">Туризм по духу</p>
                       
                    </div>


                    <div className="group2">
                        <Image width={180} height={130} className="group__img" loading="lazy" src={main2} alt="Туризм по духу"/>
                        <p className="ptext1">Доступные предложения по цене</p>
                      
                    </div>

                    <div className="group3">
                    <Image width={80} height={110} className="group__img" loading="lazy" src={main3} alt="Туризм по духу"/>
                        <p className="ptext1">Отдых без напряжения</p>
                        
                    </div>

                    <div className="group4">
                        <Image width={80} height={110} className="group__img"  loading="lazy"src={main4} alt="Туризм по духу"/>
                        <p className="evenly">Оправданное доверие наших клиентов</p>
                        
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <strong>
                    <p className="ptext4">Хотите узнать подробность, <br/> телефон для связи:</p>
                    <a className="ptext3" href='tel:9960553577575'>+996 (0553) 577-575</a>
                    </strong>
                </div>
            </div>
        </section> <br/><br/>


        <section className=" sectionservice works">
            <h2 className="section_title">Articles & Tips</h2>
             <p style={{textAlign: 'center'}}>Explore some of the best tips from around the Kyrgyzstan</p> 
            <div className="container">
                <div className="prc card-blur">
                    {
                        places?.map( t => (
                            <Link key={t?.id} href={{ pathname: '/place',  query: { id: t.id, comment: 'asdsa'},}} className={"card price3"}>
                                <Image loader={() => t.image} src={t.image} alt="asf" width={1920} height={380} />
                                <div className="card__bg"> </div>
                                <div className="ptext1">{t.name}</div>
                                <p className="">{t.description?.slice(0,121)}</p>
                                <p className="pricetext2">Читать больше</p>
                            </Link>
                        ))
                    }
    
                </div>
                <Link href={{pathname: '/gallery'}}>
                    <button className="downprice">Галерея</button>
                </Link>
            </div>
        </section>

      

        </div>
        </>
    )
}

// Main.getInitialProps = async ()=>{
//     const req = await fetch('http://127.0.0.1:8000/ru/api/v1/tours/?is_draft=false')
//     const tours = await req.json()


//     return {tours: tours}

//  }




 export default Main;
 export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../lang/${locale}.json`),
        ...require(`../lang/${locale}.json`),
        ...require(`../lang/${locale}.json`),
      },
    },
  }
}



