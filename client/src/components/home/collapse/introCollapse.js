import React from 'react';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';

const Introcollapse = () => (
  <div>
    <Button color="primary" id="toggler3" style={{ marginBottom: '1rem' }}>
      ...Lire la suite
    </Button>
    <UncontrolledCollapse toggler="#toggler3">
        <CardBody>                    

      <p>J'adore chiner des vieux trucs et leur redonner une nouvelle vie grâce à un coup de peinture par exemple. Plus c'est moche et poussiéreux, plus j'aime :) J'aime aussi beaucoup les échanges avec mes voyageurs et partager avec eux l'amour de la nature et d'un endroit plein de charme. J'ai beaucoup de plaisir à vous répondre et malheureusement, je ne verrai pas beaucoup d'entre vous car je n'habite pas sur place (pour l'instant ! Nous l'avons appelée La Mataviguette en rassemblant les deux premières lettres des prénoms de nos fils et le ''guette'' d'Huguette, ma mère, qui nous l' a transmise. Louer notre maison nous permet de continuer à l'embellir et à la faire vivre.
      </p>
      </CardBody>
    </UncontrolledCollapse>
  </div>
);

export default Introcollapse;