# Personal Website Back End

Site personnel : [https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr/extranet/Site%20perso/htmlfr/index.html](https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr/extranet/Site%20perso/htmlfr/index.html)

## Render 

Le site est hébergé sur Render, en utilisant la formule gratuite. C’est pratique, mais ça implique que le serveur se met en veille après 15 minutes d’inactivité. Du coup, au premier chargement (surtout pour le chat ou le formulaire de contact), il peut y avoir un petit délai de 15 à 30 secondes.

Pour limiter ce souci, j’ai mis en place un système de ping automatique, dès qu’un utilisateur arrive sur le site, un ping est envoyée pour “réveiller” le serveur en arrière-plan pendant que l'utilisateur se balade.
Ce délai ne concerne que les tout premiers visiteurs après une mise en veille. Une fois le back-end actif, les autres utilisateurs peuvent l’utiliser sans aucun temps d’attente.

## Chat

Pour le chat, e voulais conserver un historique des messages envoyés. Plutôt que de mettre en place une base de données (inutile pour un petit site perso), j’ai utilisé un gist pour stocker l’historique dans un simple fichier texte. Comme très peu de gens vont probablement utiliser le chat, ça suffisait largement pour mes besoins.

## CI/CD

Le déploiement du back-end sur Render est connecté automatiquement à GitHub, ce qui me permet de le mettre à jour facilement.

# Personal Website Back End

Personal website: [https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr/extranet/Site%20perso/htmlfr/index.html](https://mohamed-khalil-mehalli-etu.pedaweb.univ-amu.fr/extranet/Site%20perso/htmlfr/index.html)

## Render

The site is hosted on Render, using the free plan. It's convenient, but it means the server goes to sleep after 15 minutes of inactivity. As a result, the initial load (especially for the chat or contact form) may take a little time, usually around 15 to 30 seconds.

To reduce this issue, I implemented an automatic ping system: as soon as a user lands on the site, a ping is sent to "wake up" the server in the background while the user navigate . This delay only affects the first visitors after the backend has been idle. Once it's awake, other users can access all features instantly.

## Chat

For the chat feature, I wanted to store the message history.  Instead of setting up a database (which felt unnecessary for a small personal site), I used a  gist to store the history in a simple text file.  
Since very few people will likely use the chat, this lightweight solution was more than enough.

## CI/CD

The backend deployment on Render is automatically connected to GitHub, which makes updates easy to manage.