const REGISTERFORM = $("#registerForm");

const LOGINFORM = $("#loginForm");
const MESSAGEFORM = $("#messageForm");
let interlocutor = null;

// on fait apl a la foction getUserList pour afficher l a listedes users

getUserList();

// ECOUTER LE CLICK

REGISTERFORM.on("submit", (e) => {
  // empeche le recharge automatique du forlmulaire

  e.preventDefault();

  // recupere les info de l'user

  let pseudo = $("#pseudo").val();

  let firstName = $("#firstname").val();

  let lastName = $("#lastname").val();

  let password = $("#password").val();

  let action = $("#action").val();

  // APL A NOTRE FONCTION

  //  dans le bouton id= action dou ilya action ausssi comm paramettre

  register(pseudo, firstName, lastName, password, action);
});

// au click sur le bouton envoyer message
MESSAGEFORM.on("submit", (e) => {
  e.preventDefault();
  // recuperation du message
  let message = $("#message").val();
  let action = $("#action").val();
  let expeditor = localStorage.getItem("iduser");
  let receiver = interlocutor;
  // appel de la fonction sendMessage
  sendMessage(expeditor, receiver, message, action);
});

// NOTRE FONCTION

function register(pseudo, firstName, lastName, password, action) {
  //  a gauche ca vient de api register( des clé), a droite ca viendra du formulaire

  let data = {
    pseudo: pseudo,

    password: password,

    firstname: firstName,

    lastname: lastName,

    action: action,
  };

  // objet qui a method post et une clé body

  let dataOption = {
    method: "post",

    // on applique la methode JSON.stringfy(), prk notre api comprenne cad prk php le comrenne cei est si haut cad let data ={...}

    body: JSON.stringify(data),
  };

  // aple fecth, elle est asynchro et s'execute en arrière plan et retour des promesse cad

  fetch("http://localhost/api_back/", dataOption)
    // silya la promesse

    .then((response) => {
      response
        .json()

        .then((data) => {
          console.log(data);
        })

        .catch((error) => {
          console.log("promesse non tenue");
        });
    })

    // en cas ou ilya pas de promess

    .catch((error) => console.log("et la promesse?"));
}

// ECOUTER LE CLICK

LOGINFORM.on("submit", (e) => {
  // empeche le recharge automatique du forlmulaire

  e.preventDefault();

  // recupere les info de l'user

  let pseudo = $("#pseudo").val();

  let password = $("#password").val();

  let action = $("#action").val();

  // APL A NOTRE FONCTION

  //  dans le bouton id= action dou ilya action ausssi comm paramettre

  // apler la fonction creee ci-dessous

  login(pseudo, password, action);
});

// fonction login

function login(pseudo, password, action) {
  console.log("ok");
  let data = {
    pseudo: pseudo,

    password: password,

    action: action,
  };

  let dataOption = {
    method: "post",

    // on applique la methode JSON.stringfy(), prk notre api comprenne cad prk php le comrenne cei est si haut cad let data ={...}

    body: JSON.stringify(data),
  };

  // aple fecth, elle est asynchro et s'execute en arrière plan et retour des promesse cad

  fetch("http://localhost/api_back/", dataOption)
    // silya la promesse

    .then((response) => {
      response
        .json()

        .then((donnee) => {
          console.log(donnee);

          // on stock dans localStorage

          localStorage.setItem("iduser", donnee.userInfo.id_user); //iduser cest la clé de setItem on le nomme comme on veut, userInfo il vient de api function connexion

          localStorage.setItem("firstname", donnee.userInfo.firstname);

          // rediriger vers

          window.location.href = "index.html";
        })

        .catch((error) => {
          console.log("erreur");
        });
    })

    // en cas ou ilya pas de promess

    .catch((error) => console.log("ilya une erreur"));
}

// fonction pour obtenir la liste des utilisateurs :

function getUserList() {
  fetch("http://localhost/api_back/getuserlist/")
    .then((response) => {
      response

        .json()

        .then((data) => {
          // console.log(data);

          // appel de printUsers data.users ilya data qui est just en haut .then(data)et users vient de la fonction getlist depuis api, fonction,  "users"=>$listeUsers qui renferme la liste des utilisateur

          printUsers(data.users);
        })

        .catch((error) => console.log(error));
    })

    .catch((error) => console.log(error));
}

// function pour afficher la liste de users

function printUsers(listUser) {
  listUser.forEach((element) => {
    // creer une balise p en lui ajoutant le prenom de l'utilisateur comme texte

    // let p = $("p").append(element.firstname);

    let p = document.createElement("p");

    p.textContent = element.firstname;

    // ajouter un identifant a chaque paragraph correspondant a l'identifiant de chak utilisateur

    p.id = element.id_user;

    // on veut creer le click sur chak p

    p.addEventListener("click", () => {
      getListMessage(localStorage.getItem("iduser"), p.id);
      interlocutor = p.id;
    });

    // on ajoute le paragraphe comme enfant de la div avec la class user_list

    $("#user_list").append(p);
  });
}

// fonctionn pour la liste des msg des utilisateur

function getListMessage(expeditor, receiver) {
  fetch("http://localhost/api_back/geListMessage/" + expeditor + "/" + receiver)
    .then((response) => {
      response
        .json()

        .then((data) => {
          // traitement

          printMessages(data.listMessage); // listMessage viens de api fonction getlistmessage

          // console.log(data);
        })

        .catch((error) => console.log(error));
    })

    .catch((error) => console.log(error));
}

// fonction pour afficher la lister des messages en deux ligne

function printMessages(listMessage) {
  document.getElementById("discution").innerHTML = "";

  listMessage.forEach((element) => {
    // on affiche le msg de lexpediteur a droite reiver à gauche

    // creer une div et un paragraphe

    let div = document.createElement("div");

    let p = document.createElement("p");

    // ajouter le paragr a la div

    div.append(p);

    // on affect du text au paragrap

    p.textContent = element.message;

    // si celui qui ecrit le message est le meme stocker dans localStorage, cest l'expediteur

    if (element.expeditor_id == localStorage.getItem("iduser")) {
      div.className = "expediteur";
    } else {
      div.className = "recepteur";
    }

    $("#discution").append(div);
  });
}
// fonction pour envoyer un message
function sendMessage(expeditor, receiver, message, action) {
  let data = {
    expeditor: expeditor,
    receiver: receiver,
    message: message,
    action: action,
  };

  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };
  // on envoi la requete vers l'api
  fetch("http://localhost/api_back/", dataOption)
    .then((reponse) => {
      reponse.json().then((data) => {
        // console.log(data);
        getListMessage(expeditor, receiver);
      });
    })
    .catch((error) => console.log(error));
}
