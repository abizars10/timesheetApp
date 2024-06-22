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

export async function getKaryawan() {
  try {
    const response = await fetch(`${baseURL}karyawan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

///proyek
export async function getProyek() {
  try {
    const response = await fetch(`${baseURL}proyek`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}
export async function addProyek(params) {
  try {
    const response = await fetch(`${baseURL}proyek`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    return "success";
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

export async function getKegiatan() {
  try {
    const response = await fetch(`${baseURL}kegiatan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function addKegiatan(params) {
  console.log(params, "1111111111111111");
  try {
    const response = await fetch(`${baseURL}kegiatan`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    return "success";
  } catch (err) {
    console.log(err);
  }
}
