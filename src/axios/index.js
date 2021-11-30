import axios from 'axios'
export default axios.create({
baseURL: 'http://localhost:8080'
//baseURL: 'https://r2d2.roboticamisiones.com/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='
})