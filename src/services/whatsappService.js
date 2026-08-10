export async function sendWhatsApp(data){

  try{

    const response = await fetch("http://localhost:5000/api/whatsapp",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(data)

    });

    return await response.json();

  }

  catch(err){

    console.log(err);

  }

}