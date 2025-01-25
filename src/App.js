import React, { useState } from 'react';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 7 },
    { id: 2, name: 'Denim', category: 'Clothing', quantity: 50 },
    { id: 3, name: 'Backpack', category: 'Accessories', quantity: 18 },
    { id: 4, name: 'Chair', category: 'Furniture', quantity: 5 },
    { id: 5, name: 'Coffee Maker', category: 'Appliances', quantity: 14 },
    // { id: 6, name: 'Shoes', category: 'Clothing', quantity: 29 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([
        ...inventory,
        { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity, 10) },
      ]);
      setNewItem({ name: '', category: '', quantity: '' });
    }
  };

  const handleEditItem = (id, updatedItem) => {
    setInventory(
      inventory.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleSort = () => {
    const sortedInventory = [...inventory].sort((a, b) => {
      return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    });
    setInventory(sortedInventory);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredInventory = inventory.filter((item) =>
    filterCategory ? item.category === filterCategory : true
  );

  return (
    <div className="App">
      <header className="header">
        <h1>Dynamic Inventory Management Table</h1>
      </header>

      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div className="filter-sort-controls">
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="">All Categories</option>
          {[...new Set(inventory.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleSort}>Sort by Quantity ({sortOrder})</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? 'low-stock' : ''}
            >
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  onClick={() =>
                    handleEditItem(item.id, {
                      ...item,
                      quantity: prompt('Enter new quantity:', item.quantity) || item.quantity,
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
