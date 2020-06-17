import React from 'react';
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';
import { HashLink as Link} from 'react-router-hash-link';


const Equippements = (props) => {    
    return (
        <Container className="m-top-3">
            <main className="equippements-page-container">

                <div className="header-equippement-page">
                    <h1 className="h1">Équippements</h1>                
                    <Link to ="/">                          
                    <Button color="info">Fermer</Button>{' '}     
                    </Link>
                </div>
                <div>
                    <h2 className="h2 sous-titre">Standard</h2>
                </div>
                <div className="equippement-item border-bottom">
                    <article>Lave-linge</article>
                </div>
                <div className="equippement-item border-bottom">
                    <article>Eau chaude</article>
                </div>
                <div className="equippement-item border-bottom">
                    <article>Fer à repasser</article>
                </div>
                <div className="equippement-item border-bottom">
                    <article>Chauffage</article>
                </div>
                <div className="equippement-item border-bottom">
                    <article>Cheminée</article>
                </div>

                <div>
                    <h2 className="h2 sous-titre">Installation</h2>
                </div>
                <div className="equippement-item border-bottom">
                    Parking gratuit sur place
                </div>
                <div className="equippement-item border-bottom">
                    Salle de sport
                    <p className="p-discret">Dans le châlet du jardin</p>
                </div>
                <div className="equippement-item border-bottom">
                    Piscine
                    <p className="p-discret">Privée ou partagée</p>
                </div>

                <div>
                    <h2 className="h2 sous-titre">Restauration</h2>
                </div>
                <div className="equippement-item border-bottom">
                    Four à micro-onde
                </div>                
                <div className="equippement-item border-bottom">
                    Four    
                </div>                
                <div className="equippement-item border-bottom">
                    Vaisselle et couverts
                </div>                
                <div className="equippement-item border-bottom">
                    Lave vaisselle
                </div>                
                <div className="equippement-item border-bottom">
                    Cuisinière
                </div>                
                <div className="equippement-item border-bottom">
                    Cuisine
                    <p className="p-discret">Espace où les voyageurs peuvent cuisiner</p>
                </div>                
                <div className="equippement-item border-bottom">
                    Cafetière
                </div>
                <div className="equippement-item border-bottom">
                    Ustensiles de cuisine de base
                    <p className="p-discret">Casseroles et poêles, huile sel et poivre</p>
                </div> 
                <div className="equippement-item border-bottom">
                    Réfrigérateur
                </div>      

                <div>
                    <h2 className="h2 sous-titre">Accès des voyageurs</h2>
                </div>
                <div className="equippement-item border-bottom">
                    Clés remises par l'hôte
                </div>   

                <div>
                    <h2 className="h2 sous-titre">Logistique</h2>
                </div>
                <div className="equippement-item border-bottom">
                    Séjours longues durées autorisés
                    <p className="p-discret">Séjours de 28 jours ou plus autorisés</p>
                </div>  

                <div>
                    <h2 className="h2 sous-titre">Chambre et salle de bain</h2>
                </div>
                <div className="equippement-item border-bottom">
                    Cintres
                </div>  
                <div className="equippement-item border-bottom">
                    Sèche-cheveux
                </div>  

                <div>
                    <h2 className="h2 sous-titre">Dispositif de sécurité</h2>
                </div>
                <div className="equippement-item border-bottom">
                    Extincteur
                </div>  
                <div className="equippement-item border-bottom">
                    Déctecteur de fumée
                </div>  

                <div>
                    <h2 className="h2 sous-titre">Non inclus</h2>
                </div>
                <div className="equippement-item border-bottom line-through-item">
                    Équippements de base
                </div>  
                <div className="equippement-item border-bottom line-through-item">
                    Télévision
                </div> 
                <div className="equippement-item border-bottom line-through-item">
                    Wi Fi
                </div>   
                <div className="equippement-item border-bottom line-through-item">
                    Entrée privée
                </div>  
                <div className="equippement-item border-bottom line-through-item">
                    Détecteur de monoxyde de carbone
                    <p className="p-discret">L'hôte n'a pas indiqué si le logement dispose d'un détecteur de monoxyde de carbone</p>
                </div>  
                <div className="equippement-item border-bottom line-through-item">
                    Climatisation
                </div>  
                <div className="equippement-item border-bottom line-through-item">
                    Shampoing
                </div>  
                <Link to ="/">                          
                    <Button color="info">Fermer</Button>{' '}     
                </Link>
            </main>
        </Container>
    );
};

export default Equippements;