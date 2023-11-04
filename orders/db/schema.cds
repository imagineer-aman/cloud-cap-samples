using { Currency, User, managed, cuid } from '@sap/cds/common';
namespace sap.capire.orders;

entity Orders : cuid, managed { // Similar to Shipments
  OrderNo  : String(22) @title:'Order Number'; //> readable key
  Items    : Composition of many { // Similar to ShipmentDates
    key ID    : UUID;
    product   : Association to Products; 
    quantity  : Integer;
    title     : String; //> intentionally replicated as snapshot from product.title
    price     : Double; //> materialized calculated field
    category  : Association to Categories; // New field. Use for filtering categories
  };
  buyer    : User;
  currency : Currency;
}

/** This is a stand-in for arbitrary ordered Products */
entity Products @(cds.persistence.skip:'always') {
  key ID : String;
}

entity Categories {
  key ID          : Integer;
      description : String(240);
}

// this is to ensure we have filled-in currencies
using from '@capire/common';
