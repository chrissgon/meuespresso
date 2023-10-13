export interface ITab {
  icon: string;
  path: string;
  label: string;
}
export interface INav extends Array<ITab> {}

export interface IUser {
  userID: string;
  email: string;
  password: string;
  name: string;
  address: string;
  addressNumber: number;
  addressComplement: string;
  cart: ICart;
  orders: IOrders;
}

export interface ICart extends Array<ICartItem> {}

export interface ICartItem{
  cartID: string;
    productID: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface IOrder {
  orderID: string;
  productID: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  address: string;
  addressNumber: number;
  addressComplement: string;
  shipping: number;
  deliveredAt: Date;
  createdAt: Date;
}

export interface IOrders extends Array<IOrder> {}

export interface IProduct {
  productID: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IProducts extends Array<IProduct> {}

export enum EOperations {
  UserLogin = "user:login",
  ProductsGet = "products:get",
  ProductsFind = "products:find",
  UserAddToCart = "user:addToCart",
  UserRemoveFromCart = "user:addToCart",
  UserBuy = "user:buy",
  UserUpdate = "user:update",
}
export enum EErrors {
  UserLogin = "Email ou senha inválidos",
  ProductsGet = "Erro ao carregar os produtos",
  ProductsFind = "Erro ao procurar os produtos",
  UserAddToCart = "Erro ao adicionar o item ao carrinho",
  UserRemoveFromCart = "Erro ao remover o item do carrinho",
  UserBuy = "Erro ao realizar a compra",
  UserUpdate = "Erro ao atualizar o usuário",
}
