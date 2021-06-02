import React, { Component } from "react";
import UserService from "../../services/user.service";
import formContactService from '../../services/formContact.service';
import { HashLink as Link} from 'react-router-hash-link';
import { Container, Row, Col, Button, Card } from 'reactstrap';

import Loader from 'react-loader-spinner';
import { animateScroll as scroll } from "react-scroll";

import ScrollNav from './ScrollNav';
import Collapse from './collapse/Collapse';
import Introcollapse from './collapse/introCollapse';
import ReglementCollapse from './collapse/ReglementCollapse';
import CommentBox from './comments/CommentBox';
import Booking from './booking/Booking';
import FormContactModal from './formContactModal';
import GoogleApiWrapper from './googleMap';

import {FaBed, FaParking, FaSwimmingPool, FaFireExtinguisher, FaThermometerThreeQuarters, FaSmokingBan, FaPaw} from 'react-icons/fa';
import {IoIosBed} from 'react-icons/io';
import { GiHanger, GiTransportationRings, GiRadioactive} from 'react-icons/gi';
import { WiSmoke } from "react-icons/wi";
import { Icon } from '@iconify/react';
import washingMachine from '@iconify/icons-mdi/washing-machine';
import ironIcon from '@iconify/icons-si-glyph/iron';

import pic1 from '../../assets/pic1.jpg';
import piscine from '../../assets/piscine.jpg';
import repas from '../../assets/repas.jpg';
import sport from '../../assets/sport.jpg';
import salonext from '../../assets/salon-terrasse.jpg';
import profil from '../../assets/profil-valerie.jpg';



export default class Home extends Component {
    _isMounted = false;
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.handleFormContact = this.handleFormContact.bind(this);
    this.alert = 0;

