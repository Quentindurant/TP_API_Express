const express = require('express');
const router = express.Router();
const path = require('path');

// Route GET simple pour télécharger l'image
router.get('/download', (req, res) => {
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'sticker-mural-troll-face-02-1.jpg');

    // Générer un nom de fichier avec la date actuelle
    const maintenant = new Date();
    const jour = String(maintenant.getDate()).padStart(2, '0');
    const mois = String(maintenant.getMonth() + 1).padStart(2, '0'); // +1 car les mois commencent à 0
    const annee = maintenant.getFullYear();
    const nomFichier = `image_${jour}-${mois}-${annee}.jpg`;

    // Force le téléchargement au lieu de l'affichage dans le navigateur
    res.download(imagePath, nomFichier, (err) => {
        if (err) {
            console.error('Erreur lors du téléchargement:', err);
            res.status(500).send('Erreur lors du téléchargement de l\'image');
        }
    });
});

module.exports = router;