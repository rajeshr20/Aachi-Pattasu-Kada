import { drizzle } from 'drizzle-orm/netlify-db'
import { defineRelations } from 'drizzle-orm'
import * as schema from './schema'

export const relations = defineRelations(schema, r => ({
  category: { products: r.many.product({ from: r.category.id, to: r.product.categoryId }) },
  product: {
    category: r.one.category({ from: r.product.categoryId, to: r.category.id, optional: false }),
    images: r.many.productImage({ from: r.product.id, to: r.productImage.productId }),
  },
  order: {
    customer: r.one.customer({ from: r.order.customerId, to: r.customer.id, optional: false }),
    items: r.many.orderItem({ from: r.order.id, to: r.orderItem.orderId }),
    statusHistory: r.many.orderStatusHistory({ from: r.order.id, to: r.orderStatusHistory.orderId }),
  },
}))

// Initialize on first query so prerendering never requires a database connection.
let client: ReturnType<typeof createClient> | undefined
function createClient() { return drizzle({ schema, relations }) }
export function getDb() { return client ??= createClient() }
export { schema }
