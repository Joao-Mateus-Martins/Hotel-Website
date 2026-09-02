# 🏨 Vista Mar Hotel — Sistema de Reservas

Crie uma apresentação profissional para um projeto de **site completo de hotel e sistema de reservas**, desenvolvido com foco em uma experiência moderna, responsiva e intuitiva.

O projeto **Vista Mar Hotel** possui uma interface elegante para apresentação do hotel, busca de suítes e processo de reserva, conectando o front-end a um back-end em PHP e banco de dados MySQL.

## ✨ Funcionalidades

* 🏨 Página inicial com apresentação do hotel
* 🔎 Motor de busca de suítes
* 📅 Busca por data de check-in e check-out
* 👥 Seleção da quantidade de hóspedes
* 🛏️ Listagem dinâmica de suítes disponíveis
* 🖼️ Fotos e informações das suítes
* 🛎️ Visualização detalhada das acomodações
* 📋 Sistema de reservas
* 🚫 Validação de disponibilidade para evitar reservas conflitantes
* 💬 Formulário de contato
* 📧 Newsletter
* 📱 Layout totalmente responsivo
* 🎨 Interface moderna e elegante

## 🛠️ Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* Fetch API / AJAX
* Bootstrap Icons

### Back-end

* PHP
* PDO
* MySQL

## ⚙️ Funcionamento

O usuário informa as datas de entrada e saída e a quantidade de hóspedes. O JavaScript envia esses dados para o back-end utilizando `fetch/AJAX`.

O PHP consulta o banco de dados MySQL e verifica:

* capacidade da suíte;
* disponibilidade no período selecionado;
* possíveis reservas conflitantes.

Após a consulta, os resultados são apresentados dinamicamente na interface.

O usuário também pode acessar os detalhes de uma suíte e realizar uma reserva. Antes de salvar a reserva, o sistema realiza uma nova validação de disponibilidade para evitar **overbooking**.

## 📂 Estrutura do projeto

```text
hotel-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── php/
│   ├── config.php
│   ├── search.php
│   ├── suite_detail.php
│   └── reserve.php
├── sql/
│   └── database.sql
└── README.md
```

## 💻 Como executar

O projeto pode ser executado localmente utilizando **XAMPP, WAMP ou MAMP**.

1. Clone este repositório.
2. Coloque a pasta do projeto dentro do `htdocs`.
3. Inicie o Apache e o MySQL.
4. Abra o phpMyAdmin.
5. Importe o arquivo `sql/database.sql`.
6. Configure as credenciais do banco em `php/config.php`.
7. Acesse:

```text
http://localhost/hotel-site/
```

Também é possível utilizar o servidor embutido do PHP:

```bash
php -S localhost:8000
```

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido para praticar e demonstrar conhecimentos em **desenvolvimento web Full Stack**, integração entre front-end e back-end, consumo de endpoints, manipulação de banco de dados e desenvolvimento de sistemas com funcionalidades reais.

## 🚀 Próximas melhorias

* Painel administrativo
* Gerenciamento de suítes
* Gerenciamento de reservas
* Sistema de login para hóspedes
* Integração com gateway de pagamento
* Envio automático de e-mail de confirmação
* Dashboard administrativo
* Melhorias de segurança e autenticação

---

### 👨‍💻 Desenvolvido por João Mateus

Projeto desenvolvido como parte da minha evolução no desenvolvimento **Full Stack**, buscando aplicar na prática conceitos de HTML, CSS, JavaScript, PHP e MySQL.

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!
