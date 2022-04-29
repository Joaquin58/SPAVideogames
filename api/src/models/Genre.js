const { DataTypes} = require('sequelize');
module.exports = (sequelize)=>{
    sequelize.define('genre', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            // defaultVariable
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    
}