import './index.css';
import heroImg from '../../assets/banner.png';

export const Banner = () => {
  return (
    <div className="hero-container">
      <img src={heroImg} alt="Viridiant Forest Banner" className="hero-image" />
      
      <div className="hero-content">
        <h2 className="hero-title">Llena tu hogar de vida y naturaleza</h2>
        <p className="hero-subtitle">Descubre nuestra colección exclusiva de plantas de interior y exterior</p>
      </div>
    </div>
  );
};