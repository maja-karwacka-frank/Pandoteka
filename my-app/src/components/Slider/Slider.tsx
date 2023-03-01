import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import SliderImg1 from '../../Graphics/slider-desktop-photo-1.webp';
import SliderImg2 from '../../Graphics/slider-desktop-photo-2.webp';
import SliderImg3 from '../../Graphics/slider-desktop-photo-3.webp';
import SliderImg4 from '../../Graphics/slider-desktop-photo-4.webp';
import classes from './Slider.module.css';

const Slider = ():JSX.Element => {
  const images:string[] = [
    SliderImg1,
    SliderImg2,
    SliderImg3,
    SliderImg4,
  ];

  return (
    <div className={classes.sliderWrapper} >
      <Slide arrows={false}>
          <div className="each-slide-effect">
              <div>
              <img className={classes.sliderImage} src={images[0]} alt=""/>
              </div>
          </div>
          <div className="each-slide-effect">
          <div>
          <img className={classes.sliderImage} src={images[1]} alt=""/>
              </div>
          </div>
          <div className="each-slide-effect">
          <div>
          <img className={classes.sliderImage} src={images[2]} alt=""/>
              </div>
          </div>
          <div className="each-slide-effect">
          <div>
              <img className={classes.sliderImage} src={images[3]} alt=""/>
              </div>
          </div>
      </Slide>
      
    </div>
  );
};

export default Slider;
