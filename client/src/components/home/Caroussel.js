import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import { Button } from 'reactstrap';
import { HashLink as Link} from 'react-router-hash-link';

import pic1 from '../../assets/pic1.jpg';
import piscine from '../../assets/piscine.jpg';
import repas from '../../assets/repas.jpg';
import sport from '../../assets/sport.jpg';
import salonTerrasse from '../../assets/salon-terrasse.jpg';
import cuisine from '../../assets/cuisine.jpg';
import cuisineVue from '../../assets/cuisine-vue.jpg';
import frigo from '../../assets/frigo.jpg';
import vaisselle from '../../assets/placard-vaisselle.jpg';
import maisonDevant from '../../assets/maison-devant.jpg';
import salon from '../../assets/salon.jpg';
import sejour from '../../assets/sejour.jpg';
import salonCanape from '../../assets/salon-canape.jpg';
import terrasseCouverte from '../../assets/terrasse-couverte.jpg';
import terrasseCouverte2 from '../../assets/terrasse-couverte2.jpg';
import chambreBlanche from '../../assets/chambre-blanche.jpg';
import chambreCheminee from '../../assets/chambre-blanche-cheminee.jpg';
import chambreVue from '../../assets/chambre-blanche-vue.jpg';
import chambreRose from '../../assets/chambre-rose.jpg';
import chambreWC from '../../assets/chambre-rose-wc.jpg';
import chambreLits from '../../assets/chambre-rose-lits.jpg';
import chambreMurs from '../../assets/chambre-rose-mur.jpg';
import sdb from '../../assets/sdb.jpg';
import baignoire from '../../assets/baignoire.jpg';
import wcEtage from '../../assets/wc-etage.jpg';
import dortoir from '../../assets/dortoir.jpg';
import dortoirWC from '../../assets/dortoir-wc.jpg';
import dortoirLits from '../../assets/dortoir-lits.jpg';
import dortoirPlacard from '../../assets/dortoir-placard.jpg';
import dortoirWC2 from '../../assets/dortoir-wc2.jpg';
import wcRdc from '../../assets/wc-rdc.jpg';
import dortoirPorte from '../../assets/dortoir-porte.jpg';
import cuisineEscalier from '../../assets/cuisine-escalier.jpg';
import cuisineTerrasse from '../../assets/cuisine-terrasse.jpg';
import sejourEscalier from '../../assets/sejour-escalier.jpg';
import chalet from '../../assets/chalet.jpg';
import parcHaut from '../../assets/parc-haut.jpg';
import jardinHaut from '../../assets/jardin-haut.jpg';
import chapelleAlentours from '../../assets/chapelle-alentours.jpg';
import chapelleVerso from '../../assets/chapelle-verso.jpg';
import tournseol from '../../assets/tournesol.jpg';
import fleur from '../../assets/fleur.jpg';
import anes from '../../assets/anes.jpg';
import batisse from '../../assets/batisse.jpg';
import canal from '../../assets/canal.jpg';



export const Caroussel = () => (
      <MyCarousel />
)
export default Caroussel;

