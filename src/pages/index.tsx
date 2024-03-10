import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-4xl text-center my-10 justify-center">Paypal project</h1>
      <PayPalScriptProvider
        options={{
          clientId:"ARVs66tYo0Z-uPltpDpEeVYhCJf15S8TkqpKQSGWybDyzXWpifYSBaxW4y6XT9bfdQKoL_e7T1xBE5MF",
        }}
      >
        <PayPalButtons
          createOrder={async () => {
            try {
              const res = await axios({
                url: "http://localhost:3000/api/payment",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              return res.data.id; // Asegúrate de que tu API de pago devuelva un orderID
            } catch (error) {
              console.log(error);
            }
          }}
          onCancel={(data) => console.log("Compra cancelada")}
          onApprove={async(data, actions) => {
            console.log(data)
            actions.order?.capture()
          }}
          style={{ layout: "horizontal", color: "blue" }}
        />
      </PayPalScriptProvider>
    </main>
  );
}
