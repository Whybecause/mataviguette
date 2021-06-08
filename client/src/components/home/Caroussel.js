import React from 'react';
import {  Box } from '@chakra-ui/react';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

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

const images = [
  {
      originalAlt: 'La maison',
      description: 'La maison vue de la piscine',
      original: pic1,
      thumbnail: pic1,
  },
  {
      originalAlt: 'La piscine',
      description: 'La piscine',
      original: piscine,
      thumbnail: piscine,
  },
  {
      originalAlt: 'Coin-repas dans la cuisine',
      description: 'Coin-repas dans la cuisine',
      original: repas,
      thumbnail: repas,
  },
  {
    originalAlt: 'Salle de sport du châlet',
    description: 'Salle de sport du châlet',
    original: sport,
    thumbnail: sport,
  },
  {
    originalAlt: "Petit salon d'été sur la terrasse couverte",
    description: "Petit salon d'été sur la terrasse couverte",
    original: salonTerrasse,
    thumbnail: salonTerrasse,
  },
  {
    originalAlt: 'Cuisine équipée',
    description: 'Cuisine équipée',
    original: cuisine,
    thumbnail: cuisine,
  },
  {
    originalAlt: 'Vue de la cuisine sur le jardin',
    description: 'Vue de la cuisine sur le jardin',
    original: cuisineVue,
    thumbnail: cuisineVue,
  },
  {
    originalAlt: 'Grand réfrigérateur-congélateur',
    description: 'Grand réfrigérateur-congélateur',
    original: frigo,
    originalHeight: '50px',
    thumbnail: frigo,
  },
  {
    originalAlt: 'Placard à vaisselle caché dans le mur de la cuisine',
    description: 'Placard à vaisselle caché dans le mur de la cuisine',
    original: vaisselle,
    thumbnail: vaisselle,
  },
  {
    
    originalAlt: 'Juste devant la maison- A droite, la porte de la cuisine',
    description: 'Juste devant la maison- A droite, la porte de la cuisine',
    original: maisonDevant,
    thumbnail: maisonDevant,
  },
  {
    
    originalAlt: 'Salon lumineux - Chaîne Hifi (radio-CD-USB)',
    description: 'Salon lumineux - Chaîne Hifi (radio-CD-USB)',
    original: salon,
    thumbnail: salon,
  },
  {
    
    originalAlt: 'Séjour - Grande cheminée',
    description: 'Séjour - Grande cheminée',
    original: sejour,
    thumbnail: sejour,
  },
  {
    
    originalAlt: 'Salon - Canapé moelleux',
    description: 'Salon - Canapé moelleux',
    original: salonCanape,
    thumbnail: salonCanape,
  },
  {
    
    originalAlt: 'Terrasse couverte - Table pour les jours de pluie ou les soirées fraîches',
    description: 'Terrasse couverte - Table pour les jours de pluie ou les soirées fraîches',
    original: terrasseCouverte,
    thumbnail: terrasseCouverte,
  },
  {
    
    originalAlt: 'Terrasse couverte',
    description: 'Terrasse couverte',
    original: terrasseCouverte2,
    thumbnail: terrasseCouverte2,
  },
  {
    
    originalAlt: 'Chambre blanche',
    description: 'Chambre blanche',
    original: chambreBlanche,
    thumbnail: chambreBlanche,
  },
  {
    
    originalAlt: 'Chambre blanche et sa cheminée rangements + une armoire penderie-lingerie non visible',
    description: 'Chambre blanche et sa cheminée rangements + une armoire penderie-lingerie non visible',
    original: chambreCheminee,
    thumbnail: chambreCheminee,
  },
  {
    
    originalAlt: 'Chambre blanche avec vue sur le parc',
    description: 'Chambre blanche avec vue sur le parc',
    original: chambreVue,
    thumbnail: chambreVue,
  },
  {
    
    originalAlt: "Chambre rose - Armoire de rangement - Accès à l'extérieur à l'arrière de la maison",
    description: "Chambre rose - Armoire de rangement - Accès à l'extérieur à l'arrière de la maison",
    original: chambreRose,
    thumbnail: chambreRose,
  },
  {
    
    originalAlt: 'Chambre rose - Un coin toilette',
    description: 'Chambre rose - Un coin toilette',
    original: chambreWC,
    thumbnail: chambreWC,
  },
  {
    
    originalAlt: 'Chambre rose - 2 lits à serrer ou à espacer...',
    description: 'Chambre rose - 2 lits à serrer ou à espacer...',
    original: chambreLits,
    thumbnail: chambreLits,
  },
  {
    
    originalAlt: 'Détails du mur',
    description: 'Détails du mur',
    original: chambreMurs,
    thumbnail: chambreMurs,
  },
  {
    
    originalAlt: 'Salle de bain',
    description: 'Salle de bain',
    original: sdb,
    thumbnail: sdb,
  },
  {
    
    originalAlt: 'Baignoire et pare-douche',
    description: 'Baignoire et pare-douche',
    original: baignoire,
    thumbnail: baignoire,
  },
  {
    
    originalAlt: "WC indépendant à l'étage des deux chambres et du séjour",
    description: "WC indépendant à l'étage des deux chambres et du séjour",
    original: wcEtage,
    thumbnail: wcEtage,
  },
  {
    
    originalAlt: 'Au RDC, "dortoir" 4 couchages',
    description: 'Au RDC, "dortoir" 4 couchages',
    original: dortoir,
    thumbnail: dortoir,
  },
  {
    
    originalAlt: 'Derrière le mur blanc, un cabinet de toilette...',
    description: 'Derrière le mur blanc, un cabinet de toilette...',
    original: dortoirWC,
    thumbnail: dortoirWC,
  },
  {
    originalAlt: '2 lits superposés et 2 lits gigogne',
    description: '2 lits superposés et 2 lits gigogne',
    original: dortoirLits,
    thumbnail: dortoirLits,
  },
  {
    originalAlt: 'Spacieux - un placard de rangement - Accès direct aux terasses',
    description: 'Spacieux - un placard de rangement - Accès direct aux terasses',
    original: dortoirPlacard,
    thumbnail: dortoirPlacard,
  },
  {
    originalAlt: 'Petit cabinet de toilette attenant au "dortoir"',
    description: 'Petit cabinet de toilette attenant au "dortoir"',
    original: dortoirWC2,
    thumbnail: dortoirWC2,
  },
  {
    originalAlt: "Cabinet de toilette - il y a un autre WC indépendant à l'étage des 2 autres chambres",
    description: "Cabinet de toilette - il y a un autre WC indépendant à l'étage des 2 autres chambres",
    original: wcRdc,
    thumbnail: wcRdc,
  },
  {
    originalAlt: 'Porte du dortoir-A droite, le cabinet de toilette',
    description: 'Porte du dortoir-A droite, le cabinet de toilette',
    original: dortoirPorte,
    thumbnail: dortoirPorte,
  },
  {
    originalAlt: 'De la cuisine au séjour',
    description: 'De la cuisine au séjour',
    original: cuisineEscalier,
    thumbnail: cuisineEscalier,
  },
  {
    originalAlt: 'Terrasse de la cuisine',
    description: 'Terrasse de la cuisine',
    original: cuisineTerrasse,
    thumbnail: cuisineTerrasse,
  },
  {
    originalAlt: "l'escalier menant au séjour",
    description: "l'escalier menant au séjour",
    original: sejourEscalier,
    thumbnail: sejourEscalier,
  },
  {
    originalAlt: 'Chalet salle de "sport"',
    description: 'Chalet salle de "sport"',
    original: chalet,
    thumbnail: chalet,
  },
  {
    originalAlt: 'En haut du parc',
    description: 'En haut du parc',
    original: parcHaut,
    thumbnail: parcHaut,
  },
  {
    originalAlt: 'Haut du jardin',
    description: 'Haut du jardin',
    original: jardinHaut,
    thumbnail: jardinHaut,
  },
  {
    originalAlt: 'Le canal du Midi',
    description: 'Le canal du Midi',
    original: canal,
    thumbnail: canal,
  },
  {
    originalAlt: 'Les alentours - Chapelle sur la route',
    description: 'Les alentours - Chapelle sur la route',
    original: chapelleAlentours,
    thumbnail: chapelleAlentours,
  },
  {
    originalAlt: 'Verso de la chapelle',
    description: 'Verso de la chapelle',
    original: chapelleVerso,
    thumbnail: chapelleVerso,
  },
  {
    originalAlt: 'Champ de tournesols',
    description: 'Champ de tournesols',
    original: tournseol,
    thumbnail: tournseol,
  },
  {
    originalAlt: 'Tournesol',
    description: 'Tournesol',
    original: fleur,
    thumbnail: fleur,
  },
  {
    originalAlt: 'Ânes rencontrés lors de balades',
    description: 'Ânes rencontrés lors de balades',
    original: anes,
    thumbnail: anes,
  },
  {
    originalAlt: 'Superbe bâtisse dominant la colline',
    description: 'Superbe bâtisse dominant la colline',
    original: batisse,
    thumbnail: batisse,
  },
  {
    originalAlt: 'Le lac saint-Arnaud',
    description: 'Le lac saint-Arnaud',
    original: canal,
    thumbnail: canal,
  }
];

const Caroussel = () => {

  return (
    <Box pr='5' pl='5' className="form-container small-page-height">
        <ImageGallery items={images} showIndex={true} />
    </Box>
  )
}

export default Caroussel;
