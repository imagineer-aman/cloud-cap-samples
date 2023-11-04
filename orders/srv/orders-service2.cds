using { sap.capire.orders as my } from '../db/schema';

service OrdersService2 {
  entity Orders as projection on my.Orders;

  entity Items as projection on my.Orders.Items
    where category.ID = 1 or category.ID = 2 or category.ID = 3;

  entity Categories as projection on my.Categories;
}
