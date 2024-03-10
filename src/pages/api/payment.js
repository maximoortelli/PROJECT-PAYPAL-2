const paypal = require('@paypal/checkout-server-sdk');
  
// Creating an environment
let clientId = "ARVs66tYo0Z-uPltpDpEeVYhCJf15S8TkqpKQSGWybDyzXWpifYSBaxW4y6XT9bfdQKoL_e7T1xBE5MF";
let clientSecret = "EEMd1z6kSHVUux236bIK4Mviy4TM8ZlIwGeAJz15fUEWpK1KcdWxSQUrfI7lSEQAswKx5tnzxjrLMDK8";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment)

export default async function handler(req, res){
    if(req.method === "POST"){
       const request = new paypal.orders.OrdersCreateRequest()
       request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                     currency_code: "USD",
                     value: "599.99"
                },
            },
        ],
       });
       const response = await client.execute(request);

       return res.json({id: response.result.id})
    }
}