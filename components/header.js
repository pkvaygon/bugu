import  Image  from 'next/image';
import Link from 'next/link';
import bish from '../public/bogoo.jpg'
import { Select } from 'antd';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';




export default function Header(props){
    const t = useTranslations('header')
    

    const router = useRouter()
    const locale = router.locale
    const navLink = router.route
    const [lang, setLang] = useState(false)
    const [open, setOpen] = useState(false)


   console.log(locale)
    

        

    
    return(
        <>
    <header>
        <nav className="navigation">
            <div>
            <div onClick={() => setOpen(!open)} className="header__burger">
                <svg width="68" height="14" viewBox="0 0 68 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.4837C6.3473 2.88065 14.9897 1.17301 21.32 2.8695C30.8501 5.4235 38.9139 13.6762 52.957 11.1048C58.5783 10.0755 63.3366 8.24065 67 6.36585" stroke="#47093E" strokeWidth="3"/>
                </svg>
                <svg width="68" height="14" viewBox="0 0 68 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.4837C6.3473 2.88065 14.9897 1.17301 21.32 2.8695C30.8501 5.4235 38.9139 13.6762 52.957 11.1048C58.5783 10.0755 63.3366 8.24065 67 6.36585" stroke="#47093E" strokeWidth="3"/>
                </svg>
                <svg className="burger" width="68" height="14" viewBox="0 0 68 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.4837C6.3473 2.88065 14.9897 1.17301 21.32 2.8695C30.8501 5.4235 38.9139 13.6762 52.957 11.1048C58.5783 10.0755 63.3366 8.24065 67 6.36585" stroke="#47093E" strokeWidth="3"/>
                </svg>
            </div>
            <ul className={`navigation__menu-list ${open && 'open'}`}>
                    <Link  className={`nav ${navLink =='/' && 'active'}`} locale={locale} href={{
                    pathname: '/'
                    }}>{t('main')}</Link>
                    <Link  className={`nav ${navLink =='/allTours' && 'active'}`} locale={locale} href={{
                        pathname: '/allTours', query:{search: ''}
                    }}>{t('tours')}</Link>
                    <Link  className={`nav ${navLink =='/gallery' && 'active'}`} locale={locale} href={{
                        pathname: '/gallery'
                    }}>{t('gallery')}</Link>
                    <Link  className={`nav ${navLink =='/faq' && 'active'}`} locale={locale} href={{
                        pathname: '/faq'
                    }}>FAQ</Link>
                    <Link  className={`nav ${navLink =='/aboutUs' && 'active'}`} locale={locale} href={{
                        pathname: '/aboutUs'
                    }}>{t('about')}</Link>
            </ul>
            <Link href={{pathname: '/'}}>
                <Image className="logo"
                        src={'/bugu_travel_logo1.jpg'}
                        alt="logo" width={290} height={260} priority/>
            </Link>
               
            </div>
            <ul className="ulnav">
                <Link  className={`nav ${navLink =='/' && 'active'}`} locale={locale} href={{
                    pathname: '/'
                }}>{t('main')}</Link>
                 <Link  className={`nav ${navLink =='/allTours' && 'active'}`} locale={locale} href={{
                    pathname: '/allTours', query:{search: ''}
                }}>{t('tours')}</Link>
                <Link  className={`nav ${navLink =='/gallery' && 'active'}`} locale={locale} href={{
                    pathname: '/gallery'
                }}>{t('gallery')}</Link>
                <Link  className={`nav ${navLink =='/faq' && 'active'}`} locale={locale} href={{
                    pathname: '/faq'
                }}>FAQ</Link>
                <Link  className={`nav ${navLink =='/aboutUs' && 'active'}`} locale={locale} href={{
                    pathname: '/aboutUs'
                }}>{t('about')}</Link>
                {/* <li><a className="nav" href="#">Контакты</a></li> */}
            </ul>
        
        </nav>
       
    </header>
    
        <div className='navigation__lang'>
          
            {/* <img className='navigation__lang-globus' width={30} src="https://img.icons8.com/metro/26/null/globe.png"/> */}
            <div className={`lang-menu  ${lang && 'open'}`}>

                <div className={`selected-lang ${locale}`} onClick={() => setLang(!lang)}>
                    {locale == 'en' ? 'Eng' : locale == 'de' ? 'De' : 'Рус'}
                </div>
                <ul>
                    <li>
                        <Link href={'/'} locale={'ru'}  className="ru">Русский</Link>
                    </li>
                    <li>
                        <Link href={'/'} locale={'en'}  className="en">English</Link>
                    </li>
                    <li>
                        <Link href={'/'} locale={'de'}  className="de">Deutch</Link>
                        {/* <a href="" className="de"></a> */}
                    </li>

                </ul>
                
            </div>
            
        </div>
         
        </>
    )
}