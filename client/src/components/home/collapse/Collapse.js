import React from 'react';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';

const Collapse = () => (
  <div>
    <Button color="primary" id="toggler1" style={{ marginBottom: '1rem' }}>
      ...Lire la suite
    </Button>
    <UncontrolledCollapse toggler="#toggler1">
        <CardBody>                    
            <p><strong>Le logement</strong><br/>
            Maison de caractère-Beau séjour lumineux et confortable avec une grande cheminée - 
            Terrasse de 80 m² divisée en plusieurs coins aménagés - Terrasse couverte pour les jours 
            de pluie - Terrasse sous les arbres pour les jours de canicule - Piscine privée au sel (3 x 10 m ) 
            avec alarme, transats, parasols - Chalet ''salle de muscu''- Parc arboré et clos de 4000 
            m²- Terrain de pétanque - Table de ping-pong - 11 hectares de bois privé autour - Et le 
            calme.....pas loin de la ville !
            </p>
            
            <p><strong>Accès des voyageurs</strong><br/>
            Vous aurez accès à toute la maison excepté le garage et le 2ème étage de la maison 
            réservés à nos effets personnels ( il s'agit de notre maison de famille et de vacances).
            </p>

            <p><strong>Autres remarques</strong><br/>
            IMPORTANT
            La maison n'a ni télé ni connexion wifi. Il est cependant possible d'utiliser Internet avec
            un smartphone à l'extérieur .
            </p>
        </CardBody>
    </UncontrolledCollapse>
  </div>
);

export default Collapse;
