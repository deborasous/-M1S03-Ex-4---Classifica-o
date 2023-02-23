class Team {
  constructor() {
    this.id = 1;
    this.arrayTeam = [];
    this.editId = null;

    this.classification = "";
  }

  salvar() {
    let team = this.readData();

    if (this.validateData(team)) {
      if (this.editId == null) {
        this.addData(team);
      } else {
        this.edit(this.editId, team);
        console.log("sdfsdhjk");
      }
      console.log("salvo");
    }
    this.table(team);

    //limpar inputs, após salvar
    document.getElementById("team").value = "";
    document.getElementById("amount").value = "";
  }

  readData() {
    //cria um objeto vazio para retornar os itens criados e cria acesso aos inputs
    let team = {};

    //máscara de moeda
    let receiveAmount = Number(document.getElementById("amount").value);
    team.amount = receiveAmount.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    team.id = this.id;
    team.classification = this.classification;
    team.teamName = document.getElementById("team").value;

    return team;
  }

  validateData(team) {
    let msg = "";

    if (team.teamName == "") {
      msg += " Informe o nome da Equipe";
    }

    if (team.amount == "") {
      msg += " O valor total de vendas";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  addData(team) {
    this.arrayTeam.push(team);
    this.id++;
    console.log("adicionado id");

    console.log("adicionado classs");
  }

  table() {
    //declara o tbody e limpa toda vez que salvo
    let tbody = document.querySelector("#tbody");
    tbody.innerText = "";

    // Percorrer o array e trazer a quantidade de obj
    for (let i = 0; i < this.arrayTeam.length; i++) {
      // criar linha na tabela
      let tr = tbody.insertRow();

      //criar colunas
      let td_id = tr.insertCell();
      let td_team = tr.insertCell();
      let td_total = tr.insertCell();
      let td_classification = tr.insertCell();

      //printar o array
      td_id.innerText = this.arrayTeam[i].id;
      td_team.innerText = this.arrayTeam[i].teamName;
      let total = (td_total.innerText = this.arrayTeam[i].amount);

      //remover a máscara de moeda colocado na readData()/ retorna o valor para o formato original do input
      let clearAppointmentAmount = total
        .replace(/[^0-9,]*/g, "")
        .replace(",", ".");
      

      if (clearAppointmentAmount <= 10000) {
        td_classification.innerText = this.arrayTeam[i].classification =
          "Bronze";
      }
      if (clearAppointmentAmount > 10000 && clearAppointmentAmount < 100000) {
        td_classification.innerText = this.arrayTeam[i].classification =
          "Prata";
      }

      if (
        clearAppointmentAmount >= 100000 &&
        clearAppointmentAmount <= 500000
      ) {
        td_classification.innerText = this.arrayTeam[i].classification = "Ouro";
      }

      if (clearAppointmentAmount > 500000) {
        td_classification.innerText = this.arrayTeam[i].classification =
          "Platinum";
      }
    }
  }
}

var team = new Team();
