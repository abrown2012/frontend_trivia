class User {
    constructor(user){
        this.name = user.name
        this.id = user.id
        User.currentUser = this 
    }
}