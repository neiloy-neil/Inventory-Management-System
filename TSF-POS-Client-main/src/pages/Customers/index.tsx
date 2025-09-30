import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "../../redux/actions/customers/customersAction";
import { Customer, CustomerFormData } from "../../types/Customer/customerTypes";
import CustomerCard from "../../components/Customers/CustomerCard/CustomerCard";
import AddCustomerModal from "../../components/Customers/AddCustomerModal/AddCustomerModal";
import CustomerDetailsModal from "../../components/Customers/CustomerDetailsModal/CustomerDetailsModal";
import Button from "../../components/core/Button/Button";
import { toast } from "react-hot-toast";
import { Skeleton } from "@mui/material";
import "./customers.scss";

const Customers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { customers, loading, error } = useSelector((state: StateType) => state.customers);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<(CustomerFormData & { _id: string }) | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null);
  
  const { loading: deletionLoading, message, error: deletionError } = useSelector(
    (state: StateType) => state.promise
  );

  // Fetch customers on component mount
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Handle toast messages
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    if (deletionError) toast.error(deletionError);
  }, [message, error, deletionError]);

  // Handle add customer
  const handleAddCustomer = async (data: CustomerFormData) => {
    try {
      await dispatch(addCustomer(data));
      setShowAddModal(false);
      toast.success("Customer added successfully!");
    } catch (error) {
      toast.error("Failed to add customer");
    }
  };

  // Handle edit customer
  const handleEditCustomer = (customer: Customer) => {
    setCustomerToEdit({
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode,
      country: customer.country,
      marketingConsent: customer.marketingConsent,
    });
    setShowAddModal(true);
  };

  // Handle update customer
  const handleUpdateCustomer = async (data: CustomerFormData) => {
    if (!customerToEdit) return;
    
    try {
      await dispatch(updateCustomer(customerToEdit._id, data));
      setShowAddModal(false);
      setCustomerToEdit(null);
      toast.success("Customer updated successfully!");
    } catch (error) {
      toast.error("Failed to update customer");
    }
  };

  // Handle delete customer
  const handleDeleteCustomer = async (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        setDeletingCustomerId(customerId);
        await dispatch(deleteCustomer(customerId));
        toast.success("Customer deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete customer");
      } finally {
        setDeletingCustomerId(null);
      }
    }
  };

  // Handle view customer details
  const handleViewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  // Handle form submit (add or update)
  const handleSubmit = customerToEdit ? handleUpdateCustomer : handleAddCustomer;

  return (
    <Pagewrapper title="Customer Management">
      <div className="customers-page">
        <div className="customers-header modern-flex modern-flex-between modern-mb-lg">
          <h1 className="page-title modern-dashboard-title">Customer Management</h1>
          <Button
            title="Add Customer"
            className="modern-btn modern-btn-primary"
            onClick={() => {
              setCustomerToEdit(null);
              setShowAddModal(true);
            }}
          />
        </div>

        {loading && customers.length === 0 ? (
          <div className="customers-loading modern-grid modern-grid-cols-1 sm:modern-grid-cols-2 lg:modern-grid-cols-3 modern-gap-lg">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                key={index}
                className="modern-card"
              />
            ))}
          </div>
        ) : error ? (
          <div className="customers-error modern-alert modern-alert-error">
            <p>{error}</p>
            <Button
              title="Retry"
              className="modern-btn modern-btn-primary modern-mt-md"
              onClick={() => dispatch(fetchCustomers())}
            />
          </div>
        ) : (
          <div className="customers-grid modern-grid modern-grid-cols-1 sm:modern-grid-cols-2 lg:modern-grid-cols-3 modern-gap-lg">
            {customers.map((customer: Customer) => (
              <CustomerCard
                key={customer._id}
                customer={customer}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
                onViewDetails={handleViewCustomerDetails}
              />
            ))}
          </div>
        )}

        {customers.length === 0 && !loading && (
          <div className="no-customers modern-text-center modern-py-3xl">
            <h3>No customers found</h3>
            <p className="modern-text-base modern-text-gray-600 modern-mb-lg">
              Get started by adding your first customer
            </p>
            <Button
              title="Add Your First Customer"
              className="modern-btn modern-btn-primary"
              onClick={() => setShowAddModal(true)}
            />
          </div>
        )}
      </div>

      {/* Add/Edit Customer Modal */}
      <AddCustomerModal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          setCustomerToEdit(null);
        }}
        onSubmit={handleSubmit}
        loading={loading}
        customerToEdit={customerToEdit || undefined}
      />

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        customer={selectedCustomer}
      />
    </Pagewrapper>
  );
};

export default Customers;