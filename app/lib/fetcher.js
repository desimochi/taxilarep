
export const fetcher = async (url) => {
    const token =  localStorage.getItem("accessToken")
  const res = await fetch(`https://api.taxila.in/${url}`,{
    headers: {
      Authorization: `Bearer ${token}`, // set your token
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
  
    error.info = await res.json();

    error.status = res.status;
    throw error;
  }

  return res.json();
};