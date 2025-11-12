export interface product{
    id: number;
    name: string;
    price: number;
    description?: string; // not required
}
export function getProductInfo(products:product[]): string{
    return products.map(
        (p) => `ID: ${p.id}, Name: ${p.name}, Price: $${p.price}` + p.description ? `, Description: ${p.description}` : ''
    ).join('\n');
}
enum Shape{
    Circle = "CIRCLE",
    Square = "SQUARE",
    Rectangle = "RECTANGLE"
}
let myShape: Shape.Circle | Shape.Square = Shape.Rectangle; // Error: Type 'Shape.RECTANGLE' is not assignable to type 'Shape.Circle | Shape.Square'.