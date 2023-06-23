import { React, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faTv } from "@fortawesome/free-solid-svg-icons"
import logo from '../features/assets/logo.svg'
import { useNavigate } from 'react-router-dom'


const Public = () => {

    const navigate = useNavigate()

    const [english, setEnglish] = useState(true)

    const goToLogin = () => {
        navigate(`/login`)
    }

    const goToSignup = () => {
        navigate(`/sign-up`)
    }

    return (
        <>
            <header className="public-header">
                <img src={logo} alt="Site Logo" />
                <div>
                    <select className="public-header__select"
                        onChange={() => {
                            setEnglish(!english)
                        }}
                        value={english}
                    >
                        <option value={true}>English</option>
                        <option value={false}>Francais </option>
                    </select>
                    <button className="public-header__button"
                        onClick={goToLogin}
                        style={{ display: english ? "inline" : "none" }}
                    >Login
                    </button>
                    <button className="public-header__button"
                        onClick={goToLogin}
                        style={{ display: english ? "none" : "inline", width: "10rem" }}
                    >Ouvrir une session
                    </button>
                </div>
            </header>

            <main className="public-main">
                <section className="hero" style={{ display: english ? "flex" : "none" }}>
                    <div className="hero__background-image"
                    ></div>
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <p>Ready to watch? Sign Up!</p>
                    <button className='hero__button'
                        onClick={goToSignup}
                    >Get Started by Signing up
                    </button>
                </section>
                <section className="hero" style={{ display: english ? "none" : "flex" }}>
                    <div className="hero__background-image"
                    ></div>
                    <h1>Films et séries illimités, et bien plus encore.</h1>
                    <h2>Visionnez n'importe où. Annulez n'importe quand.</h2>
                    <p>Prêt à visionner Netflix? Créer un compte!</p>
                    <button className='hero__button'
                        onClick={goToSignup}
                    >Commencez par vous inscrire
                    </button>
                </section>
                <section className="card" style={{ display: english ? "flex" : "none" }}>
                    <div className="card__text">
                        <h1>Enjoy on your TV.</h1>
                        <h2>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                    </div>
                    <FontAwesomeIcon icon={faTv} className="card__icon" />
                </section>
                <section className="card" style={{ display: english ? "none" : "flex" }}>
                    <div className="card__text">
                        <h1>Visionnez sur votre téléviseur.</h1>
                        <h2>Compatible avec les téléviseurs connectés, Playstation, Xbox, Chromecast, Apple TV, lecteurs Blu-ray et bien plus encore.</h2>
                    </div>
                    <FontAwesomeIcon icon={faTv} className="card__icon" />
                </section>
                <section className="card card--flip" style={{ display: english ? "flex" : "none" }}>
                    <div className="card__text">
                        <h1>Watch everywhere.</h1>
                        <h2>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</h2>
                    </div>
                    <FontAwesomeIcon icon={faGlobe} className="card__icon" />
                </section>
                <section className="card card--flip" style={{ display: english ? "none" : "flex" }}>
                    <div className="card__text">
                        <h1>Visionnez n'importe où.</h1>
                        <h2>Visionnez en continu autant de films et de séries que vous le désirez sur votre téléphone, tablette, portable et téléviseur sans payer un sou de plus.</h2>
                    </div>
                    <FontAwesomeIcon icon={faGlobe} className="card__icon" />
                </section>
            </main>

            <footer>
                <p style={{ display: english ? "flex" : "none" }}>Questions? Call 1-844-542-4813</p>
                <p style={{ display: english ? "none" : "flex" }}>Des questions? Téléphonez au 1-844-640-3067</p>
                <ul className="list" style={{ display: english ? "inline-block" : "none" }}>
                    <li className="list__item">FAQ</li>
                    <li className="list__item">Help Center</li>
                    <li className="list__item">Account</li>
                    <li className="list__item">Media Center</li>
                    <li className="list__item">Investor Relations</li>
                    <li className="list__item">Jobs</li>
                    <li className="list__item">Shop</li>
                    <li className="list__item">Redeem Gift Cards</li>
                </ul>
                <ul className="list" style={{ display: english ? "none" : "inline-block" }}>
                    <li className="list__item">FAQ</li>
                    <li className="list__item">Centre d'aide</li>
                    <li className="list__item">Compte</li>
                    <li className="list__item">Centre des médias</li>
                    <li className="list__item">Relations avec les investisseurs</li>
                    <li className="list__item">Offres d'emploi</li>
                    <li className="list__item">Netflix Shop</li>
                    <li className="list__item">Utiliser des cartes-cadeaux</li>
                </ul>
                <select className="public-header__select"
                    onChange={setEnglish}
                    value={english} >
                    <option value={true}>English</option>
                    <option value={false}>Francais </option>
                </select>
            </footer>
        </>
    )
}

export default Public