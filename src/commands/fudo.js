const fs = require("fs");

module.exports.run = async (client, message, args, member) => {
  const m = await message.channel.send("Carregando...");
  `${message.author}`;

  //Lendo o valor do arquivo contagem.txt
  fs.readFile("./src/assets/contagem.txt", function(err, data) {
    //verificando se deu erro
    if (err) {
      throw err;
    }

    //definindo o valor (pego do .txt)
    let fudo = parseInt(data);

    if (message.content.match(/(wx\!fudo)/g)) fudo = fudo + 1;
    message.delete(2000).catch(() => {});

    console.log(`${message.author}` + " Acrescentou:", fudo);
    m.edit(
      `${message.author}\nO fudo perdeu x1, no fortnite, ` + fudo + ` vezes`
    );

    const newValue = fudo + 0;

    //Incrementa o valor do txt
    fs.writeFile(
      "./src/assets/contagem.txt",
      newValue,
      { enconding: "utf-8", flag: "w" },
      function(err) {
        if (err) {
          throw err;
        } else {
          console.log("Arquivo atualizado!");
        }
      }
    );
  });
};
module.exports.help = {
  name: "fudo"
};
