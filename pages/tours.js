import { Carousel, Collapse } from 'antd'
const { Panel } = Collapse;
import clock from '../public/clock.png';
import {MdFoodBank, MdMoreTime} from 'react-icons/md'
import {GiMountainRoad} from 'react-icons/gi'
import bish from '../public/bish.png'
import { Image as NewImg} from 'antd';
import  Image  from 'next/image';
import { useRouter} from 'next/router'
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import {  Modal } from 'antd';
import axios from 'axios';
import Head from 'next/head';



  export async function getServerSideProps(context){
    const {locale, query} = context;
    const req = await fetch(`http://127.0.0.1:8000/${locale}/api/v1/tours/${query.id}/`)
    const res = await req.json()

    

    return {
        props: {
            messages:  require(`../lang/${locale}.json`),
            pageInfo: res.data,
        }
    }
  }


const  TourPage = (props) =>{
    console.log(props)
    const {pageInfo} = props;
    const router = useRouter(),
     {id, comment} = router.query,
     [isModalOpen, setIsModalOpen] = useState(false);
     const [visible, setVisible] = useState(false)

    console.log(router.locale)


     const [tours, setTours] = useState()
     const [tourForm, setTourForm] = useState({
       sender: '' , 
       email: '',
       phone_number: '',
       text: '',
     })

     useEffect(() => {
         const fetchdata = async () => {
             const req = await fetch(`http://127.0.0.1:8000/${router.locale}/api/v1/tours/?is_draft=false`)
             const res = await req.json()
             setTours(res.data)
         }
        fetchdata();
     },[])

    
     const submitHandler = async () =>{
          await axios.post('http://127.0.0.1:8000/ru/api/v1/messages/', tourForm)
        .then(res => console.log(res))
        .catch(err => console.log(err))
     }

     useEffect(() => {
        console.log(tourForm);
     },[tourForm])



     
     const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
     const bgImage = pageInfo?.image



    return (
        <>
         <Head>
            <title> Boogoo || Туры</title>
        </Head>
        
        <div className='tourPage'>
            <Modal centered title={pageInfo?.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <form className='tours__form' onSubmit={(e) => e.preventDefault()}>
                    <div className='tours__modal_inputs'>
                    <input type="text" onChange={(e) => setTourForm({...tourForm, sender:  e.target.value}) }  placeholder='Имя'/>
                <input type="email" onChange={(e) => setTourForm({...tourForm, email: e.target.value}) } placeholder='эл. почта'/>
                <input type="text" onChange={(e) => setTourForm( {...tourForm, phone_number: e.target.value}) }  placeholder='Номер телефона'/>
                <textarea type="text" onChange={(e) => setTourForm( {...tourForm, text: e.target.value}) } placeholder='Комментарий'/>
                    </div>
                    <button className='tours__modal_button' onClick={() => submitHandler()}>Подтвердить</button>
                </form>
            </Modal>
           
             <div className="tour__slider">
                <Carousel autoPlaySpeed={8000} autoplay  dotPosition={'right'} easing  >
                    <div className='tour__banner'>
                        <Image loader={() => pageInfo?.image}  src={pageInfo?.image} fill alt="yui" style={{ objectFit:'cover'}} priority />
                    </div>
                    {
                        pageInfo?.images?.map(i => (
                            <div className='tour__banner'>
                                <Image loader={() => i.image} src={i.image} fill alt="yui" style={{ objectFit:'cover'}} unoptimized />
                            </div>
                        ))
                    }
                 
                </Carousel>
                <NewImg preview={{ visible: false, }} style={{display: 'none', marginBottom:'-30px'}} width={200} src={pageInfo?.images}/>
                <div style={{display: 'none'}}>
                    <NewImg.PreviewGroup preview={{visible,onVisibleChange: (vis) => setVisible(vis),}} >
                    {
                        pageInfo?.images?.map(inf =>(
                        <NewImg style={{display: 'none'}} src={inf.image} />
                        ))
                    }
                    </NewImg.PreviewGroup>
                </div>
                    <div className="tour__position">
                        <div className="afisha">
                            <p className="text">{pageInfo?.name} </p>
                            <p id="line"></p>
                            <p className="text2">{pageInfo?.category}</p>
                            <button onClick={() => setVisible(true)}  className="tour__position-btn">Смотреть фото</button>
                        </div>
                    </div>
            </div>
           
            <div className='container tour__text'>

                <div className='tour__info'>
                    <h1 className={'tour__info-title'}>TOUR PAGE {id} {pageInfo?.name}</h1>
                    <div className='tour__top'> <br/>
                        <div>
                            {/* <h2 className="main__story-title red">{pageInfo?.category}</h2> */}
                            {/* <h4>{pageInfo?.category}</h4> */}
                        </div>
                    </div>


                    <h4 className='tour__description'>
                        {pageInfo?.description}
                    </h4> <br/><br/><br/>
                    <div className='tour__description-programm'>
                      <li>Itinerary: {pageInfo?.programs?.map(el => el.name).join(' - ')}</li>
                      <li>Duration: {pageInfo?.days} days</li>
                      <li>Category: {pageInfo?.category}</li>
                        {
                        pageInfo?.start_date &&
                            <li>Start Date: {pageInfo?.start_date}</li>
                       }
                       {
                        pageInfo?.end_date &&
                            <li>End Date: {pageInfo?.end_date}</li>
                       }

                      {/* <li>Group Size:  6-13 pax</li> */}
                      {/* <li>Highlights: Lake Kolsay, Charyn Canyon, Issyk-Kol Lake, Son-Kol Lake, Osh, Bukhara, Samarkand, Tashkent</li>
                      <li>Requirements: weatherproof warm clothes, trekking boots, hat, sunglasses, gloves, and sunscreen</li> */}
                  </div>
                </div>

                <div className='tour__form'>
                <div className="row">
                  <div className="tour__images-column">
                    {
                      pageInfo?.images?.map(inf =>(
                        <NewImg  src={inf.image} />
                      ))
                    }
                     {
                      pageInfo?.images?.map(inf =>(
                        <NewImg  src={inf.image} />
                      ))
                    }
                  </div>
                  <div className="tour__images-column">
                    {
                        pageInfo?.images?.map(inf =>(
                          <NewImg  src={inf.image} />
                        ))
                      }
                       {
                      pageInfo?.images?.map(inf =>(
                        <NewImg  src={inf.image} />
                      ))
                    }
                  </div>
                  <div className="tour__images-column">
                    {
                      pageInfo?.images?.map(inf =>(
                        <NewImg  src={inf.image} />
                      ))
                    }
                     {
                      pageInfo?.images?.map(inf =>(
                        <NewImg  src={inf.image} />
                      ))
                    }
                  </div>
                  
                </div>

                    <form className='tours__form' onSubmit={(e) => e.preventDefault()}>
                        <div className='tours__modal_inputs'>
                        <input type="text" onChange={(e) => setTourForm({...tourForm, sender:  e.target.value}) }  placeholder='Имя'/>
                    <input type="email" onChange={(e) => setTourForm({...tourForm, email: e.target.value}) } placeholder='эл. почта'/>
                    <input type="text" onChange={(e) => setTourForm( {...tourForm, phone_number: e.target.value}) }  placeholder='Номер телефона'/>
                    <textarea type="text" onChange={(e) => setTourForm( {...tourForm, text: e.target.value}) } placeholder='Комментарий'/>
                        </div>
                        <button className='tours__modal_button' onClick={() => submitHandler()}>Бронировать</button>
                    </form>
                </div>

               
            </div>  
                

                    <div className='tourPage__info'>
                        <div className='container tourPage__info-row'>
                        <Collapse defaultActiveKey={['0']}>
                            {
                                pageInfo?.programs?.map((prog, id) => (
                                    <Panel style={{minWidth:'46vw', fontWeight:'700'}} header={`${prog.day} День`} key={id}>
                                        <div className={'tourPage__info-col'} >
                                            <h2>{pageInfo?.programs[id]?.name}</h2>
                                            <div className={'tourPage__info-wrapper'}>
                                                <div className='tourPage__info-box'>
                                                    <h4>{prog.day} День</h4>
                                                    <h4>Жилье:</h4>
                                                    <MdMoreTime className='tourPage__info-icon'/>
                                                    <ul>
                                                        {/* {pageInfo?.programs?.map(el => ())} */}
                                                        <li>{prog.accommodation}</li>
                                                    </ul>
                                                </div>

                                                <div className='tourPage__info-box'>
                                                    <h4>Высота</h4>
                                                    <p>{pageInfo?.programs[id]?.altitude}</p>
                                                    <GiMountainRoad className='tourPage__info-icon'/>
                                                    {}
                                                </div>
                                                <div className='tourPage__info-box'>
                                                    <h4>Питание</h4>
                                                    <p>{pageInfo?.programs[id]?.meal?.join(', ')}</p>
                                                    <MdFoodBank className='tourPage__info-icon'/>
                                                    {}
                                                </div>
                                            </div>
                                            <p className={'tourPage__info-descr'}>{prog.description}</p>
                                        </div>
                                    </Panel>
                                ))
                            }
                           
                        </Collapse>
                            {/* {
                                pageInfo?.programs?.map((prog, id) => (
                                    <div className={'tourPage__info-col'} key={id}>
                                        <h2>{pageInfo?.programs[id]?.name}</h2>
                                        <div className={'tourPage__info-wrapper'}>
                                            <div className='tourPage__info-box'>
                                                <h4>{prog.day} День</h4>
                                                <p>Маршрут:</p>
                                                <MdMoreTime className='tourPage__info-icon'/>
                                                <ul>
                                                    <li>{prog.accommodation}</li>
                                                </ul>
                                            </div>

                                            <div className='tourPage__info-box'>
                                                <h4>Питание</h4>
                                                <p>{pageInfo?.programs[id]?.meal?.join(', ')}</p>
                                                <MdFoodBank className='tourPage__info-icon'/>
                                                {}
                                            </div>
                                        </div>
                                        <p className={'tourPage__info-descr'}>{prog.description}</p>
                                    </div>
                                ))
                            } */}
                          
                        </div>
                    </div>



                    <br/><br/>
                <div className="container prc card-blur"> 
                
                {
                    tours?.map(t => {
                        const src = t.image
                        return pageInfo?.id !== t.id ? (
                            <Link href={{ pathname: '/tours',  query: { id: t.id, comment: 'asdsa'},
                            }} key={t?.id} className=" card">
                                <div className='card__imgBox'>
                                    <Image className='card__img' width={300} height={400} loading="lazy" loader={() => src} src={src} alt="bish"/>
                                </div>
                                <div className='card__inf'>
                                    <div className="card__bg"> </div>
                                    <h3 className="card__title">{t.name}</h3>
                                    <div className="card__bot">
                                        <span className="card__tags">
                                            {
                                                t.tags.map((str , idx)=> (
                                                    <Link href={{pathname:'/gallery', query: {tag:str}}} key={idx}><a>#</a>{str} </Link>
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
                    ) : ''})
                }
                     
                    
    
                </div> <br/><br/><br/>
        </div>
        </>
    )
}


export default TourPage;