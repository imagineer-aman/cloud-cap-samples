const cds = require ('@sap/cds')
class OrdersService extends cds.ApplicationService {

  /** register custom handlers */
  init(){
    const { 'Orders.Items':OrderItems } = this.entities;

    this.before ('READ', OrderItems, async function(req) {
        console.log('in READ handler...')
    })

    this.before ('UPDATE', OrderItems, async function(req) {
        if(req?.data?.Items?.length === 2) {
            req.data.Items.push({
                "category_ID": 3, 
                "ID": "e9641166-e050-4261-bfee-d1e797e6cb7f", 
                "price": 28,
                "product_ID": "252", 
                "quantity": 1, 
                "title": "Eleonora", 
                up__ID: "7e2f2640-6866-4dcf-8f4d-3027aa831cad"
            })
        }
    //   const { ID, Items } = req.data
    //   if (Items) for (let { product_ID, quantity } of Items) {
    //     const { quantity:before } = await cds.tx(req).run (
    //       SELECT.one.from (OrderItems, oi => oi.quantity) .where ({up__ID:ID, product_ID})
    //     )
    //     if (quantity != before) await this.orderChanged (product_ID, quantity-before)
    //   }
    })

    // this.before ('DELETE', 'Orders', async function(req) {
    //   const { ID } = req.data
    //   const Items = await cds.tx(req).run (
    //     SELECT.from (OrderItems, oi => { oi.product_ID, oi.quantity }) .where ({up__ID:ID})
    //   )
    //   if (Items) await Promise.all (Items.map(it => this.orderChanged (it.product_ID, -it.quantity)))
    // })

    return super.init()
  }

  /** order changed -> broadcast event */
//   orderChanged (product, deltaQuantity) {
//     // Emit events to inform subscribers about changes in orders
//     console.log ('> emitting:', 'OrderChanged', { product, deltaQuantity })
//     return this.emit ('OrderChanged', { product, deltaQuantity })
//   }

}
module.exports = OrdersService
