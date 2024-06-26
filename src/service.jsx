const baseURL = "http://localhost:3000/";

// karyawan
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

export async function deleteKaryawan(id) {
  try {
    const response = await fetch(`${baseURL}karyawan/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return "success";
  } catch (err) {
    console.log(err);
    return "error";
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

export async function deleteProyek(id) {
  try {
    const response = await fetch(`${baseURL}proyek/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return "success";
  } catch (err) {
    console.log(err);
    return "error";
  }
}

// Kegiatan
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

export async function deleteKegiatan(id) {
  try {
    const response = await fetch(`${baseURL}kegiatan/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return "success";
  } catch (err) {
    console.log(err);
    return "error";
  }
}
