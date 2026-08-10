export async function sendBookingEmail(booking) {

  try {

    const response = await fetch("http://localhost:5000/api/email",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(booking)

    });

    return await response.json();

  } catch(err){

    console.log(err);

  }

}