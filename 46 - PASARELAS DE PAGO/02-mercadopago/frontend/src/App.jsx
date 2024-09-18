import "./App.css";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

function App() {
  //USUARIO COMPRADOR
  initMercadoPago("TEST-4aeab724-a58d-44d8-9b3a-18bef67d3c7d", {
    locale: "es-AR",
  });

  const [products, setProducts] = useState([]);
  const [preferenceIds, setPreferenceIds] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/products");
      const response = await res.json();
      setProducts(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const createPreference = async (prod) => {
    try {
      const body = {
        title: prod.name,
        quantity: 1,
        price: prod.price,
      };
      const res = await fetch("http://localhost:8080/create-preference", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      console.log("response api", response);
      const { id } = response;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updatePreferenceIds = async () => {
    const ids = {};
    for (const prod of products) {
      const preferenceId = await createPreference(prod);
      ids[prod._id] = preferenceId;
      console.log("ids", ids);
    }
    setPreferenceIds(ids);
  };

  useEffect(() => {
    if (products.length > 0) updatePreferenceIds();
  }, [products]);

  return (
    <>
      {products &&
        products.map((prod) => {
          return (
            <div key={prod._id} style={{ marginBottom: "20px" }}>
              {preferenceIds && (
                <>
                  <img width={100} height={100} src={prod.image} alt="no img" />
                  <h3>{prod.name}</h3>
                  <p>${prod.price}</p>
                  {preferenceIds[prod._id] ? (
                    <Wallet
                      initialization={{ preferenceId: preferenceIds[prod._id] }}
                      customization={{ texts: { valueProp: "smart_option" } }}
                    />
                  ) : (
                    <p>Cargando botón de pago...</p>
                  )}
                </>
              )}
              <p>-</p>
            </div>
          );
        })}
    </>
  );
}

export default App;
