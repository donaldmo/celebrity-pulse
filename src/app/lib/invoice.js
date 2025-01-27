export class Invoice {
    constructor(userEmail, productId, productItem, amount, currency = "ZAR") {
        this.metadata = {
            user_email: userEmail,
            product_id: productId,
            product_item: productItem,
        };
        this.amount = amount;
        this.currency = currency;
    }

    // You can add methods if needed
    printInvoice() {
        console.log(`Invoice:
      User Email: ${this.metadata.user_email}
      Product ID: ${this.metadata.product_id}
      Product Item: ${this.metadata.product_item}
      Amount: ${this.amount} ${this.currency}`);
    }
}
