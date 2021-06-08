class UserApi {
    static fetchUsers() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }
}