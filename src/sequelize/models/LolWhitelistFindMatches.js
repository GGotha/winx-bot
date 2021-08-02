module.exports = (sequelize, DataTypes) => {
  const LolWhitelistFindMatches = sequelize.define(
    "LolWhitelistFindMatches",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      lol_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "lol_whitelist_find_matches",
    }
  );

  return LolWhitelistFindMatches;
};
