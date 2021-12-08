import axios from 'axios'

axios.create({
	baseURL: "https://squad10-aninfo-backend.herokuapp.com"
})

export default axios