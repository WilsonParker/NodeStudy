module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // MySQL 에는 users 테이블 생성 됩니다
        // id 가 기본적으로 생성 됩니다
        email: {
            type: DataTypes.STRING(32),
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(32),
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false, // 필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        // 좋아요 테이블
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'});
        // 팔로워
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'followingId'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'followerId'});
    };
    return User;
}