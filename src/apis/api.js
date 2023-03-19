import axios from 'axios';

const getData = async () => {
  try {
    const response = await axios.get('/mock_data.json');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getData;
