const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        created(value){
          if(value.length === 0){
            throw new Error ('Debe de haber algo')
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate:{isDate: true}
      
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate:{
        max:5,
        min:0
      }
      
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        hayalgo(value){
          if(value.length === 0 ) throw new Error ('Debe de haber algo')
        }
      }
    },
    image:{
      type:DataTypes.STRING,
      allowNull: true
    },
    CreatedInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },{
    timestamps: false
  }); 
};
