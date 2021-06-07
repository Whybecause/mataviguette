# mataviguette
Login/Register
Hashage du mot de passe dans la BDD

Authentification basée sur un token

Confirmation création compte par l'envoi automatique d'un email de confirmation (associé à un token de confirmation)

Bouton permettant de réenvoyer l'email de confirmation s'il a expiré

Bouton permettant de recevoir un mail pour changer un mot de passe oublié

Page utilisateur
Informations sur le détail de la location effectuée

Page Profil Utilisateur
Possibilité de modifier le mot de passe actuel

Page ADMIN (pour utilisateurs ayant ce rôle uniquement)
Visualisation des détails de la location proposée avec possibilité de les modifier

Visualisation de toutes les réservations effectuées sur cette offre

Bouton associé à chaque réservation permettant d'envoyer un email au locataire

Réservation
Les dates proposées sont synchronisées sur un google calendar dédié

Utilisation de l'API Google calendar pour désactiver la possibilité de booker des dates déjà prises

L'API est également utilisée pour sauvegarder les dates réservées dans le google calendar

API Stripe pour gérer les paiements + email de confirmation automatique avec récapitulation des infos de la location et facture

Commentaires
Possible de poster un commentaire si connecté

L'ADMIN peut supprimer les commentaires

Emplacement
Utilisation de Google Map API pour afficher l'emplacement de la location

Contacter l'hôte
Formulaire à remplir qui envoie un mail à l'hôte (nodemailer)
