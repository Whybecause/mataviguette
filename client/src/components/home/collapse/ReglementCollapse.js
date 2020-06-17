import React from 'react';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { GiStairs} from 'react-icons/gi';
import { BsCreditCard } from 'react-icons/bs';


const ReglementCollapse = () => (

<div>
    <Button color="primary" id="toggler4" style={{ marginBottom: '1rem' }}>
        Lire la totalité du règlement
    </Button>
    <UncontrolledCollapse toggler="#toggler4">
        <CardBody>
            <p><strong>A savoir</strong></p>
            <p><GiStairs/>Le logement comprend des marches ou escaliers - Pour atteindre le séjour</p>
            <p><BsCreditCard/> Caution: en cas de dommages matériels dans le logement, vous pouvez avoir à payer jusqu'à 1000€</p>
            <p><strong>Règles supplémentaires</strong></p>
            <p>Il s'agit de notre maison de vacances. Le respect des lieux est notre seule règle.</p>
        </CardBody>
    </UncontrolledCollapse>
</div>
);

export default ReglementCollapse;