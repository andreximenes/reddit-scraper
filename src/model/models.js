const Sequelize = require('sequelize')
const database = require('../config/db')

const Post = database.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:  {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const PostImage = database.define('post_image', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    postId: {

        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            // User belongsTo Company 1:1
            model: 'posts',
            key: 'id'
        }
    },
    name:  {
        type: Sequelize.STRING,
        allowNull: false
    },
    sourceUrl:  {
        type: Sequelize.STRING,
        allowNull: false
    },

})

Post.hasMany(PostImage)
PostImage.belongsTo(Post)

module.exports = {Post, PostImage};