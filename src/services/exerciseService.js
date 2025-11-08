const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/exercises`;


const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    }catch (err) {
        console.log(err)
    }
};

const create = async (exerciseFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};



export {
    index,
    create,
}