    this.state = {
      content: "",
      isLoading: true,
      loading: false,
      succesful: false,
      name: "",
      email: "",
      message: "",
      alert: "",
    };
  }

  onChangeName(e) {
      this.setState({
          name: e.target.value
      });
  }
  onChangeEmail(e) {
      this.setState({
          email: e.target.value
      });
  }
  onChangeMessage(e) {
      this.setState({
          message: e.target.value
      });
  }

  handleFormContact(e) {
      e.preventDefault();
      this.setState({
          alert: "",
          succesful: false,
          loading: true
      });
      formContactService.sendFormContact(this.state.name, this.state.email, this.state.message)
      .then( response => {
          this.setState({ 
            alert: response.data.message,
            successful: true,
            loading: false
          });
          this.resetForm();
          this.alert = setTimeout( () => { 
            this.setState({alert:''});
            this.alert= 0
        }, 3000)
      },
        error => {
            const resMessage = error.response.data.message
            this.setState({
                successful: false,
                loading: false,
                alert: resMessage
            });
        }
      )
  }

  resetForm() {
      this.setState({name: '', email: '', message: ''});
  }


   componentDidMount() {
       this._isMounted= true;
    UserService.getPublicContent().then(
      response => {
          if (this._isMounted) {
                this.setState({
                content: response.data,
                isLoading: false
                });
            }
      },
      error => {
        this.setState({
            isLoading: false,
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      });
  }

  UNSAFE_componentWillUnmount() {
    clearTimeout(this.alert);
    this._isMounted = false;
}

  scrollToTop = () => {
    scroll.scrollToTop();
  };
  render() {
    return (
          /* <h3>{this.state.content}</h3> */
          <div>
              {this.state.isLoading ? (
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20vh"
                    }}
                    >                   
                      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                    </div>
              ) : ( 
        <Container fluid="lg" >
            <div>
        {/* <ScrollNav/> */}

          <Row>
              <Col id="top">
                  <h1 className="h1">Maison - Charme et Campagne - Piscine- S.de sport</h1>
                  <p>Bajamont, Nouvelle-Acquitaine, France</p>
              </Col>
          </Row>
                      <Row>
                      <Col lg="6">
                          <Link to ="/photos">                          
                              <img src={pic1} className="pic img-radius-left" alt="Accueil de la maison"/>
                              <Button className="btn-number-of-imgs"  color="light">
                              1/46
                              </Button>{' '}  
                           </Link>
                      </Col>
                      <Col>
                          <Link to ="/photos">                          
                          <div className="imgs-container">
                              <div className="imgs-tableau-container">
                                      <img src={piscine} className="img-tableau" alt="La piscine"/>
                                      <img src={repas} className="img-tableau" alt="Coin repas"/>
                              </div>  
                              <div className="imgs-tableau-container">
                                      <img src={sport} className="img-tableau img-radius-top-right" alt="La salle de sport"/>
                                      <img src={salonext} className="img-tableau img-radius-bottom-right" alt="Le petit salon extérieur"/>
                              </div>
                              <div className="button-on-img-container">
                                  <Button className="button-on-img"  color="info">Afficher toutes les photos</Button>{' '}     
                              </div>  
                          </div>
                          </Link>
                      </Col>
                  </Row>
      
              {/* ---------------- TEXTE DESCRIPTION ---------------------------------------------- */}
      
                      <main id="présentation" className="presentation-container">
                          <Col>
                              <div className="text-img-container border-bottom">
                                  <div className="text-presentation-container">
                                      <h2 className="h2"><strong>Maison entière. Hôte : Valérie</strong></h2>
                                      <p>8 voyageurs - 3 chambres - 7 lits - 1,5 salle de bain</p>
                                  </div>
                                  <div className="img-profil-container">
                                      <Link to="#PROPOSE_PAR_VALERIE">
                                          <img src={profil} className="img-profil" alt="Profil Valérie"></img>
                                      </Link>
                                  </div>
                              </div>
                          </Col>
                      </main>

                  <main className="presentation-container border-bottom">
                      <Col>
                          <article>
                              <h3 className="h3">Logement entier</h3>
                              <p className="p-discret">Vous aurez le logement (maison) rien que pour vous</p>
                          </article>
                      </Col>
                  </main>
                  <main className="presentation-container border-bottom">
                      <Col>
                          <Card className="collapse-card">
                              <div>ENTIÈRE DÉCONNEXION <br/>
                              Situé idéalement entre Agen (15 min) et Villeneuve-sur-Lot, 
                              cet ancien relais de poste du 18è siècle 
                              SANS TV, SANS Wifi (Si! Si ! C'est possible ! ) vous attend, niché dans les bois.
                              La verdure et le calme environnants, le charme de ses murs en pierre et de ses poutres, 
                              les objets et meubles chinés en brocante vous donneront la sensation que le temps s'y 
                              est arrêté. Bienvenue à La Mataviguette !
                              <Collapse />
                              </div>
                          </Card>
                      </Col>
                  </main>

          {/*  ----------------------------COUCHAGE AVEC ICONES ------------------------------ */}
      
                  <main className="presentation-container border-bottom">
                      <Col>
                          <article>
                              <h2 className="h2">Couchages</h2>
                              <div className="chambres-container">
                                  <Col  className="chambre-container">
                                      <div className="chambre1-icon-container">
                                          <IoIosBed />
                                      </div>
                                      <h3 className="h3">Chambre 1</h3>
                                      <p className="p-chambre">1 lit double</p>
                                  </Col>
                                  <Col  className="chambre-container">
                                      <div className="chambre2-icon-container">
                                          <FaBed /><FaBed />
                                      </div>
                                      <h3 className="h3">Chambre 2</h3>
                                      <p className="p-chambre">2 lits simples</p>
                                  </Col>
                                  <Col  className="chambre-container">
                                      <div className="chambre3-icon-container">
                                          <FaBed /><FaBed /><FaBed /><FaBed />
                                      </div>
                                      <h3 className="h3">Chambre 3</h3>
                                      <p className="p-chambre">4 lits simples</p>
                                  </Col>
                              </div>
                          </article>
                      </Col>
                  </main>
      
      {/* --------------------------------EQUIPPEMENTS ------------------------------------- */}
      
      
                  <main className="presentation-container border-bottom">
                      <Col>
                          <article>
                              <h2 className="h2">Équippements</h2>
                              <Row>
                                  <Col>                              
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <FaParking /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Parking gratuit sur place</p>
                                          </div>
                                      </div>
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <FaSwimmingPool /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Piscine</p>
                                          </div>
                                      </div>                                
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <GiHanger /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Ceintre</p>
                                          </div>
                                      </div>                                
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <FaFireExtinguisher/> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Extincteur</p>
                                          </div>
                                      </div>                                
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <WiSmoke /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Détecteur de fumée</p>
                                          </div>
                                      </div>
                                      <div className="equippement-row">
                                      </div>
                                      <div className="btn-equippements">
                                          <Link to ="/equippements">               
                                          <div>Afficher les 23 équippements</div>
                                          </Link> 
                                      </div>
                                      </Col>
      
                                      <Col>
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <FaThermometerThreeQuarters /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Chauffage</p>
                                          </div>
                                      </div>                                
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <GiTransportationRings /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p>Sport</p>
                                          </div>
                                      </div>
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                          <Icon icon={ironIcon} />
                                          </div>
                                          <div className="equippement-text">
                                              <p>Fer à repasser</p>
                                          </div>
                                      </div>
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                          <Icon icon={washingMachine} />
                                          </div>
                                          <div className="equippement-text">
                                              <p>Lave-linge</p>
                                          </div>
                                      </div>
                                      <div className="equippement-row">
                                          <div className="equippement-icon">
                                              <GiRadioactive /> 
                                          </div>
                                          <div className="equippement-text">
                                              <p className="p-equippement-raye">Détecteur de monoxyde de carbon</p>
                                          </div>
                                      </div>
                                      </Col>
                              </Row>
                          </article>
                      </Col>
                  </main>
      
      
                        {/* ---------------------------------------GOOGLE MAP------------------------------------------------ */}

                  <main id="emplacement" className="presentation-container">
                      <Col>
                          <article>
                              <h2 className="h2"><strong>Le quartier</strong></h2>
                              <p className="m-top-1">Le logement proposé par Valérie est situé à Bajamont Nouvelle-Aquitaine France.</p>
                            <p>La maison est située au bord d'une petite route de campagne très peu fréquentée. Elle est entourée de bois et excentrée du village de Bajamont. Un véhicule est nécessaire pour les courses (Intermarché- boulangerie- pharmacie .... à 10 minutes en voiture).</p>
                            <p><strong>Transports</strong></p>
                            <p>La gare d'Agen est à 15 minutes.</p>
                            <p>Les commerces à 10 min en voiture.</p>
                            <p className="p-discret">L'adresse exacte est communiquée uniquement lorsque la réservation est confirmée.</p>
                          </article>
                      </Col>
                  </main>
                  <div className="container">
                      <GoogleApiWrapper/>
                    </div>

                        {/* -----------------------------------INTRO VALERIE----------------------------------- */}

                  <main id="l'hôte" className="col-propose-par-valerie border-bottom">
                      <Row>
                          <Col>
                            <div className="img-title-propose-par">
                                <div className="img-propose-par-valerie-container">
                                    <img src={profil} className="img-propose-par-valerie" alt="Profil Valérie" id="PROPOSE_PAR_VALERIE"></img>
                                </div>
                                <div className="propose-par-valerie">
                                    <h2 className="h2">Proposé par Valérie</h2>
                                </div>
                            </div>

                            <div className="intro-text-container">
                                <p>Nous sommes une famille avec trois grands garçons et cette maison est le lieu idéal pour tous nous retrouver lors des belles journées d'été ou l'hiver devant un bon feu de cheminée…</p>
                                <Introcollapse/>
                                <strong>Pendant votre séjour</strong>
                                <p>J'échangerai avec vous par mail ou téléphone mais c'est Séverine qui vous accueillera.
Je reste disponible cependant avant et tout au long de votre séjour pour répondre à vos interrogations.</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="col-droite-intro-container">
                                <p>Langue: English</p>
                                <p>Taux de réponse: 100%</p>
                                <p>Délai de réponse: Moins d'une heure</p>
                                <div>
                                <FormContactModal
                                    buttonLabel="Contacter l'hôte"
                                    name={this.state.name}
                                    email={this.state.email}
                                    message={this.state.message}
                                    alert={this.state.alert}
                                    onChangeName={this.onChangeName}
                                    onChangeEmail={this.onChangeEmail}
                                    onChangeMessage={this.onChangeMessage}
                                    handleFormContact={this.handleFormContact}
                                    className={this.state.successful}
                                    loading={this.state.loading}
                                />
                                </div>
                            </div>
                        </Col>

                      </Row>
                  </main>

                  <main id="règlement" className="presentation-container border-bottom">
                      <Col>
                          <article>
                              <h2 className="h2"><strong>Points à retenir</strong></h2>
                              <p>Arrivée: 15:00 - 18:00 
                               <br/>
                               Départ: 10:00</p>
                               <hr/>
                               <p><strong>Règlement intérieur</strong></p>
                               <p><FaSmokingBan/> Non fumeur</p>
                               <p><FaPaw/> Animaux de compagnie acceptés</p>
                               <ReglementCollapse/>
                               <hr/>
                               <p><strong>Annulations</strong></p>
                                <p>Annulation gratuite pendant <strong>48 heures</strong></p>
                                <p>Au-delà, annulez jusqu'à 24h avant l'arrivée prévue pour obtenir un remboursement intégral, moins les frais de service.</p>

                          </article>
                      </Col>
                  </main>
            
            {/* ------------------------------------COMMENTAIRES--------------------------------------------------------- */}

            <main id="commentaires" className="presentation-comments-container border-bottom m-top-1">
                <Col>
                    <article>
                        <h2 className="h2"><strong>Commentaires</strong></h2>
                        <CommentBox/>
                    </article>
                </Col>
            </main>

            </div>

                          {/* RESERVATION CONTAINER -------------------------- */}

            <div className="lg-booking-form card "><Booking /></div>

        </Container>
        )}
        </div>

      



    );
  }
}