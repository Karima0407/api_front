const REGISTERFORM = $("#registerForm");
const LOGINFORM = $("#loginForm");
REGISTERFORM.on("submit", (e) => {
  // pour empecher l'envoi du formulaire
  e.preventDefault();
  //recuperer les infos de user
  let pseudo = $("#pseudo").val();
  let firstName = $("#firstname").val();
  let lastName = $("#lastname").val();
  let password = $("#password").val();
  let action = $("#action").val();
  // appel de la fonction register
  register(pseudo, firstName, lastName, password, action);
});

function register(pseudo, firstName, lastName, password, action) {
  let data = {
    pseudo: pseudo,
    password: password,
    firstname: firstName,
    lastname: lastName,
    action: action,
  };

  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };

  // appel de la fonction fetch
  fetch("http://localhost/api_back/", dataOption)
    .then((reponse) => {
      reponse
        .json()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("promesse non tenue...");
        });
    })
    .catch((error) => console.log("tu me l'avais promis en tout cas"));
}
LOGINFORM.on("submit", (e) => {
  // pour empecher l'envoi du formulaire
  e.preventDefault();
  //recuperer les infos de user
  let pseudo = $("#pseudo").val();
  let password = $("#password").val();
  let action = $("#action").val();
  // appel de la fonction register
  login(pseudo, password, action);
});
// fonction login
function login(pseudo, password, action) {
  let data = {
    pseudo: pseudo,
    password: password,
    action: action,
  };

  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };
  fetch("http://localhost/api_back/", dataOption)
    .then((reponse) => {
      reponse
        .json()
        .then((data) => {
          console.log(data);
          // localStorage.setItem("iduser",)
          window.location.href("");
        })
        .catch((error) => error);
    })
    .catch((err) => console.log("il ya une erreur"));
}
