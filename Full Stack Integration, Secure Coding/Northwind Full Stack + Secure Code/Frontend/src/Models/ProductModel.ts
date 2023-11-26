class ProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string; // Image url serving the uploaded image.
    public image: File // Image file to send backend.
}

export default ProductModel;