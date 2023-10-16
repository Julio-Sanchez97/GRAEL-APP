import {useState} from 'react'
import imageCamion from '../../images/camion2.jpg';
import Carousel from 'react-bootstrap/Carousel';
import styles from "./Homepage.module.css";
import youtubeIcon from "../../images/youtube-168-svgrepo-com.svg";
import facebookIcon from '../../images/facebook-svgrepo-com.svg';
import instagramIcon from '../../images/instagram-svgrepo-com.svg';
import twitterIcon from '../../images/twitter-154-svgrepo-com.svg';
import phoneIcon from '../../images/phone-svgrepo-com.svg';
import addressIcon from '../../images/address-location-map-svgrepo-com.svg';
import emailIcon from '../../images/email-svgrepo-com.svg'

const Homepage = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className={styles.container}>
      {/* Carousel de imagenes */}
      <section className={styles.slider}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img src={imageCamion} alt="camion" className={styles.imgCarousel} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={imageCamion} alt="camion" className={styles.imgCarousel} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={imageCamion} alt="camion" className={styles.imgCarousel} />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      {/* Cuerpo de la HomePage */}
      <section className={styles.body}>
        <div className={styles.aboutUs}>
          <img src="https://i.pinimg.com/564x/8c/19/cf/8c19cf23f354d93546d451b6084499c0.jpg" alt="aboutUs" className={styles.imageAboutUs} />
          <div className={styles.textAboutUs}>
            <h1>ABOUT US</h1>
            <p>
              <b>EXPRESO GRAEL</b> es una empresa dedicada al transporte terrestre de carga a nivel nacional con más de 20 años de experiencia. 
              Brindamos nuestros servicios con eficiencia, garantía y confianza, a un costo accesible al mercado, para tal fin disponemos de unidades propias. 
              Nuestro compromiso con Usted es entregarle el mejor <b>SERVICIO</b> y la mejor experiencia empresarial.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <h4>Links</h4>
          <ul className={styles.list}>
            <li>Home</li>
            <li>Form</li>
            <li>About us</li>
          </ul>
        </div>
        <div>
          <h4>Social Media</h4>
          <img src={youtubeIcon} alt="youtubeIcon" className={styles.youtubeIcon}/>
          <img src={facebookIcon} alt="facebookIco" className={styles.facebookIcon}/>
          <img src={twitterIcon} alt="twitterIcon" className={styles.twitterIcon}/>
          <img src={instagramIcon} alt="instagramIcon" className={styles.instagramIcon}/>
        </div>
        <div>
          <h4>Contact Info</h4>
          <ul className={styles.list}>
            <li><img src={phoneIcon} alt="phoneIcon"/> +51999999999</li>
            <li><img src={emailIcon} alt="emailIcon"/> grael.contacto@gmail.com</li>
            <li><img src={addressIcon} alt="addressIcon"/> Calle imaginaria 123 Urb. falsedad</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Homepage