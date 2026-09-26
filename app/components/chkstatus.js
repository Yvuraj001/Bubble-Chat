const chkstatus = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_POST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    return response.ok;
  } catch (e) {
    console.log("Server is not running", e.message);
    return false;
  }
};

export default chkstatus;
