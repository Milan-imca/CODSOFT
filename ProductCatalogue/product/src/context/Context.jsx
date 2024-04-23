import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer, } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const products = [
    {
      id: 1,
      name: "Pencil",
      price: "10",
      image: "https://images.pexels.com/photos/159752/pencil-office-design-creative-159752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Pen",
      price: "15",
      image: "https://images.pexels.com/photos/4034475/pexels-photo-4034475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Notebook",
      price: "5",
      image: "https://images.unsplash.com/photo-1623697899811-f2403f50685e?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 11,
      name: "Paintbrush Set",
      price: "25",
      image: "https://m.media-amazon.com/images/I/815M6utnCVL.jpg"
    },
    {
      id: 12,
      name: "Watercolor Paint Set",
      price: "30",
      image: "https://www.hatke.co.in/cdn/shop/products/colore-watercolor-painting-kit-24-colors-707578.jpg?v=1703021998"
    },
    {
      id: 13,
      name: "Sketchbook",
      price: "10",
      image: "https://rukminim2.flixcart.com/image/850/1000/koynr0w0/sketch-pad/h/8/3/32-hardback-sketchbook-120-gsm-380-mm-x-260-mm-high-quality-original-imag3at8nwjkjfpt.jpeg?q=90&crop=false"
    },
    {
      id: 14,
      name: "Canvas",
      price: "15",
      image: "https://m.media-amazon.com/images/I/71Kbb4MG1cL._AC_UF894,1000_QL80_DpWeblab_.jpg"
    },
    {
      id: 15,
      name: "Charcoal Set",
      price: "8",
      image: "https://www.rangbeerangee.com/wp-content/uploads/2021/05/Camlin-Charcoal-Pencils-Set-of-3-Pieces.jpg"
    },
    {
      id: 16,
      name: "Acrylic Paint Set",
      price: "35",
      image: "https://anandhastationery.in/wp-content/uploads/2023/12/Mont-Marte-Acrylic-Colour-Pastel-Paint-Set-48pc-x-36ml.jpg"
    },
    {
      id: 17,
      name: "Drawing Pens",
      price: "12",
      image: "https://images-cdn.ubuy.co.in/633b991d75e0ee38c80aef6f-mr-pen-drawing-pens-black-multiliner.jpg"
    },
    {
      id: 19,
      name: "Oil Pastels",
      price: "10",
      image: "https://images-cdn.ubuy.co.in/646f28d89673f07afb213ce2-paul-rubens-oil-pastels-set-48-colors.jpg"
    },
    {
      id: 20,
      name: "Brush Pens",
      price: "50",
      image: "https://i.etsystatic.com/18059994/r/il/e55a5b/4229851102/il_fullxfull.4229851102_kdr8.jpg"
    }
  ];


  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);


  return (
    <Cart.Provider value={{ state, dispatch }}>
      {children}
    </Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
  return useContext(Cart);
}

