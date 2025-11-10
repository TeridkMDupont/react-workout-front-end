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


const show = async (exerciseId) => {
  try {
    const res = await fetch(`${BASE_URL}/${exerciseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
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

const deleteExercise = async (exerciseId) => {
  try {
    const res = await fetch(`${BASE_URL}/${exerciseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};



export {
    index,
    show,
    create,
    deleteExercise,
}