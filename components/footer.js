import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import  Image  from 'next/image';
import Link from 'next/link';
import {GrYoutube, GrTictok} from 'react-icons/gr'
import {FiPhoneCall} from 'react-icons/fi'
import {FaTelegram} from 'react-icons/fa'
import {AiFillInstagram, AiFillFacebook, AiOutlineTwitter, AiFillSkype,AiOutlineWhatsApp} from 'react-icons/ai'

export default function Footer(){
    const router = useRouter(),
     locale = router.locale;

     const [media, setMedia] = useState([])
      useEffect(()=>{
        const fetchdata = async () => {
            const req = await fetch( `http://127.0.0.1:8000/${locale}/api/v1/social_networks/`)
            const res = await req.json()
            setMedia(res.data)
        }
        fetchdata()
    
    },[])
    console.log(media   )
        
      const allMedia = {
        Twitter: <AiOutlineTwitter/>,
        Instagram: <AiFillInstagram/>,
        Facebook: <AiFillFacebook/>,
        YouTube: <GrYoutube/>,
        Skype: <AiFillSkype/>,
        WhatsApp: <AiOutlineWhatsApp/>,
        Telegram: <FaTelegram/>,
        TicTok: <GrTictok/>
      }


    return(
        
        <footer className="footer">
        <div className="container">
            <div className="footer__info">
                <div className="footer__info-company">
                    <Link href={{pathname: '/'}}>
                        <Image className='footer__info-logo' 
                                src={'/bugu_travel_logo2-removebg-preview.png'}
                                // src={'/bugu_travel_logo2.jpg'}
                                alt="logo" width={190} height={190} priority/>
                    </Link>
                    <div className="footer__info-contact-social">
                        {/* <h4 className="footer__info-title">OUR SOCIAL MEDIA</h4> */}
                        <div>
                            {
                                media?.map(el => (
                                    <a key={el.id} className="icon" href="#">{allMedia[el.name]}</a>
                                ))
                            }
                            {/* <a className="icon" href="#"><AiOutlineTwitter/></a>
                            <a className="icon" href="#"><AiFillInstagram/></a>
                            <a className="icon" href="#"><AiFillFacebook/></a>
                            <a className="icon" href="#"><GrYoutube/></a>
                            <a className="icon" href="#"><AiFillSkype/></a>
                            <a className="icon" href="#"><AiOutlineWhatsApp/></a>
                            <a className="icon" href="#"><FaTelegram/></a>
                            <a className="icon" href="#"><GrTictok/></a> */}
                        </div>
                    </div>
                 
                </div>
                
                <div className="footer__info-contact">
                    <div className="footer__info-address">
                        <h4 className="footer__info-title">CONTACT US</h4>
                       
                        <a className="footer__info-address-link" href="tel:239942334022"><FiPhoneCall/>+23 994 233 4022</a>
                        <a className="footer__info-address-link" href="mailto:info@konstruct.com">info@konstruct.com</a>
                    </div>
                </div>

                <div className="footer__info-contact">
                    <div className="footer__info-address">
                        <h4 className="footer__info-title">ADDRESS</h4>
                        <a className="footer__info-address-link" href="https://goo.gl/maps/AG4g7NUgWb885CJ78">213 Baker Street
                        Oriel City Kounty 7000 KNW, Country Name </a>
                    </div>
                </div>

               
                {/* <div className="footer__info-comment">
                    <div>
                        <h4 className="footer__info-title">LEAVE A COMMENT ABOUT US</h4>
                        <form className='footer__info-form' onSubmit={(e) => e.preventDefault()}>
                            <div className='footer__info_inputs'>
                                <input type="text" onChange={(e) => setTourForm({...tourForm, sender:  e.target.value}) }  placeholder='Имя'/>
                                <input type="email" onChange={(e) => setTourForm({...tourForm, email: e.target.value}) } placeholder='эл. почта'/>
                                <input type="text" onChange={(e) => setTourForm( {...tourForm, phone_number: e.target.value}) }  placeholder='Номер телефона'/>
                                <textarea type="text" onChange={(e) => setTourForm( {...tourForm, text: e.target.value}) } placeholder='Комментарий'/>
                            </div>
                            <button className='footer__info-btn' onClick={() => submitHandler()}>Отправить</button>
                        </form>
                    </div>
                </div> */}
                
            </div>
        </div>
            <div className="footer__bottom">
                <div className="container">
                    <p className="footer__bottom-text">© 2023 Boogoo travel.</p>
                </div>
            </div>
    </footer>

    )
}