import axios from 'axios';

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'da43007237bd956b3451608d1b507f9c';

export const getWeatherData = async (cityname,unit) => {
    try {
        const {data} = await axios.get(baseUrl + `units=${unit}&q=${cityname}&appid=${apiKey}`);
        return data;
    }catch(error) {
        throw error;
    }

}