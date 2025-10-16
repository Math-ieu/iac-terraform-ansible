# Projet Flask - Gestion de tâches

![Démo de l'application](/sample/capture.png)

## Description

Cette application Flask permet de gérer des tâches avec une API REST.  
Elle utilise **MySQL** pour la base de données et peut être déployée sur un serveur distant via **Terraform** et configurée avec **Ansible**.

---

## Prérequis

- Python 3.12
- Virtualenv
- MySQL
- Terraform
- Ansible
- Nginx (optionnel pour le reverse proxy)

---

## Déploiement Infrastructure avec Terraform

1. Initialiser Terraform :

```bash
terraform init
````

2. Vérifier le plan :

```bash
terraform plan
```

3. Appliquer le plan pour créer les ressources (EC2, RDS, etc.) :

```bash
terraform apply
```

---

## Configuration Serveur avec Ansible

1. Vérifier la connectivité :

```bash
ansible all -m ping -i inventory.ini
```

2. Déployer la configuration (packages, utilisateurs, etc.) :

```bash
ansible-playbook -i inventory.ini playbook.yml
```

---

## Installation et lancement de Flask

1. Se connecter au serveur :

```bash
ssh ubuntu@<IP_SERVEUR>
```

2. Aller dans le dossier du projet :

```bash
cd /var/www/flask_app
```

3. Activer l'environnement virtuel :

```bash
source venv/bin/activate
```

4. Installer les dépendances :

```bash
pip install -r requirements.txt
```

5. Lancer l'application Flask :

```bash
python app.py
```

6. (Optionnel) Pour lancer Flask en tant que service système :

```bash
sudo systemctl start flask
sudo systemctl enable flask
sudo systemctl status flask
```

---

## Commandes utiles

* Vérifier si Flask écoute sur le port 5000 :

```bash
sudo ss -tulnp | grep 5000
```

* Tester la santé de l'application :

```bash
curl http://127.0.0.1:5000/health
```

* Redémarrer le service Flask :

```bash
sudo systemctl restart flask
```

* Vérifier les logs Nginx :

```bash
sudo tail -f /var/log/nginx/flask_error.log
```

---

## Structure du projet

```
.
├── ansible
│   ├── db_config.json
│   ├── inventory.ini
│   ├── playbook.yml
│   └── roles
│       └── flask_app
│           ├── tasks
│           │   └── main.yml
│           └── templates
│               ├── flask.service.j2
│               └── nginx.conf.j2
├── app
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── static
│   │   ├── script.js
│   │   └── style.css
│   └── templates
│       └── index.html
├── LICENSE
├── README.md
├── sample
│   └── capture.png
├── terraform
│   ├── ec2.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── providers.tf
│   ├── terraform.tfstate
│   ├── terraform.tfstate.backup
│   └── variables.tf
└── txt.txt
```

---

## API Endpoints

* `GET /api/tasks` : Récupérer toutes les tâches
* `POST /api/tasks` : Créer une nouvelle tâche
* `PUT /api/tasks/<id>` : Mettre à jour une tâche
* `DELETE /api/tasks/<id>` : Supprimer une tâche
* `GET /health` : Vérifier la santé de l'application

---

## Auteur

Mathieu AKAKPO-DJAKPATA 
