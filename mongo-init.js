db = db.getSiblingDB("meuespresso");

db.createCollection("users");
db.createCollection("products");

db.users.insertMany([
  {
    userID: "446c5a85-f243-49f5-b31b-90e34e982411",
    email: "christopher@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    name: "Christopher Gonçalves",
    address: "Avenida Castelo Branco",
    addressNumber: 254,
    addressComplement: "Próximo a estação",
    cart: [
      {
        cartID: "d92e4cc8-414e-492c-8932-28830775652b",
        productID: "d5321891-f36c-462b-8a77-b718cfab3205",
        name: "PARIS ESPRESSO (10 CÁPSULAS)",
        price: 34.0,
        quantity: 1,
        image:
          "https://www.nespresso.com/shared_res/agility/n-components/B2C-enriched-pdp-wex-2022/paris-espresso/main-image_L.png",
      },
    ],
    orders: [
      {
        orderID: "0b8e0803-71f6-4ada-a0ad-bacd77493a9b",
        productID: "b14fb0d8-6afc-4d5b-9b44-14b29189798b",
        name: "STOCKHOLM FORTISSIO LUNGO (10 CÁPSULAS)",
        price: 35.0,
        quantity: 3,
        image:
          "https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-sleeves/ol/indonesia_XL.png",
        address: "Avenida Castelo Branco",
        addressNumber: 254,
        addressComplement: "Próximo a estação",
        shipping: 12.0,
        deliveredAt: "2023-09-08T18:36:10.656Z",
        createdAt: "2023-09-08T18:25:27.892Z",
      },
      {
        orderID: "49f82597-0b4f-4b0f-a88b-24b688111794",
        productID: "4bac3191-b074-47bf-b043-26964fe88176",
        name: "TOKYO VIVALTO LUNGO (10 CÁPSULAS)",
        price: 37.0,
        quantity: 1,
        image:
          "https://www.nespresso.com/shared_res/agility/global/coffees/ol/sku-main-info-product/vaniglia_2x.png",
        address: "Avenida Castelo Branco",
        addressNumber: 254,
        addressComplement: "Próximo a estação",
        shipping: 12.0,
        createdAt: "2023-09-08T18:25:27.892Z",
      },
    ],
  },
  {
    userID: "3e6417e4-958d-46b7-8da5-259accd2da3c",
    email: "thais@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    name: "Thais Emilly",
    address: " Rua do Limoeiro",
    addressNumber: 11,
    addressComplement: "",
    cart: [
      {
        cartID: "f7cd2920-b5dd-4a08-8dfb-c910a9d63df7",
        productID: "d5321891-f36c-462b-8a77-b718cfab3205",
        name: "PARIS ESPRESSO (10 CÁPSULAS)",
        price: 34.0,
        quantity: 1,
        image:
          "https://www.nespresso.com/shared_res/agility/n-components/B2C-enriched-pdp-wex-2022/paris-espresso/main-image_L.png",
      },
    ],
    orders: [
      {
        orderID: "2a5e5800-8c10-4d0c-ba88-8c89d25f3744",
        productID: "50b08f97-0cd6-4d66-b1d3-f5b26ceb7bbc",
        name: "RIO DE JANEIRO ESPRESSO (10 CÁPSULAS)",
        price: 34.0,
        quantity: 2,
        image:
          "https://www.nespresso.com/shared_res/agility/n-components/B2C-enriched-pdp-wex-2022/rio-de-janeiro-espresso/main-image_XL.png",
        address: " Rua do Limoeiro",
        addressNumber: 11,
        addressComplement: "",
        shipping: 21.0,
        deliveredAt: "2023-09-08T18:36:10.656Z",
        createdAt: "2023-09-08T18:25:27.892Z",
      },
    ],
  },
]);

db.products.insertMany([
  {
    productID: "3642a059-b223-46ca-883b-59ed4138d873",
    name: "FILTER STYLE MILD (10 CÁPSULAS)",
    description: "Café estilo coado com notas florais e de cereais maltados",
    price: 37.0,
    quantity: 24,
    image:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-sleeves/ol/ethiopia_XL.png",
  },
  {
    productID: "50b08f97-0cd6-4d66-b1d3-f5b26ceb7bbc",
    name: "RIO DE JANEIRO ESPRESSO (10 CÁPSULAS)",
    description:
      "Café intenso e aveludado, produzido exclusivamente com grãos Arábicas do Brasil",
    price: 34.0,
    quantity: 50,
    image:
      "https://www.nespresso.com/shared_res/agility/n-components/B2C-enriched-pdp-wex-2022/rio-de-janeiro-espresso/main-image_XL.png",
  },
  {
    productID: "7790ce30-c165-43a8-b8fd-343b30d2d568",
    name: "ISTANBUL ESPRESSO (10 CÁPSULAS)",
    description:
      "Café encorpado com notas de frutas silvestres e leve toque de amêndoas",
    price: 34.0,
    quantity: 18,
    image:
      "https://www.nespresso.com/shared_res/agility/n-components/B2C-enriched-pdp-wex-2022/istanbul-espresso/main-image_L.png",
  },
  {
    productID: "d5321891-f36c-462b-8a77-b718cfab3205",
    name: "PARIS ESPRESSO (10 CÁPSULAS)",
    description: "Café delicado com notas de cereais e frutas cítricas",
    price: 34.0,
    quantity: 36,
    image:
      "https://www.nespresso.com/shared_res/agility/n-components/B2C-enriched-pdp-wex-2022/paris-espresso/main-image_L.png",
  },
  {
    productID: "f9fe9c2f-1b81-4f4a-b9c1-93f01055301b",
    name: "CAPE TOWN ENVIVO LUNGO (10 CÁPSULAS)",
    description:
      "Uma torra especial, intensa e encorpada com um aroma amadeirado e amargor forte que lembra os grãos Robusta que moldaram o sabor do café na Cidade do Cabo",
    price: 35.0,
    quantity: 12,
    image:
      "https://www.nespresso.com/shared_res/agility/commons/img/coffees/OL/composition/ol_coffee-sleeves_volluto-decaffeinato_16-9.png",
  },
  {
    productID: "b14fb0d8-6afc-4d5b-9b44-14b29189798b",
    name: "STOCKHOLM FORTISSIO LUNGO (10 CÁPSULAS)",
    description:
      "Os grãos de um verdadeiro arábica intenso, proporcionam o sabor puro amado pelos suecos - maltado, com um toque de rico de amargor",
    price: 35.0,
    quantity: 19,
    image:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-sleeves/ol/indonesia_XL.png",
  },
  {
    productID: "4bac3191-b074-47bf-b043-26964fe88176",
    name: "TOKYO VIVALTO LUNGO (10 CÁPSULAS)",
    description:
      "Os Arábicas de alta qualidade oferecem aromas florais excepcionais e sabores complexos dignos do paladar refinado de Tóquio",
    price: 37.0,
    quantity: 32,
    image:
      "https://www.nespresso.com/shared_res/agility/global/coffees/ol/sku-main-info-product/vaniglia_2x.png",
  },
]);
