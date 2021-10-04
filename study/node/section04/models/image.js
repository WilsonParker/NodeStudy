module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post)
    };
    return Image;
}