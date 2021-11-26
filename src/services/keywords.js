async function fetchIBM(text) {
    const url =
      "https://cors-anywhere.herokuapp.com/api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/32ca74b4-48b2-4c39-87e2-d5ff1295fe34/v1/analyze?version=2018-09-21";
  
    const result = await fetch(
      url,
      {
        method: "POST",
        withCredentials: true,
        headers: {
          "X-API-KEY": "rfHB4fbQ1wTpxWRnCqxZzm1j9wp-QwfyBt4KaiwrJqhZ",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          text: text,
          features: {
            keywords: {
              sentiment: true,
              emotion: true,
              limit: 3,
            },
          },
          language: "es",
        },
      }
        .then((resp) => resp.json())
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        })
    );
  }
  
  export { fetchIBM };
  