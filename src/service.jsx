const baseURL = "http://localhost:3000/";

export async function addKaryawan(data) {
  try {
    const response = await fetch(`${baseURL}karyawan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}
