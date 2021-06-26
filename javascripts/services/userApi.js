class UserApi {
    static fetchUsers() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(json => {
            json.forEach(user => {
                User.findOrCreateByName(user)
            }) 
        })
        .catch(this.handleError)
    }

    static handleError(error) {
        console.log(error)
    }

    static fetchUser(){
        const data = {
            name: userName().value
        }  
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
            User.findOrCreateByName(json)
        })
    }
}