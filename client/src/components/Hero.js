import Button from './Button';

import '../css/hero.css';

import introVideo from '../assets/intro-video.jpg'

export default function Hero() {
    
    return (
        <section className="section-hero">
            <div className="hero container align-items-c" style={{backgroundColor: "var(--color-primary)"}}>
                <div className="hero__text-box">

                    <h1 className="heading-primary">Online and In-Person vegan cooking classes</h1>
                    <p className="hero__description">Learn techniques and discover new ingredients for making your own healthy, yummy and sustainable food in incredibly fun and affordable classes</p>
                    
                    <div className="hero__cta">
                        <Button type="button" bgColor="green">See Classes</Button>
                        <a href="#free-classes"><Button type="button">Free Classes</Button></a>
                    </div>
                    
                </div>

                <div className='hero__intro-video'>
                    <img src={introVideo.src} className="img-large"alt="Link to introductory video" />
                </div>
            </div>
        </section>
    )
}