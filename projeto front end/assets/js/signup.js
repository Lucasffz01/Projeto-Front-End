// Selecting elements
const btn = document.querySelector('#verSenha');
const btnConfirm = document.querySelector('#verConfirmSenha');

const nome = document.querySelector('#nome');
const labelNome = document.querySelector('#labelNome');

const usuario = document.querySelector('#usuario');
const labelUsuario = document.querySelector('#labelUsuario');

const senha = document.querySelector('#senha');
const labelSenha = document.querySelector('#labelSenha');

const confirmSenha = document.querySelector('#confirmSenha');
const labelConfirmSenha = document.querySelector('#labelConfirmSenha');

const msgError = document.querySelector('#msgError');
const msgSuccess = document.querySelector('#msgSuccess');

// Function to update the display based on validation
const updateValidationDisplay = (element, label, isValid, errorMessage) => {
  if (isValid) {
    label.setAttribute('style', 'color: green');
    label.innerHTML = element.getAttribute('placeholder') || element.id;
    element.setAttribute('style', 'border-color: green');
  } else {
    label.setAttribute('style', 'color: red');
    label.innerHTML = `${element.getAttribute('placeholder') || element.id} *${errorMessage}`;
    element.setAttribute('style', 'border-color: red');
  }
};

// Event listeners for input validation
nome.addEventListener('keyup', () => {
  updateValidationDisplay(nome, labelNome, nome.value.length > 14, 'Insira no mínimo 15 caracteres');
});


usuario.addEventListener('keyup', () => {
  updateValidationDisplay(usuario, labelUsuario, usuario.value.length > 5, 'Insira no mínimo 6 caracteres');
});

senha.addEventListener('keyup', () => {
  updateValidationDisplay(senha, labelSenha, senha.value.length > 7, 'Insira no mínimo 8 caracteres');
});

confirmSenha.addEventListener('keyup', () => {
  updateValidationDisplay(confirmSenha, labelConfirmSenha, senha.value === confirmSenha.value, 'As senhas não conferem');
});

// Function to handle form submission
function cadastrar() {
  if (nome.value && usuario.value && senha.value && confirmSenha.value && senha.value === confirmSenha.value) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    // Display success message
    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';

    // Redirect after a delay
    setTimeout(() => {
      window.location.href = '../html/index.html';
    }, 2000);
  } else {
    // Display error message
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}

// Event listeners for password visibility toggle
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
});

btnConfirm.addEventListener('click', () => {
  let inputConfirmSenha = document.querySelector('#confirmSenha');
  inputConfirmSenha.type = inputConfirmSenha.type === 'password' ? 'text' : 'password';
});

// Additional code for form validation
// ... (keep the existing form validation code)
// Função para adicionar a máscara de data de nascimento (DD/MM/AAAA)
function formatarDataNascimento(input) {
  input.addEventListener('input', function () {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }

    if (value.length > 5) {
      value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }

    input.value = value;
  });
}
const inputDataNascimento = document.querySelector('#data');
formatarDataNascimento(inputDataNascimento);
function formatarTelefone(input) {
  // Remove caracteres não numéricos
  let numeros = input.value.replace(/\D/g, '');

  // Aplica a formatação desejada
  numeros = numeros.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1)$2-$3');

  // Atualiza o valor no input
  input.value = numeros;
}