const items = [
  {
      id: 1,
      altText: 'La maison',
      caption: 'La maison vue de la piscine',
      src: pic1,
  },
  {
      id: 2,
      altText: 'La piscine',
      caption: 'La piscine',
      src: piscine,
  },
  {
      id: 3,
      altText: 'Coin-repas dans la cuisine',
      caption: 'Coin-repas dans la cuisine',
      src: repas,
  },
  {
    id: 4,
    altText: 'Salle de sport du châlet',
    caption: 'Salle de sport du châlet',
    src: sport,
  },
  {
    id: 5,
    altText: "Petit salon d'été sur la terrasse couverte",
    caption: "Petit salon d'été sur la terrasse couverte",
    src: salonTerrasse,
  },
  {
    id: 6,
    altText: 'Cuisine équipée',
    caption: 'Cuisine équipée',
    src: cuisine,
  },
  {
    id: 7,
    altText: 'Vue de la cuisine sur le jardin',
    caption: 'Vue de la cuisine sur le jardin',
    src: cuisineVue,
  },
  {
    id: 8,
    altText: 'Grand réfrigérateur-congélateur',
    caption: 'Grand réfrigérateur-congélateur',
    src: frigo,
  },
  {
    id: 9,
    altText: 'Placard à vaisselle caché dans le mur de la cuisine',
    caption: 'Placard à vaisselle caché dans le mur de la cuisine',
    src: vaisselle,
  },
  {
    id: 10,
    altText: 'Juste devant la maison- A droite, la porte de la cuisine',
    caption: 'Juste devant la maison- A droite, la porte de la cuisine',
    src: maisonDevant,
  },
  {
    id: 11,
    altText: 'Salon lumineux - Chaîne Hifi (radio-CD-USB)',
    caption: 'Salon lumineux - Chaîne Hifi (radio-CD-USB)',
    src: salon,
  },
  {
    id: 12,
    altText: 'Séjour - Grande cheminée',
    caption: 'Séjour - Grande cheminée',
    src: sejour,
  },
  {
    id: 13,
    altText: 'Salon - Canapé moelleux',
    caption: 'Salon - Canapé moelleux',
    src: salonCanape,
  },
  {
    id: 14,
    altText: 'Terrasse couverte - Table pour les jours de pluie ou les soirées fraîches',
    caption: 'Terrasse couverte - Table pour les jours de pluie ou les soirées fraîches',
    src: terrasseCouverte,
  },
  {
    id: 15,
    altText: 'Terrasse couverte',
    caption: 'Terrasse couverte',
    src: terrasseCouverte2,
  },
  {
    id: 16,
    altText: 'Chambre blanche',
    caption: 'Chambre blanche',
    src: chambreBlanche,
  },
  {
    id: 17,
    altText: 'Chambre blanche et sa cheminée rangements + une armoire penderie-lingerie non visible',
    caption: 'Chambre blanche et sa cheminée rangements + une armoire penderie-lingerie non visible',
    src: chambreCheminee,
  },
  {
    id: 18,
    altText: 'Chambre blanche avec vue sur le parc',
    caption: 'Chambre blanche avec vue sur le parc',
    src: chambreVue,
  },
  {
    id: 19,
    altText: "Chambre rose - Armoire de rangement - Accès à l'extérieur à l'arrière de la maison",
    caption: "Chambre rose - Armoire de rangement - Accès à l'extérieur à l'arrière de la maison",
    src: chambreRose,
  },
  {
    id: 20,
    altText: 'Chambre rose - Un coin toilette',
    caption: 'Chambre rose - Un coin toilette',
    src: chambreWC,
  },
  {
    id: 21,
    altText: 'Chambre rose - 2 lits à serrer ou à espacer...',
    caption: 'Chambre rose - 2 lits à serrer ou à espacer...',
    src: chambreLits,
  },
  {
    id: 22,
    altText: 'Détails du mur',
    caption: 'Détails du mur',
    src: chambreMurs,
  },
  {
    id: 23,
    altText: 'Salle de bain',
    caption: 'Salle de bain',
    src: sdb,
  },
  {
    id: 24,
    altText: 'Baignoire et pare-douche',
    caption: 'Baignoire et pare-douche',
    src: baignoire,
  },
  {
    id: 25,
    altText: "WC indépendant à l'étage des deux chambres et du séjour",
    caption: "WC indépendant à l'étage des deux chambres et du séjour",
    src: wcEtage,
  },
  {
    id: 26,
    altText: 'Au RDC, "dortoir" 4 couchages',
    caption: 'Au RDC, "dortoir" 4 couchages',
    src: dortoir,
  },
  {
    id: 27,
    altText: 'Derrière le mur blanc, un cabinet de toilette...',
    caption: 'Derrière le mur blanc, un cabinet de toilette...',
    src: dortoirWC,
  },
  {
    id: 28,
    altText: '2 lits superposés et 2 lits gigogne',
    caption: '2 lits superposés et 2 lits gigogne',
    src: dortoirLits,
  },
  {
    id: 29,
    altText: 'Spacieux - un placard de rangement - Accès direct aux terasses',
    caption: 'Spacieux - un placard de rangement - Accès direct aux terasses',
    src: dortoirPlacard,
  },
  {
    id: 30,
    altText: 'Petit cabinet de toilette attenant au "dortoir"',
    caption: 'Petit cabinet de toilette attenant au "dortoir"',
    src: dortoirWC2,
  },
  {
    id: 31,
    altText: "Cabinet de toilette - il y a un autre WC indépendant à l'étage des 2 autres chambres",
    caption: "Cabinet de toilette - il y a un autre WC indépendant à l'étage des 2 autres chambres",
    src: wcRdc,
  },
  {
    id: 32,
    altText: 'Porte du dortoir-A droite, le cabinet de toilette',
    caption: 'Porte du dortoir-A droite, le cabinet de toilette',
    src: dortoirPorte,
  },
  {
    id: 33,
    altText: 'De la cuisine au séjour',
    caption: 'De la cuisine au séjour',
    src: cuisineEscalier,
  },
  {
    id: 34,
    altText: 'Terrasse de la cuisine',
    caption: 'Terrasse de la cuisine',
    src: cuisineTerrasse,
  },
  {
    id: 35,
    altText: "l'escalier menant au séjour",
    caption: "l'escalier menant au séjour",
    src: sejourEscalier,
  },
  {
    id: 36,
    altText: 'Chalet salle de "sport"',
    caption: 'Chalet salle de "sport"',
    src: chalet,
  },
  {
    id: 37,
    altText: 'En haut du parc',
    caption: 'En haut du parc',
    src: parcHaut,
  },
  {
    id: 38,
    altText: 'Haut du jardin',
    caption: 'Haut du jardin',
    src: jardinHaut,
  },
  {
    id: 39,
    altText: 'Le canal du Midi',
    caption: 'Le canal du Midi',
    src: canal,
  },
  {
    id: 40,
    altText: 'Les alentours - Chapelle sur la route',
    caption: 'Les alentours - Chapelle sur la route',
    src: chapelleAlentours,
  },
  {
    id: 41,
    altText: 'Verso de la chapelle',
    caption: 'Verso de la chapelle',
    src: chapelleVerso,
  },
  {
    id: 42,
    altText: 'Champ de tournesols',
    caption: 'Champ de tournesols',
    src: tournseol,
  },
  {
    id: 43,
    altText: '',
    caption: '',
    src: fleur,
  },
  {
    id: 44,
    altText: 'Ânes rencontrés lors de balades',
    caption: 'Ânes rencontrés lors de balades',
    src: anes,
  },
  {
    id: 45,
    altText: 'Superbe bâtisse dominant la colline',
    caption: 'Superbe bâtisse dominant la colline',
    src: batisse,
  },
  {
    id: 46,
    altText: 'Le lac saint-Arnaud',
    caption: 'Le lac saint-Arnaud',
    src: canal,
  },


];



