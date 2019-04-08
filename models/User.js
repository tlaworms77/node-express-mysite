var mongoose = require( 'mongoose' );
var autoIncrement = require( 'mongoose-auto-increment' )

mongoose.connect('mongodb://localhost:27017/webdb', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// 스키마 객체만들어서 일정한 형식으로 보낼 수 있게
var user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    joinDate: {
        type: Date,
        default: Date.now()
    }
},{
    versionKey: false
});


autoIncrement.initialize(mongoose.connection);
user.plugin(autoIncrement.plugin, 'User'); // 어떤 컬랙션인지 잘맞춰주기
// 대소문자 구분안한다
module.exports = mongoose.model('User', user);