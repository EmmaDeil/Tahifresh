export type Product={id:number;name:string;category:string;price:number;unit:string;emoji:string;description:string;featured?:boolean};
export type CartItem=Product&{quantity:number};