class MyCarousel extends Component {
  constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
  }

  onExiting() {
      this.animating = true;
  }

  onExited() {
      this.animating = false;
  }

  next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
  }

  previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
  }



  render() {
      const { activeIndex } = this.state;
      const slides = items.map((item) => {    
          return (
              <CarouselItem
                  className="my-Carousel"
                  tag="div"
                  key={item.id}
                  onExiting={this.onExiting}
                  onExited={this.onExited}
              >
              <div className="carousel-container">
                <div className="carousel-img-container">
                  <img className="my-CarouselImage"
                    src={item.src} alt={item.altText}/>
                </div>
                <div className="carousel-text-container">
                <CarouselCaption 
                  className="carousel-caption"
                  captionHeader={item.caption} 
                  captionText={item.id}/>
                </div>
              </div>
              <div className="btn-carousel-container">
                <Link to="/">
                  <Button className="btn-carousel" color="secondary">Fermer
                  </Button>{' '}
                </Link>
              </div>
              </CarouselItem>
          );
      });
      const insta = items.map( (item) => {
        return (
          <img className="col-md-4 m-top-1" src={item.src} alt={item.altText} key={item.id}/>
        );
      });
      
      return (
          <div>
            <div  className="carousel-return-container big-screen">
              <Carousel className="trustedMechCarousel"
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
              >
                  <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
            </div>
              <div className="container small-screen">
                <div className="row">
                    {insta}
                </div>
              </div>
          </div>
      );
  }
}