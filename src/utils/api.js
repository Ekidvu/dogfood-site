
class Api {
    #baseUrl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponce(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getProductsList(), this.getUserInfo()])
    }

    getProductsList() {
        return fetch(`${this.#baseUrl}/products`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    search(searchQuery) {
        return fetch(`${this.#baseUrl}/products/search?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    setUserInfo({name, about}) {
        return fetch(`${this.#baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({name, about})
        })
            .then(this.#onResponce)
    }

    changeLikeProductStatus(productID, like) {
        return fetch(`${this.#baseUrl}/products/likes/${productID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponce)
    }  

}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4YTgiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQzLCJleHAiOjE3MTAzMzg0NDN9.vWpyVuDwcr2p5NJW6DekvOaNxKfdrAGN6ndwX7fTqwc',
    }
})

export default api



